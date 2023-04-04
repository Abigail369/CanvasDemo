export const XSIZE = 1000;
export const YSIZE = 800;
const CL = Math.PI * 2;

export const randomSpeed = () => {
  return Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
};
export const randomColor = () => {
  return Math.floor(Math.random() * 255);
};

export class Ball {
  x: number;
  y: number;
  r: number;
  speedX: number;
  speedY: number;
  color: string;
  constructor() {
    this.r = 10;
    this.x = Math.floor(Math.random() * XSIZE);
    this.y = Math.floor(Math.random() * YSIZE);
    this.speedX = randomSpeed();
    this.speedY = randomSpeed();
    this.color = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
  }
  Draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, CL);
    ctx.fill();
    ctx.closePath();
  }
  Move() {
    if (this.x - this.r <= 0 || this.x + this.r >= XSIZE) {
      this.speedX *= -1;
    }
    if (this.y - this.r <= 0 || this.y + this.r >= YSIZE) {
      this.speedY *= -1;
    }
    this.x -= this.speedX;
    this.y -= this.speedY;
  }
}
export const CompareBalls = (a: Ball, b: Ball) => {
  const dis = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
  if (dis <= a.r + b.r) {
    a.speedX *= -1;
    a.speedY *= -1;
    b.speedX *= -1;
    b.speedY *= -1;
  }
};
