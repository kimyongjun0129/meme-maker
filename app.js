const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const canvas = document.querySelector("canvas");

const brush = canvas.getContext("2d"); 

console.log(document.getElementsByClassName("color-option"));

canvas.width=800;
canvas.height=800;
brush.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
    if(isPainting) {
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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));