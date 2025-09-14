let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let btns = ["red", "yellow", "green", "purple"];
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");

let highscore = localStorage.getItem("simon_highscore") || 0;
h2.innerHTML = `High Score : ${highscore}`;

// document.addEventListener("keypress", function () {
//     if (started == false) {
//         // console.log("priented");
//         started = true;

//         levelUp();
//     }
// });
document.addEventListener("click", startgame);
document.addEventListener("keypress", startgame);
document.addEventListener("touchstart", startgame);

function startgame(){
    if(started == false) {
        started= true;
        levelUp();
    }
};


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // gameseq.push(randColor);
    // console.log(randBtn);
    gameseq.push(randColor);
    // console.log(gameseq);
    gameFlash(randBtn);
};

function checkAnswer(idx) {

    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `game over! your score was <b> ${level} </b> <br> press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "rgb(204, 201, 201)";
        }, 200);


        if (level > highscore) {
            highscore = level;
            localStorage.setItem("simon_highscore", highscore);
            // console.log("your high score was",highscore);
            h2.innerHTML = `High Score : ${highscore}`;
        }
        reset();
        
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAnswer(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    level = 0;
    gameseq = [];
    started = false;
    userseq = [];

}

