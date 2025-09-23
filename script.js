const mode = document.getElementById("mode");
const inputValue = document.getElementById("inputValue");
const label1 = document.getElementById("label1");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const unitSpan = document.querySelector(".input-box .unit");

// 基準値
const baseRice = 340;     // g
const baseWater = 470;    // cc
const baseCooked = 760;   // g

function setResult(element, value, unit) {
  element.innerHTML = `<span class="num">${value}</span><span class="unit"> ${unit}</span>`;
}

function calculate() {
  let val = parseFloat(inputValue.value);
  if (isNaN(val) || val <= 0) {
    setResult(result1, "-", "");
    setResult(result2, "-", "");
    return;
  }

  let rice, cooked, water;

  if (mode.value === "rice") {
    rice = val;
    cooked = Math.round(rice * baseCooked / baseRice);
    water = Math.round(rice * baseWater / baseRice);
    label1.textContent = "炊きあがり";
    setResult(result1, cooked, "g");
    setResult(result2, water, "cc");
    unitSpan.textContent = "g";
  } else {
    cooked = val;
    rice = Math.round(cooked * baseRice / baseCooked);
    water = Math.round(rice * baseWater / baseRice);
    label1.textContent = "お米";
    setResult(result1, rice, "g");
    setResult(result2, water, "cc");
    unitSpan.textContent = "g";
  }
}

// イベントリスナー
mode.addEventListener("change", calculate);
inputValue.addEventListener("input", calculate);

// 初期計算
calculate();
