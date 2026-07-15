let gameSeq = [];
let userSeq = [];

let btns= ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keydown", function () {
    if(started == false) {
        console.log("Game is started !");
        started =  true;

        levelUp();
    }
});


//white color
function gameFlash(btn) {
    btn.classList.add("flash");


    //setting time to flash 
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}


//green flash
function userFlash(btn) {
    btn.classList.add("userFlash");
    //setting time to flash 
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    
    level++;
    h2.innerText = `Level ${level}`;


    //choose random button
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    //pushing random color --> gameSeq
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randomBtn);
    
}

function checkAns() {
    
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        console.log("Same value");

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            userSeq = [];
        }

    } else {
    console.log("Game Over");

        if (level > highScore) {
            highScore = level;
        }

    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>
    Highest Score: <b>${highScore}</b><br><br>
    Press any key to restart.`;

    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
}

}

function btnPress() {
    
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}