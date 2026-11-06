const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

let x = 100;
let y = 80;
let vx = 180;
let vy = 140;
let r = 14;
let last = performance.now();
let gravity = 500;

function update(dt) {

  vy = vy + gravity * dt;
  
  x = x + vx * dt;
  y = y + vy * dt;

  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
  }
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
  }
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;
  info.textContent = "dt：" + dt.toFixed(4) + " 秒/1秒に約 " + (1 / dt).toFixed(0) + " 回";
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    vx = vx * 1.2;   // 速さを1.2倍（向きはそのまま）
    vy = vy * 1.2;
  }
  if(e.code === "ArrowDown"){
    vx = vx * 0.8;   
    vy = vy * 0.8;
  }
  if (e.code === "ArrowRight"){
    r++;
  }
  if (e.code === "ArrowLeft"){
    r--;
  }

});
