const canvas = document.querySelector("canvas");

const brush = canvas.getContext("2d"); 

canvas.width=800;
canvas.height=800;

brush.fillRect(50, 50, 100, 200);