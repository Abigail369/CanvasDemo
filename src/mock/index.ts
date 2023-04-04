export interface RequestOption {
  /** 请求头 */
  headers: any;
  /** 请求体参数 */
  body: any;
  /** 路由参数 */
  query: any;
}

export default [
  {
    url: "/api/login",
    method: "post",
    response() {
      return {
        status: 200,
        data: {
          "token|32": "",
        },
      };
    },
  },
  {
    url: "/api/grid",
    method: "get",
    response() {
      // 演示mock网格数据
      const east = 116;
      const west = 99;
      const north = 35;
      const south = 27;
      const min = 10;
      const max = 20;
      return {
        status: 200,
        data: `/generatePNG?minLon=${west}&maxLon=${east}&maxLat=${north}&minLat=${south}&value=%5B${min},${max}%5D&t=${Date.now()}`,
      };
    },
  },
];
