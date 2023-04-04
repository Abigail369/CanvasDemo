import axios, { AxiosRequestConfig } from "axios";

//取消重复请求
export default function () {
  function generateReqKey(config: AxiosRequestConfig<any>) {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
  }
  const pendingRequest = new Map();
  function addPendingRequest(config: AxiosRequestConfig<any>) {
    const requestKey = generateReqKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!pendingRequest.has(requestKey)) {
          pendingRequest.set(requestKey, cancel);
        }
      });
  }
  function removePendingRequest(config: AxiosRequestConfig<any>) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
      const cancelToken = pendingRequest.get(requestKey);
      cancelToken(requestKey);
      pendingRequest.delete(requestKey);
    }
  }
  return {
    addPendingRequest,
    removePendingRequest,
  };
}
