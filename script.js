const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.querySelector("#input");
const resultInput = document.querySelector("#result");

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "];

const charKeys = document.querySelectorAll(".charKey").forEach((charKeyBtn) => {
    charKeyBtn.addEventListener("click", () => {
        const BtnValue = charKeyBtn.dataset.value;
        input.value += BtnValue;
    });
});

const clearInput = document.querySelector("#clear").addEventListener("click", () => {
    input.value = '';
    input.focus();
});

input.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key;
        return;
    }
    if (ev.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    }
    if (ev.key === "Enter") {
        calculate();
    }
});

const equal = document.querySelector("#equal").addEventListener("click", calculate);

function calculate() {
    resultInput.value = "ERROR";
    resultInput.classList.add("error");

    const result = eval(input.value); 
    
    resultInput.value = result;
    resultInput.classList.remove("error");
}

const copyToClipboard = document.querySelector("#copyToClipboard").addEventListener("click", (ev) => {
    copyBtn = ev.currentTarget;
    if (copyBtn.innerText === "Copy") {
        copyBtn.innerText = "Copied!";
        copyBtn.classList.add("success");
        window.navigator.clipboard.writeText(resultInput.value);
    } else {
        copyBtn.innerText = "Copy";
        copyBtn.classList.remove("success");
    }
});

const changeTheme = document.querySelector("#themeSwitcher").addEventListener("click", () => {
    if (main.dataset.theme === "dark") {
        root.style.setProperty("--bg-color", "#f1f5f9");
        root.style.setProperty("--border-color", "#aaa");
        root.style.setProperty("--font-color", "#212529");
        root.style.setProperty("--primary-color", "#26834a");
        main.dataset.theme = "light";
    } else {
        root.style.setProperty("--bg-color", "#212529");
        root.style.setProperty("--border-color", "#666");
        root.style.setProperty("--font-color", "#f1f5f9");
        root.style.setProperty("--primary-color", "#4dff91");
        main.dataset.theme = "dark";
    }
});

