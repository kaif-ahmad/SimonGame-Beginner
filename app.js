let gameSeq=[];
let userSeq=[];
let scores=[];
let btns=["red","yellow","blue","green"];
let started=false;
let level=0;
let HighScore=0;

let h2=document.querySelector("h2");
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started !");
        started=true;
        levelUp();
    }
});

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length)
            setTimeout(levelUp,1000);
    }else{
        if(level!=0){
            h2.innerHTML=`Game Over! Your <i>Score</i> was <b>${level-1}</b> <br>Press Any Key to Restart`;
            scores.push(level-1);
            for(let j=0;j<scores.length;j++){
                if(scores[j]>HighScore)
                    HighScore=scores[j];
            }
            h3.innerText=`Your Highest Score Was : ${HighScore}`; 
        }
        else
            h2.innerHTML=`Game Over! Your <i>Score</i> was <b>${0}</b> Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        resetGame();
    }
}

function gameFlash(btn){
    console.log(gameSeq);
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];

    level++;
    h2.innerText=`Level ${level}`;

    let ranInd=Math.floor(Math.random()*4);
    let ranCol=btns[ranInd];
    let ranBtn=document.querySelector(`.${ranCol}`);
    gameSeq.push(ranCol);
    gameFlash(ranBtn);
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    let userCol=btn.getAttribute("id");
    userSeq.push(userCol);

    checkAns(userSeq.length-1);
}

let allButtons=document.querySelectorAll(".btn");

for(bn of allButtons){
    bn.addEventListener("click",btnPress);
}

function resetGame(){
    started=false;
    userSeq=gameSeq=[];
    level=0;
}