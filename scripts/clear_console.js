/*=================
DOM Elements
=================*/
const clearConsoleBtn = document.querySelector(".clear-console-btn");
const returnBtn = document.querySelector(".return-console");

const btnOn = new Audio("./sounds/off-btn.mp3");

function play(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function animationCountSet(item) {
    item.classList.add("animation-blink");
    setTimeout(() => item.classList.remove("animation-blink"), 800);
}

// підтвердження очистки
clearConsoleBtn.addEventListener("click", () => {
    play(btnOn);
    animationCountSet(clearConsoleBtn);

    localStorage.removeItem("consoleHistory");

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 300);
});

// касування
returnBtn.addEventListener("click", () => {
    play(btnOn);
    animationCountSet(returnBtn);

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 200);
});