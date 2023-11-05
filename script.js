
let turn = 'red'
let stopEvent = false
let diceNum;

let froms = []
let tos = []
document.getElementById('red').style.transform = `0vmin`
document.getElementById('red').style.transform = `0vmin`
document.getElementById('blue').style.transform = `0vmin`
document.getElementById('blue').style.transform = `0vmin`


document.addEventListener('keydown', async (e) => {

    if (e.key === "Enter" && !stopEvent) {
        stopEvent = true;
        diceNum = await roll();
        let isOutOfRange = checkRange(diceNum);
        
        if (!isOutOfRange) {
            await run(diceNum);
            await checkLadderAndSnake();
        }

        let wonBy = checkWin();
        if (wonBy == 'none') {
            changeTurn();

            let currentPosition = coordinatesToPosition()
            const shortestPath = findShortestPath(boardGraph, currentPosition);
            await(drawArrow(shortestPath));
            stopEvent = false;
        }
    }
});
document.getElementById('cube_outer').addEventListener('click', async() => click_dice());
async function click_dice(){
    if(!stopEvent){
        stopEvent = true;
        diceNum = await roll();
        let isOutOfRange = checkRange(diceNum);
        
        if (!isOutOfRange) {
            await run(diceNum);
            await checkLadderAndSnake();
        }

        let wonBy = checkWin();
        if (wonBy == 'none') {
            changeTurn();

            let currentPosition = coordinatesToPosition()
            const shortestPath = findShortestPath(boardGraph, currentPosition);
            await(drawArrow(shortestPath));
            stopEvent = false;
        }
    }
}



async function roll() {
    let diceNum = Math.floor(Math.random() * 6) + 1;
    
    let values = [[0, -360], [-180, -360], [-180, 270], [0, -90], [270, 180], [90, 90]];
    new Audio('./images/diceRoll.mp3').play();
    document.getElementById('cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`;
    await sleep(750);  // Wait for the dice animation to complete
    document.getElementById('cube_inner').style.transform = `rotateX(${values[diceNum - 1][0]}deg) rotateY(${values[diceNum - 1][1]}deg)`;
    return diceNum;
}

function checkRange(diceNum){
    let isOutOfRange = false;
    if(marginTop()==-88.2 && (marginLeft()+Number((diceNum*-9.8).toFixed(1)))<0){
        isOutOfRange=true
    }
    return isOutOfRange
}

function marginLeft()
{
    return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0])
}

function marginTop(){
    return Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0])
}

async function run(diceNum){
    for(let i=1; i<=diceNum; i++){
        let direction = getDirection();
        move(direction);
        await sleep(400); // This will create a delay of 500ms (0.5 seconds) between each move.
    }
}

function move(direction)
{

        new Audio('./images/move.mp3').play()    
        if(direction == 'up'){
            document.querySelector(`#${turn}`).style.marginTop = String(marginTop()-9.8)+'vmin'
        }    
        else if(direction == 'right'){
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft()+9.8)+'vmin'
        }    
        else if(direction == 'left'){
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft()-9.8)+'vmin'
        }    

}    
async function checkLadderAndSnake()
{

    for(let i=0;i<tos.length;i++){
        if(marginLeft()==froms[i][0] && marginTop()==froms[i][1]){
            new Audio("./images/move.mp3").play();

            document.querySelector(`#${turn}`).style.marginLeft = `${tos[i][0]}vmin`
            document.querySelector(`#${turn}`).style.marginTop = `${tos[i][1]}vmin`
        }    
    }   
    await sleep(400); 
}    
function checkWin(){
    
    if(marginTop()==-88.2 && marginLeft()==0){
        document.getElementById('p_turn').innerHTML = `${turn} player wins`
        new Audio("./images/win.mp3").play()
        return turn
    }
    return 'none'
}
function changeTurn(){
    if(turn=='blue'){
        document.getElementById('p_turn').innerHTML = "Red Player's turn"
        turn = 'red'
    }
    else if(turn == 'red'){
        document.getElementById('p_turn').innerHTML = "Blue Player's turn"
        turn = 'blue'
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}    


function getDirection(){
    let direction
    if(marginLeft()==88.2 && ((((marginTop()*10)%(-19.6*10)/10)==0))||(marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10!=0)))){
        direction = 'up'
    }    
    else if((((marginTop()*10)%(-19.6*10))/10)==0)
    {
    direction = 'right'        
    }
    else{
        direction = 'left'
    }    
    return direction;
}    

