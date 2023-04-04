import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import useCancelRepeatRequest from "./cancelRepeatRequest";

//取消重复请求
const { addPendingRequest, removePendingRequest } = useCancelRepeatRequest();
// axios
export const server = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    timeout: 10 * 1000,
  },
});

server.interceptors.request.use(
  config => {
    config.url = "/api" + config.url;
    //取消重复请求
    removePendingRequest(config);
    addPendingRequest(config);
    NProgress.start();
    return config;
  },
  error => {
    throw new Error(error);
  }
);

// response interceptor
server.interceptors.response.use(
  response => {
    NProgress.done();
    removePendingRequest(response.config);
    if (response.data.status == 200 || response.data.status == 300) {
      return response.data;
    } else {
      ElMessage.error(response.data.msg || "数据异常");
    }
  },
  error => {
    ElMessage.info("系统繁忙");
    removePendingRequest(error.config || {});
    NProgress.done();
    throw new Error(error);
  }
);
