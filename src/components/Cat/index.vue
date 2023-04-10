<template>
  <h1>Canvas</h1>
  <div class="content">
    <div>
      <canvas id="canvas" width="500" height="500"></canvas>
      <div class="btns">
        <div class="btn" @click="save">保存</div>
        <!-- <div class="btn" @click="filter1">黑白</div>
        <div class="btn" @click="filter2">曝光</div>
        <div class="btn" @click="backToOriginal">还原</div>
        <div class="btn btn1">{{ selectColor }}</div> -->
      </div>
    </div>
    <img src="" alt="" ref="imgOnPage" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
const width = 500;
const height = 500;
const imgs = [
  // { name: "p1", url: "/img/1.png" },
  // { name: "p2", url: "/img/2.png" },
  // { name: "p3", url: "/img/3.png" },
  // { name: "p4", url: "/img/4.png" },
  // { name: "p5", url: "/img/5.png" },
  // { name: "p6", url: "/img/6.png" },
  // { name: "p7", url: "/img/7.png" },
  // { name: "p8", url: "/img/8.png" },
  // { name: "p9", url: "/img/9.png" },
  { name: "p1", url: "/img/cat1.png" },
  { name: "p2", url: "/img/cat2.png" },
  { name: "p3", url: "/img/cat3.png" },
];
/** 图片数据 名字 位置等 */
const imagesData: { img: HTMLImageElement; name: string; x: number; y: number; w: number; h: number }[] = [];

const getColor = (e: MouseEvent) => {
  // 获取当前颜色
  let pixel = ctx.getImageData(e.pageX - canvas.value!.offsetLeft, e.pageY - canvas.value!.offsetTop, 1, 1);
  let data = pixel.data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  selectColor.value = rgba;
};
/** 选择的颜色 */
const selectColor = ref("");
/** 图片拖拽 */
const init = () => {
  canvas.value = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.value!.getContext("2d") as CanvasRenderingContext2D;

  canvas.value?.addEventListener("mousemove", getColor, false);
  /** 当前点击的信息 */
  let clickCoordinate = { x: 0, y: 0 };
  let target: any;

  imgs.forEach(item => {
    let img = new Image();
    img.src = item.url;
    const name = item.name;
    img.onload = function () {
      const w = 100;
      const h = (w / img.width) * img.height;
      const x = Math.random() * (width - w);
      const y = Math.random() * (height - h);
      const obj = { img, name, x, y, w, h };
      imagesData.push(obj);
      drawByObj(obj);
    };
  });
  function drawByObj(obj: any) {
    ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
  }
  function drawGuideByObj(obj: any) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "green";
    ctx.rect(obj.x, obj.y, obj.w, obj.h);
    ctx.stroke();
  }

  canvas.value.addEventListener("mousedown", mousedownFn, false);
  function mousedownFn(e: MouseEvent) {
    clickCoordinate.x = e.pageX - canvas.value!.offsetLeft;
    clickCoordinate.y = e.pageY - canvas.value!.offsetTop;
    console.log("初次点击位置：" + clickCoordinate.x + "--" + clickCoordinate.y);
    checkElement();
    if (target == undefined) return;
    canvas.value!.addEventListener("mousemove", mousemoveFn, false);
    canvas.value!.addEventListener("mouseup", mouseupFn, false);

    canvas.value!.removeEventListener("mousemove", getColor);
    selectColor.value = "";
  }
  /** 判断点击的是哪个 */
  function checkElement() {
    imagesData.forEach((item, index) => {
      drawGuideByObj(item);
      if (ctx.isPointInPath(clickCoordinate.x, clickCoordinate.y)) {
        // console.log("点击的元素是：", item.name);
        target = index;
      }
    });
  }
  function mousemoveFn(e: MouseEvent) {
    // 计算点击位置和图片原点位置的差
    let sx = clickCoordinate.x - imagesData[target].x;
    let sy = clickCoordinate.y - imagesData[target].y;
    // 计算移动元素的坐标
    imagesData[target].x = e.pageX - canvas.value!.offsetLeft - sx;
    imagesData[target].y = e.pageY - canvas.value!.offsetTop - sy;
    console.log(imagesData[target]);

    // 重新赋值点击位置
    clickCoordinate.x = e.pageX - canvas.value!.offsetLeft;
    clickCoordinate.y = e.pageY - canvas.value!.offsetTop;
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    // 清空画布以后重新绘制
    imagesData.forEach(i => drawByObj(i));
  }
  function mouseupFn(e: MouseEvent) {
    console.log(e.pageX + "----" + e.pageY);
    // 鼠标抬起以后移除事件
    canvas.value!.removeEventListener("mousemove", mousemoveFn, false);
    canvas.value!.removeEventListener("mouseup", mouseupFn, false);
    target = undefined;

    canvas.value!.addEventListener("mousemove", getColor, false);
  }
};
const imgOnPage = ref<HTMLImageElement | null>(null);
const save = () => {
  // 将canvas转换成base64的url
  let url = canvas.value!.toDataURL("image/png");
  // console.log(url);

  // 把Canvas 转化为图片
  imgOnPage.value!.src = url;

  // 将base64转换为文件对象
  let arr = url.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  // console.log(arr);
  // console.log(mime);
  // console.log(arr);

  let binaryString = window.atob(arr[1]);
  let binaryLen = binaryString.length;
  let bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  console.log(bytes);
  // saveByteArray(bytes);
  let file = new File([bytes], "filename", { type: mime });
  // 虚拟点击
  const link = document.createElement("a");
  link.download = file.name;
  let href = URL.createObjectURL(file);
  link.href = href;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};
const filter1 = () => {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imgData, 0, 0);
};
const filter2 = () => {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  ctx.putImageData(imgData, 0, 0);
};
const backToOriginal = () => {
  imagesData.forEach(obj => ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h));
};

onMounted(() => {
  // init1();
  // init2();
  init();
});
</script>

<style lang="less" scoped>
#canvas {
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 8px;
}
.btn {
  width: 68px;
  height: 30px;
  background: cadetblue;
  border-radius: 6px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.btn1 {
  width: 130px;
}
.content {
  display: flex;
  color: #fff;
  img {
    border: 1px cadetblue solid;
  }
  .btns {
    display: flex;
    div {
      margin-right: 10px;
    }
  }
}
</style>
