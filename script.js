
let turn = 'red'
let stopEvent = false
let diceNum;
let temp=1;//all types of delays halt
let froms = []
let tos = []
let turned = 0;
let laddersAndSnakes = {
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
let LandSmap = {
    l1:2,
    l10:11,
    l2:16,
    l5:25,
    l6:32,
    l9:58,
    l7:51,
    l3:60,
    l4:67,
    l8:77,
    s4:24,
    s8:50,
    s2:42,
    s1:68,
    s3:76,
    s5:94,
    s7:92,
    s9:99,
    l11:7,
};
document.getElementById('red').style.transform = `0vmin`
document.getElementById('blue').style.transform = `0vmin`

document.getElementById('main').addEventListener('click', async() => temp=0);
document.addEventListener('keydown', async (e) => temp=0);

document.getElementById(`${turn}`).style.zIndex = 1;




let isDragging = false;
let offsetX, offsetY;
let offX, offY;
let offXX, offYY;
let targetLeft, targetTop;
let flag = 1, flag3 = 0;
// if(turned == 0){
    document.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    document.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDragging);
// }
let target;
let flag2 = 1;
let Elements = document.getElementsByClassName('draggable');
let lock = false;

async function startDragging(event) {
    if(turned == 0){
        event.preventDefault();
        if(flag2==1){
            target = event.target;
            if(!(target.id[0]=='l' || target.id[0]=='s')) return;
        for (let i=0;i<Elements.length;i++){
            if(Elements[i].id!=target.id){
            Elements[i].classList.add('no-hover');
            }
        }
        target.classList.add('yes-hover');
        new_Position = LandSmap[target.id];
        new_EndPosition = laddersAndSnakes[LandSmap[target.id]];
        flag2 = 0;
    }
    const computedStyle = getComputedStyle(target);
    const computedLeftValueInPixels = parseFloat(computedStyle.getPropertyValue('left'));
    // Assuming window.innerWidth is the width of the viewport in pixels
    const vminEquivalentLeft = (computedLeftValueInPixels / Math.min(window.innerWidth,window.innerHeight)) * 100;
    
    targetLeft = vminEquivalentLeft;

    const computedTopValueInPixels = parseFloat(computedStyle.getPropertyValue('top'));
    // Assuming window.innerWidth is the width of the viewport in pixels
    const vminEquivalentTop = (computedTopValueInPixels / Math.min(window.innerWidth,window.innerHeight)) * 100;
    targetTop = vminEquivalentTop;
    temp_target = target.style;

    // Check if the clicked element has the 'draggable' class
    if (target.classList.contains('draggable')) {
        isDragging = true;

        // Get the bounding box of the main div
        const boundingBox = target.closest('.main').getBoundingClientRect();
        // Calculate the initial offset in percentage values relative to the bounding box
        offX = event.clientX/Math.min(boundingBox.width,boundingBox.height) * 100;
        offY = event.clientY/Math.min(boundingBox.width,boundingBox.height) * 100;
    }
}
}
let X,Y;
let tempx, tempy;
let newPosition, newEndPosition;
let new_Position, new_EndPosition;

