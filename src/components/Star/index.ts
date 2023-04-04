export interface Star {
  x: number;
  y: number;
  r: number;
  speedX: number;
  speedY: number;
}

export const generateStar = () => {
  const star: Star = {
    x: 0,
    y: 0,
    r: 0,
    speedX: 0,
    speedY: 0,
  };
  star.x = Math.random() * 1000;
  star.y = Math.random() * 800;
  star.r = Math.random() * 5;
  star.speedX = randomSpeed();
  star.speedY = randomSpeed();
  return star;
};

export const randomSpeed = () => {
  return Math.random() * 3 * Math.pow(-1, Math.round(Math.random()));
};

export const Draw = (ctx: CanvasRenderingContext2D, star: Star) => {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

export const Move = (star: Star) => {
  star.x -= star.speedX;
  star.y -= star.speedY;
  if (star.x < 0 || star.x > 1000) {
    star.speedX *= -1;
  }
  if (star.y < 0 || star.y > 800) {
    star.speedY *= -1;
  }
};

export const DrawLine = (startX: number, startY: number, endX: number, endY: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.closePath();
};
