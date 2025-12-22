let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset-btn");
let newgamebtn=document.querySelector(".new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true ;    //playerX,playerO
const winPatterns=[
                [0,1,2],
                [0,3,6],
                [0,4,8],
                [1,4,7],
                [2,5,8],
                [2,4,6],
                [3,4,5],
                [6,7,8],

]; 
const winSound = new Audio("winning-218995.mp3");
winSound.volume = 0.6;
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

const colors = ["#f96767ff", "#00e5ff", "#ffd700", "#ff9800", "#8bc34a"];

function createConfetti(){
    confettiPieces = [];
    for(let i = 0; i < 150; i++){
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 150,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngle: 0,
            speed: Math.random() * 3 + 2
        });
    }
}

function drawConfetti(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x + p.tilt, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });

    updateConfetti();
}

function updateConfetti(){
    confettiPieces.forEach(p => {
        p.y += p.speed;
        p.tiltAngle += 0.1;
        p.tilt = Math.sin(p.tiltAngle) * 10;

        if(p.y > canvas.height){
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
}

function startConfetti(){
    createConfetti();
    let animation = setInterval(drawConfetti, 20);

   
    setTimeout(() => {
        clearInterval(animation);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);
}

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("o", "x");
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation! winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
    
    winSound.currentTime = 0;
    winSound.play();  
    startConfetti();
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box is clicked");

        if(turnO==true){
            box.innerText="O";
              box.classList.add("o");
            turnO=false;
        }
        else{
            box.innerText="X";
             box.classList.add("x");
            turnO=true;
        }
        box.disabled=true;

         checkWinner();
    });
});

const checkWinner=()=>{
    for( let pattern of winPatterns){
        let pos1value=boxes[pattern[0]].innerText;
        let pos2value=boxes[pattern[1]].innerText;
        let pos3value=boxes[pattern[2]].innerText;
         if(pos1value!=""&& pos2value!=""&&pos3value!="")
            if(pos1value==pos2value&&pos2value==pos3value){
                console.log("win");

                showWinner(pos1value);
            }
       
    }
}
const resetgame=()=>{
     turnO=true;
     enableboxes();
     msgcontainer.classList.add("hide");
}
newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