let prevtemp1 = -100, prevtemp2 = -100; 
async function changes(){
    delete laddersAndSnakes[LandSmap[target.id]];
    delete LandSmap[target.id];
    laddersAndSnakes[new_Position] = new_EndPosition;
    LandSmap[target.id] = new_Position;
}
function checking(starting){
    return ((starting.x>=0 && starting.x<=9) && (starting.y>=0 && starting.y<=9))
}
async function drag(event) {
    if(turned == 0){
    if (isDragging) {
        // const target = document.querySelector('.draggable');


        // Calculate the new position in vmin units
        offXX = event.clientX/Math.min(window.innerWidth,window.innerHeight) * 100;
        offYY = event.clientY/Math.min(window.innerWidth,window.innerHeight) * 100;

        let temp1 = Math.floor((offXX - offX - 0.000000001)/9.8);
        let temp2 = Math.floor((offYY - offY - 0.000000001)/9.8);
        if (temp1<0) temp1++;
        if (temp2<0) temp2++;
        let tempp1=temp1*9.8;
        let tempp2=temp2*9.8;

        X = targetLeft + tempp1;
        Y = targetTop + tempp2;
        temp2 = -1*temp2;
        let prevCoord = positionToCoordinates(LandSmap[target.id]);
        tempx = prevCoord.x + temp1;
        tempy = prevCoord.y + temp2;
        let tx = tempx;
        let ty = tempy;

        flag = 0;
        newPositionTemp = coordinatesToPosition();
        flag = 1;
        newPosition = newPositionTemp;
        let start1 = positionToCoordinates(LandSmap[target.id]);
        let end1 = positionToCoordinates(laddersAndSnakes[LandSmap[target.id]]);
        let deltax = end1.x - start1.x;
        let deltay = end1.y - start1.y;
        let start2 = positionToCoordinates(newPosition);
        tempx = start2.x + deltax;
        tempy = start2.y + deltay;
        let end2 = start2;
        end2.x = tempx;
        end2.y = tempy;
        let ex = end2.x;
        let ey = end2.y;
        flag = 0;
        newEndPosition = coordinatesToPosition();
        flag = 1;
        if((laddersAndSnakes[newPositionTemp] == undefined || (temp1 == 0 && temp2 == 0)) && (temp1!=prevtemp1 || temp2!=prevtemp2) && (tx>=0 && tx <=9) && (ty>=0 && ty<=9) && (ex>=0 && ex <=9) && (ey>=0 && ey<=9) && !(tx==0 && ty==9)){
            new_Position = newPosition;
            new_EndPosition = newEndPosition;

            target.style.left = X + 'vmin';
            target.style.top = Y + 'vmin';

            prevtemp1 = temp1;
            prevtemp2 = temp2;
        }
    }
}
}


function stopDragging() {
    if(turned == 0){
    isDragging = false;
    changes();
    for (let i=0;i<Elements.length;i++){
        if(Elements[i].id!=target.id){
            Elements[i].classList.remove('no-hover');
        }
    }
    target.classList.remove('yes-hover');
    flag2 = 1;
    }
}


// if(turned == 1){
    document.addEventListener('keydown', async (e) => {
        if(turned == 1){
            // temp = 1;
            if (!stopEvent) {
                stopEvent = true;
                diceNum = await roll();
                let isOutOfRange = checkRange(diceNum);
                let wonBy;
                if (!isOutOfRange) {
                    await run(diceNum);
                    wonBy = checkWin();
                    await checkLadderAndSnake();
                    wonBy = checkWin();
                    while(flag3==1 && (wonBy == 'none')) {
                        // await sleep(400*temp); 
                        await checkLadderAndSnake();
                        wonBy = checkWin();
                    }
                }
                wonBy = checkWin();
    
                if (wonBy == 'none') {
                    changeTurn();
    
                    let currentPosition = coordinatesToPosition()
                    const shortestPath = findShortestPath(boardGraph, currentPosition);
                    await(drawArrow(shortestPath));
                    stopEvent = false;
                }
            }
        }
    });
// }

document.getElementById('main').addEventListener('click', async() => {
    if(turned == 1)
    click_dice()
});

async function click_dice(){
    if(turned == 1){
        // temp = 1;
        if (!stopEvent) {
            stopEvent = true;
            diceNum = await roll();
            let isOutOfRange = checkRange(diceNum);
            let wonBy;
            if (!isOutOfRange) {
                await run(diceNum);
                wonBy = checkWin();
                await checkLadderAndSnake();
                wonBy = checkWin();
                while(flag3==1 && (wonBy == 'none')) {
                    // await sleep(400*temp); 
                    await checkLadderAndSnake();
                    wonBy = checkWin();
                }
            }
            wonBy = checkWin();

            if (wonBy == 'none') {
                changeTurn();

                let currentPosition = coordinatesToPosition()
                const shortestPath = findShortestPath(boardGraph, currentPosition);
                await(drawArrow(shortestPath));
                stopEvent = false;
            }
        }
    }
}



