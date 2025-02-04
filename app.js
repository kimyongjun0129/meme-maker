const canvas = document.querySelector("canvas");

const brush = canvas.getContext("2d"); 

canvas.width=800;
canvas.height=800;
brush.lineWidth = 2;
let isPainting = false;

function onMove(event) {
    if(isPainting) {
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();
    }
    brush.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
    isPainting = true;
}

function cancelPainting(event) {
    isPainting = false;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);