let isTouchDevice = "ontouchstart" in document.documentElement;
let context = canvas.getContext("2d");
let isPainting = false;
let usingEraser = false;
let lastPoint = { x: undefined, y: undefined };
let brushColor = "black";
let backgroundColor = "white";
let lineWidth = 5;

window.onload = () => {
  resetCanvas();
  // 阻止浏览器页面缩放
  let lastTouchEnd = 0;
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener(
    "touchend",
    function (event) {
      let now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
  document.addEventListener("dblclick", function (event) {
    event.preventDefault();
  });
};
window.onresize = () => {
  resetCanvas();
};

black.onclick = () => {
  brushColor = "black";
  usingEraser = false;
  black.classList.add("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  blue.classList.remove("active");
};
red.onclick = () => {
  brushColor = "red";
  usingEraser = false;
  red.classList.add("active");
  black.classList.remove("active");
  yellow.classList.remove("active");
  blue.classList.remove("active");
};
yellow.onclick = () => {
  brushColor = "yellow";
  usingEraser = false;
  yellow.classList.add("active");
  red.classList.remove("active");
  black.classList.remove("active");
  blue.classList.remove("active");
};
blue.onclick = () => {
  brushColor = "blue";
  usingEraser = false;
  blue.classList.add("active");
  red.classList.remove("active");
  yellow.classList.remove("active");
  black.classList.remove("active");
};
thin.onclick = () => {
  console.log("thin");
  lineWidth = 2;
  thin.classList.add("active");
  medium.classList.remove("active");
  thick.classList.remove("active");
};
medium.onclick = () => {
  console.log("medium");
  lineWidth = 5;
  medium.classList.add("active");
  thin.classList.remove("active");
  thick.classList.remove("active");
};
thick.onclick = () => {
  console.log("thick");
  lineWidth = 8;
  thick.classList.add("active");
  medium.classList.remove("active");
  thin.classList.remove("active");
};
brush.onclick = () => {
  usingEraser = false;
  brush.classList.add("active");
  eraser.classList.remove("active");
};
eraser.onclick = () => {
  usingEraser = true;
  eraser.classList.add("active");
  brush.classList.remove("active");
};
trash.onclick = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};
download.onclick = () => {
  let url = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.href = url;
  a.download = "画布";
  a.target = "_blank";
  a.click();
};

if (isTouchDevice) {
  canvas.ontouchstart = (e) => {
    lastPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  canvas.ontouchmove = (e) => {
    const newPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
    lastPoint = newPoint;
  };
} else {
  canvas.onmousedown = (e) => {
    isPainting = true;
    lastPoint = { x: e.clientX, y: e.clientY };
  };
  canvas.onmousemove = (e) => {
    if (isPainting) {
      const newPoint = { x: e.clientX, y: e.clientY };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };
  canvas.onmouseup = () => {
    isPainting = false;
  };
}

function resetCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function drawLine(startX, startY, endX, endY) {
  context.beginPath();
  context.strokeStyle = usingEraser ? backgroundColor : brushColor;
  context.lineWidth = usingEraser ? lineWidth + 10 : lineWidth;
  context.lineCap = "round";
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.closePath();
}