boxNumbers()
function boxNumbers(){
    let boxes = document.getElementsByClassName("box");
    // let boxes2 = document.getElementsById("box");

    let z1 = boxes.length;//100
    let z2 = parseInt(Math.sqrt(z1));//10
    for(let i = 0;i<boxes.length;i++){
        let x = parseInt(i/z2);
        let y = (i+1)%z2;
        if(y==0) y = z2;
        if(x%2==0){
            boxes[i].innerHTML = z1+1-(y + z2*x);
        }
        else{
            boxes[i].innerHTML = z1+1-((z2-y+1) + z2*x);
        }
        
    }   
}
function coordinatesToPosition() {
    let x = Math.abs(Math.round(marginLeft() / 9.8));
    let y = Math.abs(Math.round(marginTop() / 9.8));
    let position;

    if (y % 2 === 0) { 
        position = (10 * y) + (x + 1);
    } else {
        position = (10 * (y + 1)) - x;
    }

    return position;
}
function positionToCoordinates(position) {
    let y = Math.round(Math.floor((position - 1) / 10));
    let x = Math.round((position - 1) % 10);

    if (y % 2 === 1) {
        x = 9 - x;
    }
    return { x, y };
}

function generateBoardGraph() {
    const boardGraph = {};
    
    for (let i = 1; i <= 100; i++) {
        boardGraph[i] = [];
        for (let diceRoll = 1; diceRoll <= 6; diceRoll++) {
            let nextPosition = i + diceRoll;
            if (nextPosition <= 100) boardGraph[i].push(nextPosition);
        }
    }

    const laddersAndSnakes = {
        2:23,
        11:28,
        16:35,
        25:44,
        32:53,
        58:65,
        51:72,
        60:79,
        67:88,
        77:98,
        24:6,
        50:30,
        42:23,
        68:36,
        76:66,
        94:75,
        92:71,
        99:39,
        7:66,
    };


    for (const start in laddersAndSnakes) {
        const end = laddersAndSnakes[start];
        let size = 9.8;
        let posStart = positionToCoordinates(start);
        let stx = size*(posStart.x);
        let sty = -size*(posStart.y);
        
        let posEnd = positionToCoordinates(end);
        let endx = size*(posEnd.x);
        let endy = -size*(posEnd.y);

        stx = +stx.toFixed(2);
        sty = +sty.toFixed(2);
        endx = +endx.toFixed(2);
        endy = +endy.toFixed(2);


        froms.push([stx,sty]);
        tos.push([endx,endy]);
        boardGraph[start] = [end];
    }

    return boardGraph;
}

function findShortestPath(graph, start) {
    const queue = [[start]]; // Queue of paths
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift(); // Get the path to explore
        const node = path[path.length - 1]; // Get the last node in the path

        if (node === 100) {
            // Found the path to the end
            return path;
        }

        if (!visited.has(node)) {
            // Mark the node as visited
            visited.add(node);

            // Get the adjacent nodes (the dice roll outcomes)
            const adjacentNodes = graph[node];
            for (const nextNode of adjacentNodes) {
                // Construct the new path and add it to the queue
                const newPath = path.concat(nextNode);
                queue.push(newPath);
            }
        }
    }

    // No path found
    return null;
}
const boardGraph = generateBoardGraph();

const canvas = document.getElementById('boardCanvas');
const ctx = canvas.getContext('2d');

// Scale the canvas to the viewport
const size = Math.min(window.innerWidth, window.innerHeight);
canvas.width = size;
canvas.height = size;
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
async function drawArrow(path){
    clearCanvas();
    for (let i = 0; i < path.length - 1; i++) {
        const start = positionToCanvasPoint(path[i]);
        const end = positionToCanvasPoint(path[i + 1]);
        drawArrowEach(start.x, start.y, end.x, end.y);
        await sleep(300);
    }
}

function drawArrowEach(fromx, fromy, tox, toy) {
  //variables to be used when creating the arrow
  const headlen = 10;

  const angle = Math.atan2(toy - fromy, tox - fromx);

  //starting path of the arrow from the start square to the end square
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);

  //starting a new path from the head of the arrow to one of the sides of the point
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));

  //path from the side point of the arrow, to the other side point
  ctx.moveTo(tox, toy);
  ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));

  //draws the paths created above
  ctx.strokeStyle = `${turn}`;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
}

// Convert position to canvas point
function positionToCanvasPoint(pos0) {
  let pos = positionToCoordinates(pos0);
  pos.y = 9 - pos.y;
  const size = 9.8; // size of a box in vmin, as before
  const vmin = Math.min(canvas.width, canvas.height) / 100;
  return {
    x: (pos.x * size) * vmin + (size / 2) * vmin,
    y: (pos.y * size) * vmin + (size / 2) * vmin
  };
}