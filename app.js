const modeBtn = document.getElementById("mode-btn");
const canvasClear = document.getElementById("canvas-clear");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const canvas = document.querySelector("canvas");
const brush = canvas.getContext("2d"); 

canvas.width=800;
canvas.height=800;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

brush.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;


function onMove(event) {
    if(isPainting && !isFilling) {
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();
    }
    brush.beginPath();
    brush.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}

function onLineWidthChange(event) {
    brush.lineWidth = event.target.value;
}

function onColorChange(event) {
    brush.strokeStyle = event.target.value;
    brush.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    brush.strokeStyle = colorValue;
    brush.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText  = "Draw";
    }
}

function onCanvasClick() {
    if(isFilling) {
        brush.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onClearClick() {
    brush.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(event) {
    brush.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
canvasClear.addEventListener("click", onClearClick);
eraserBtn.addEventListener("click", onEraserClick);