/* =================
DOM Elements
================= */
const input = document.querySelector(".console-term");
const consoleBtn = document.querySelector(".console-confirm-btn");
const resetConsole = document.querySelector(".console-reset");
const container = document.querySelector(".console-container");

const btnOn = new Audio("./sounds/off-btn.mp3");
const consolePrompt = "console >> ";

/* =================
History
================= */
let history = JSON.parse(localStorage.getItem("consoleHistory")) || [];

function saveHistory() {
    localStorage.setItem("consoleHistory", JSON.stringify(history));
}

/* =================
Helpers
================= */
function play(sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

function animationCountSet(el) {
    if (!el) return;
    el.classList.add("animation-blink");
    setTimeout(() => el.classList.remove("animation-blink"), 800);
}

/* =================
Render
================= */
function renderHistory() {
    if (!container) return;

    container.innerHTML = "";

    history.forEach(item => {
        const line = document.createElement("div");
        line.className = "console-line";
        line.innerHTML = `<span style="color:#00FF9C">${consolePrompt}</span>${item.code}`;

        const result = document.createElement("div");
        result.className = "console-line";
        result.style.color = "#FF5555";
        result.textContent = item.result ?? "";

        container.append(line, result);
    });

    container.scrollTop = container.scrollHeight;
}

/* =================
Console logic
================= */
function consoleMessage() {
    if (!input) return;

    play(btnOn);

    const code = input.value.trim();
    if (!code) return;

    let result;

    try {
        result = eval(code);
        if (result === undefined) result;
    } catch (e) {
        result = e.toString();
    }

    history.push({ code, result });
    saveHistory();
    renderHistory();

    animationCountSet(consoleBtn);
    input.value = "";
}

/* =================
Events
================= */
consoleBtn?.addEventListener("click", consoleMessage);

resetConsole?.addEventListener("click", () => {
    play(btnOn);
    animationCountSet(resetConsole);

    setTimeout(() => {
        window.location.href = "./clear_console.html";
    }, 200);
});

/* =================
Start
================= */
renderHistory();
