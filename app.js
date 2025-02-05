const saveBtn = document.getElementById("save");
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

let mode = "brush";

brush.lineWidth = lineWidth.value;
brush.lineCap = "round";
let isPainting = false;
let isFilling = false;


function onMove(event) {
    if (!isPainting) {
        brush.beginPath();  // 새로운 선을 위해 경로 시작
        brush.moveTo(event.offsetX, event.offsetY);
        return;
    }

    if (mode === "brush") {
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();

    } 
    else if (mode === "erase") {
        let eraserSize = lineWidth.value*3;  // 지우개 크기 조정 가능
        brush.clearRect(event.offsetX - eraserSize / 2, event.offsetY - eraserSize / 2, eraserSize, eraserSize);
    }
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
    mode = "erase";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onSaveClick() {
    const ImageURL = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = ImageURL;
    a.download = "myDrawing.png";
    a.click();
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
saveBtn.addEventListener("click", onSaveClick);