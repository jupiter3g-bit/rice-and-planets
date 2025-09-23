const planetSelect = document.getElementById("planet");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const result4 = document.getElementById("result4");

// データ（km）
const planetData = {
  Sun: { distance: 149600000, diameter: 1392700 },
  Moon: { distance: 384400, diameter: 3474 },
  Mercury: { distance: 91700000, diameter: 4879 },
  Venus: { distance: 41400000, diameter: 12104 },
  Mars: { distance: 78300000, diameter: 6779 },
  Jupiter: { distance: 628700000, diameter: 139820 },
  Saturn: { distance: 1277000000, diameter: 116460 },
  Uranus: { distance: 2723950000, diameter: 50724 },
  Neptune: { distance: 4351400000, diameter: 49244 }
};

const earthDiameter = 12742;

// 数字を億・万単位に変換
function formatJP(num) {
  if (num >= 100000000) {
    let oku = Math.floor(num / 100000000);
    let man = Math.floor((num % 100000000) / 10000);
    return man ? `${oku}億${man}万` : `${oku}億`;
  } else if (num >= 10000) {
    return `${Math.floor(num / 10000)}万`;
  } else {
    return num.toString();
  }
}

// 移動時間計算（時速1000km）
function calculateTravelTime(distanceKm, speedKmH = 1000) {
  let totalHours = distanceKm / speedKmH;

  const years = Math.floor(totalHours / (24 * 365));
  totalHours -= years * 24 * 365;

  const months = Math.floor(totalHours / (24 * 30));
  totalHours -= months * 24 * 30;

  const days = Math.floor(totalHours / 24);
  totalHours -= days * 24;

  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);
  const seconds = Math.floor((((totalHours - hours) * 60) - minutes) * 60);

  let str = "";
  if (years) str += `${years}年`;
  if (months) str += `${months}ヶ月`;
  
  // 年＋月で改行
  str += "<br>";

  if(days) str += `${days}日`;
  if(hours) str += `${hours}時間`;
  if(minutes) str += `${minutes}分`;
  if(seconds) str += `${seconds}秒`;

  return str || "0秒";
}

// 情報更新
function updatePlanetInfo() {
  const selected = planetSelect.value;
  const data = planetData[selected];

  // 距離と直径の表示
  result1.innerHTML = `<span class="num">${formatJP(Math.round(data.distance))}</span><span class="unit"> km</span>`;
  result2.innerHTML = `<span class="num">${formatJP(data.diameter)}</span><span class="unit"> km</span>`;

  // 地球の何倍（整数／小数）
  let ratio = data.diameter / earthDiameter;
  let multipleStr;
  if (ratio >= 1) {
    multipleStr = Math.round(ratio); // 地球以上は整数
  } else {
    multipleStr = ratio.toFixed(2); // 地球未満は小数
  }
  result3.innerHTML = `<span class="num">${multipleStr}</span><span class="unit"> 倍</span>`;

  // 移動時間表示
  const travelTimeStr = calculateTravelTime(data.distance);
  result4.innerHTML = `<span class="num">${travelTimeStr}</span>`;
}

// 初期表示
updatePlanetInfo();

// 選択変更時
planetSelect.addEventListener("change", updatePlanetInfo);
