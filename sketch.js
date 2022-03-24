class Tile{  
  constructor(i,img){
    this.index=i;
    this.img=img;
  }
}
let source;
let tiles = [];
let cols = 6;
let rows = 6;
let w, h;
let board = [];
let blankSpot=-1;

function preload() {
  source = loadImage("batman.jpg");
}

function setup() {
  let canvas= createCanvas(400,400);
  canvas.center();
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      let img = createImage(w, h);
      img.copy(source, x, y, w, h, 0, 0, w, h);
      let index = i + j * cols;
      board.push(index);
      let tile = new Tile(index, img);
      tiles.push(tile);
    }
  }
  tiles.pop();
  board.pop();
  board.push(-1);
  shufflePuzzle(board);
}

function swap(i, j, arr) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function shufflePuzzle(arr) {
  for (let i = 0; i < 999; i++) {
    randomMove(arr)
  }
}

function randomMove(arr){
  let r1 = floor(random(cols));
  let r2 = floor(random(rows));
  move(r1,r2,arr);
}

function mousePressed(){
  let i=floor(mouseX/w);
  let j=floor(mouseY/h);
  move(i,j,board);
}

function draw() {
  background(255);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let index = i + j * cols;
      let x = i * w;
      let y = j * h;
      let tileIndex = board[index];
      if(tileIndex>-1){
      let img = tiles[tileIndex].img;
      image(img, x, y, w, h);
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h;
      strokeWeight(2);
      noFill();
      rect(x, y, w, h);
    }
  }
  if(isSolved()){
    noLoop();
    alert("Ganaste un viaje!");
  }
}

function isSolved(){
  for(let i=0;i<board.length-1;i++){
    if(board[i]!=tiles[i].index){
      return false;
    }
  }
  return true;
}

function move(i,j,arr){
  let blank = findBlank();
  let blankCol= blank%cols;
  let blankRow=floor(blank/rows);
  
  if(isNeighbor(i,j,blankCol,blankRow)){
    swap(blank,i+j*cols,arr);
  }
}

function isNeighbor(i,j,x,y){
  if(i!=x && j!=y){
    return false;
  }
  if(abs(i-x)==1 || abs(j-y)==1){
    return true;
  }
  return false;
}

function findBlank(){
  for(let i =0;i<board.length;i++){
    if(board[i]==-1){
      return i;
    }
  }
}

//banner
window.addEventListener("scroll",function(){
  var header= document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY>0);
})

function displayNextImage() {
  x = (x === images.length - 1) ? 0 : x + 1;
  document.getElementById("img").src = images[x];
}

function displayPreviousImage() {
  x = (x <= 0) ? images.length - 1 : x - 1;
  document.getElementById("img").src = images[x];
}

function startTimer() {
  setInterval(displayNextImage, 3000);
}

var images = [], x = -1;
images[0] = "/Images/Egipto.jpg";
images[1] = "/Images/Brasil.jpg";
images[2] = "/Images/Tokio.jpg";
images[3] = "/Images/Guadalajara.jpg";
images[4] = "/Images/NewYork.jpg";
images[5] = "/Images/Francia.png";
images[6] = "/Images/Alaska.jpg";
images[7] = "/Images/PuntaCana.jpg";
images[8] = "/Images/Cancun.jpg";
images[9] = "/Images/LasVegas.jpg";
