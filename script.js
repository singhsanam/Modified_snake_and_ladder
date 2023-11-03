
let turn = 'red'
let stopEvent = false
let diceNum;
document.getElementById('red').style.transform = `0vmin`
document.getElementById('red').style.transform = `0vmin`
document.getElementById('blue').style.transfrom = `0vmin`
document.getElementById('blue').style.transform = `0vmin`

document.addEventListener('keydown', async (e) => {
    // ... (rest of the code unchanged)

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
            stopEvent = false;
        }
    }
});

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
        await sleep(400); // This will create a delay of 500ms (0.5 seconds) between each move. You can adjust this value as needed.
    }
}

function move(direction)
{

        // return new Promise(async(resolve,reject)=>{
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
    //     await new Promise(resolve => setTimeout(resolve,1000))    
    //     resolve()
    // })
}    
async function checkLadderAndSnake()
{
    let froms = [[29.4,-19.6],[9.8,0],[49,-9.8],[88.2,-9.8],[39.2,-19.6],[88.2,-39.2],[78.4,-29.4],[68.6,-58.8],[9.8,-49],[88.2,-49],[19.6,-49],[0,-49],[39.2,-68.6],[58.8,-58.8],[78.4,-88.2],[58.8,-88.2],[29.4,-68.6],[0,-49],[68.6,-58.8]]
    let tos = [[49,0],[19.6,-19.6],[58.8,-29.4],[68.6,-19.6],[29.4,-39.2],[88.2,-19.6],[68.6,-49],[39.2,-29.4],[19.6,-29.4],[78.4,-68.6],[39.2,-58.8],[9.8,-68.6],[49,-58.8],[68.6,-78.4],[88.2,-68.6],[49,-68.6],[19.6,-88.2],[9.8,-68.6],[39.2,-29.4]]

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
        // boxes[i].style.backgroundColor = "red";
    }   
}

// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");

// // Function to draw an arrowed line
// function drawArrowedLine(startX, startY, endX, endY) {
//     // Calculate the angle of the line
//     var angle = Math.atan2(endY - startY, endX - startX);

//     // Calculate the position of the arrowhead
//     var arrowX = endX - 20 * Math.cos(angle);
//     var arrowY = endY - 20 * Math.sin(angle);

//     // Draw the line
//     ctx.beginPath();
//     ctx.moveTo(startX, startY);
//     ctx.lineTo(arrowX, arrowY);
//     ctx.stroke();

//     // Draw the arrowhead
//     ctx.beginPath();
//     ctx.moveTo(arrowX, arrowY);
//     ctx.lineTo(arrowX - 10 * Math.cos(angle - Math.PI / 6), arrowY - 10 * Math.sin(angle - Math.PI / 6));
//     ctx.lineTo(arrowX - 10 * Math.cos(angle + Math.PI / 6), arrowY - 10 * Math.sin(angle + Math.PI / 6));
//     ctx.closePath();
//     ctx.fill();
// }

// // Example coordinates
// var startX = 100;
// var startY = 100;
// var endX = 600;
// var endY = 600;

// // Call the function to draw the arrowed line
// drawArrowedLine(startX, startY, endX, endY);