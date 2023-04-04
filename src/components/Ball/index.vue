<template>
  <div>
    <canvas ref="ball_canvas" id="ball_canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { XSIZE, YSIZE, Ball, CompareBalls } from "./index";

const ball_canvas = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D;
let timer: any;
const initCanvas = () => {
  ctx = ball_canvas.value!.getContext("2d") as CanvasRenderingContext2D;
  ball_canvas.value!.width = XSIZE;
  ball_canvas.value!.height = YSIZE;

  let ball_arr: Ball[] = [];
  let set = new Set();
  for (let i = 0; i < 20; i++) {
    let ball = new Ball();
    if (ball.x - ball.r <= 0 || ball.x + ball.r >= XSIZE || ball.y - ball.r <= 0 || ball.y + ball.r >= YSIZE) {
      i--;
    } else {
      if (set.has([ball.x, ball.y])) {
        i--;
      } else {
        set.add([ball.x, ball.y]);
        ball_arr.push(ball);
      }
    }
  }

  timer = setInterval(() => {
    ctx.clearRect(0, 0, XSIZE, YSIZE);
    ball_arr.forEach(ball => {
      ball.Draw(ctx);
      ball.Move();
    });

    ball_arr.forEach((ball, index) => {
      for (let i = index + 1; i < ball_arr.length; i++) {
        CompareBalls(ball, ball_arr[i]);
      }
    });
  }, 50);
};
onMounted(() => {
  initCanvas();
});
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
#ball_canvas {
  background-color: white;
  border: 1px solid #eee;
  margin-left: 30px;
  margin-top: 50px;
}
</style>
