<template>
  <div class="box">
    <canvas id="chess_canvas" ref="chess_canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
/** 绘制对象 */
let ctx: CanvasRenderingContext2D;

/** 棋盘DOM */
const chess_canvas = ref<HTMLCanvasElement>();

/** 记录棋盘格信息的数组 */
let record: number[][] = [];

/** 当前是否要下黑棋 */
let isBlack = true;

/** 初始化 */
const initCanvas = () => {
  ctx = chess_canvas.value?.getContext("2d") as CanvasRenderingContext2D;
  chess_canvas.value!.width = 600;
  chess_canvas.value!.height = 600;
  chess_canvas.value!.style.background = "#e3cdb0";

  isBlack = true;

  drawCheckerboard();
};

/** 绘制棋盘：每个棋格大小40*40 */
const drawCheckerboard = () => {
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(20, 20 + 40 * i);
    ctx.lineTo(580, 20 + 40 * i);
    ctx.stroke();
    ctx.closePath();
  }

  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.moveTo(20 + 40 * i, 20);
    ctx.lineTo(20 + 40 * i, 580);
    ctx.stroke();
    ctx.closePath();
  }

  /** 初始化棋盘格数组，0代表未下，1代表黑子，2代表白子 */
  for (let i = 0; i < 15; i++) {
    record[i] = new Array(15).fill(0);
  }

  /** 给棋盘添加点击事件 */
  chess_canvas.value!.onclick = e => {
    // 进行取整，确保棋子落在最近的棋盘格交叉点上
    let x = e.offsetX - (e.offsetX % 40) + 20;
    let y = e.offsetY - (e.offsetY % 40) + 20;

    let pX = (x - 20) / 40;
    let pY = (y - 20) / 40;

    if (record[pY][pX] != 0) {
      return;
    }

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = isBlack ? "black" : "white";
    ctx.fill();
    ctx.closePath();

    record[pY][pX] = isBlack ? 1 : 2;
    isBlack = !isBlack;

    setTimeout(() => {
      if (isWin(pY, pX)) {
        const con = confirm(`${!isBlack ? "黑棋" : "白棋"}赢了！是否重新开局？`);
        ctx.clearRect(0, 0, 600, 600);
        con && initCanvas();
      }
    }, 10);
  };
};

const isWin = (x: number, y: number) => {
  let res: number[][] = [];
  let xadd = [];
  let yadd = [];
  let zadd = [];
  let wadd = [];
  let flag = false;
  // 上 下 左 右 +4
  for (let i = 4; i >= -4; i--) {
    if (x - i >= 0 && x - i <= 14) {
      xadd.push(record[x - i][y]);
    }
    if (y - i >= 0 && y - i <= 14) {
      yadd.push(record[x][y - i]);
    }
    if (x - i >= 0 && x - i <= 14 && y - i >= 0 && y - i <= 14) {
      zadd.push(record[x - i][y - i]);
    }
    if (x + i >= 0 && x + i <= 14 && y - i >= 0 && y - i <= 14) {
      wadd.push(record[x + i][y - i]);
    }
  }
  res.push(xadd);
  res.push(yadd);
  res.push(zadd);
  res.push(wadd);

  let target = record[x][y];
  res.forEach(arr => {
    let mid = Math.floor(arr.length / 2);
    let left = mid;
    let right = mid;
    while (arr[left] == target) {
      left--;
    }
    while (arr[right] == target) {
      right++;
    }
    if (right - 1 - (left + 1) == 4) {
      flag = true;
    }
  });
  return flag;
};

onMounted(() => {
  initCanvas();
});
onBeforeUnmount(() => {
  ctx.clearRect(0, 0, 600, 600);
});
</script>

<style scoped lang="less">
.box {
  width: 600px;
  height: 600px;
  border: 1px #ccc solid;
  position: absolute;
  left: 50%;
  top: 150px;
  transform: translateX(-50%);
}
</style>