async function roll() {
    temp=1;
    document.getElementById('cube_inner').style.transition = `all ${0.75*temp}s linear`;
    let diceNum = Math.floor(Math.random() * 6) + 1;
    
    let values = [[0, -360], [-180, -360], [-180, 270], [0, -90], [270, 180], [90, 90]];
    new Audio('./images/diceRoll.mp3').play();
    document.getElementById('cube_inner').style.transform = `rotateX(360deg) rotateY(360deg)`;
    await sleep(750*temp);  // Wait for the dice animation to complete
    document.getElementById('cube_inner').style.transition = `all ${0.75*temp}s linear`;
    
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
    temp=1;
    for(let i=1; i<=diceNum; i++){
        let direction = getDirection();
        move(direction);
        await sleep(400*temp); // This will create a delay of 400ms (0.4 seconds) between each move.
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
    temp = 1;
    flag3 = 0;
    for(let i=0;i<tos.length;i++){
        if(marginLeft()==froms[i][0] && marginTop()==froms[i][1]){
            flag3 = 1;
            new Audio("./images/move.mp3").play();
            document.querySelector(`#${turn}`).style.marginLeft = `${tos[i][0]}vmin`
            document.querySelector(`#${turn}`).style.marginTop = `${tos[i][1]}vmin`
            await sleep(400*temp); 
        }    
    }
    // await sleep(400*temp); 
    // if(flag3 == 1) await checkLadderAndSnake();
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
    let direction;
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
    let x,y;
    if(flag==1){
        x = Math.abs(Math.round(marginLeft() / 9.8));
        y = Math.abs(Math.round(marginTop() / 9.8));
    }
    else{
        x = tempx;
        y = tempy;
    }
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
        let path = queue.shift(); // Get the path to explore
        let node = path[path.length - 1]; // Get the last node in the path

        if (node === 100) {
            // Found the path to the end
            return path;
        }

        if (!visited.has(node)) {
            visited.add(node);
            // Mark the node as visited
            if(laddersAndSnakes[node] != undefined){
                while(laddersAndSnakes[node] != undefined && !visited.has(laddersAndSnakes[node])){
                    visited.add(node);
                    path = path.concat(laddersAndSnakes[node]);
                    queue.push(path);
                    node = path[path.length - 1];
                    if (node === 100) {
                        // Found the path to the end
                        return path;
                    }
                }
                // visited.add(node);
                queue.push(path);
            }
            else{
                // Get the adjacent nodes (the dice roll outcomes)
                visited.add(node);
                let adjacentNodes = graph[node];
                for (let nextNode of adjacentNodes) {
                    // Construct the new path and add it to the queue
                    let newPath = path.concat(nextNode);
                    queue.push(newPath);
                }
            }
        }
    }

    // No path found
    return null;
}
var boardGraph;
// document.addEventListener('keydown', async (e) => {
//     if(e.key === "x"){
//         console.log("x");
//     }
// });
function started(){
    // console.log("turned on")
    let text = document.getElementById("startButton").innerHTML;
    if(text == "Start Game"){
        document.getElementById("startButton").style.backgroundColor = "#800080";
        boardGraph = generateBoardGraph();
        turned = 1;
        document.getElementById("startButton").innerHTML = "Reset Game";
        for (let i=0;i<Elements.length;i++){
            Elements[i].classList.add('no-hover');
        }
    }
    else{
        location.reload();
    }
}

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
    temp=1;
    for (let i = 0; i < path.length - 1; i++) {
        const start = positionToCanvasPoint(path[i]);
        const end = positionToCanvasPoint(path[i + 1]);
        drawArrowEach(start.x, start.y, end.x, end.y);
        // document.getElementById('main').addEventListener('click', async() => temp=0);
        // document.addEventListener('keydown', async (e) => temp=0);
        await sleep(250*temp);
        // document.getElementById('main').addEventListener('click', async() => temp=0);
        // document.addEventListener('keydown', async (e) => temp=0);
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

// for(var i = 0;i<5;i++){
//     setTimeout(function(){
//         console.log(i);
//     },1000);
// }
// for(let i = 0;i<5;i++){
//     setTimeout(function(){
//         console.log(i);
//     },1000);
// }
