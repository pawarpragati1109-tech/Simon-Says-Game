let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let highScore = Number(localStorage.getItem("highScore")) || 0;

const highScoreDisplay = document.querySelector("#high-score");
const h2 = document.querySelector("h2");

highScoreDisplay.innerText = highScore;

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {

    userSeq = [];

    level++;

    h2.innerText = `⭐ Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    gameFlash(randomBtn);
}

function checkAns() {

    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }

    } else {

        let isNewHighScore = false;

        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.innerText = highScore;
            isNewHighScore = true;
        }

        if (isNewHighScore) {

            h2.innerHTML = `
            🎉 <b>NEW HIGH SCORE!</b><br><br>
            ⭐ Your Score : <b>${level}</b><br>
            🏆 Best Score : <b>${highScore}</b><br><br>
            Press any key to restart
            `;

        } else {

            h2.innerHTML = `
            💀 <b>GAME OVER</b><br><br>
            ⭐ Your Score : <b>${level}</b><br>
            🏆 Best Score : <b>${highScore}</b><br><br>
            Press any key to restart
            `;
        }

        document.body.style.background = "#ff4d4d";

        setTimeout(() => {
            document.body.style.background =
                "linear-gradient(135deg,#4f46e5,#7c3aed,#0ea5e9)";
        }, 200);

        reset();
    }
}

function btnPress() {

    if (!started) return;

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}