console.log("hello World");

const CookieButton = document.getElementById("CookieButton");
const moreCookie = document.getElementById("moreCookie");
const CookieSpan = document.getElementById("CookieSpan");
const CPSSpan = document.getElementById("CPSSpan");

// const futureUpgrade = [
//   { name: "autoclicker", cost: 100, cpsIncrease: 1 },
//   { name: "Double Click", cost: 200, clickMultiplier: 2 },
// ];

const stats = {
  cookie: 0,
  CPS: 0,
};

const storageStats = JSON.parse(localStorage.getItem("stats"));

if (storageStats !== null) {
  stats.cookie = storageStats.cookie;
  stats.CPS = storageStats.CPS;
  updatePage();
}

//Aquire cookies
function buyCookie() {
  stats.cookie++;
  CookieSpan.textContent = stats.cookie;
  updatePage();
  updateStorage();
}

//Upgrade cookies for per second
function buyMore() {
  if (stats.cookie >= 10) {
    stats.CPS++;
    //can do it like stats.cookie -=10; //short hand
    stats.cookie = stats.cookie - 10;
    updatePage();
    updateStorage();
  }
}

//record how many cookies/collected
function updatePage() {
  CookieSpan.textContent = stats.cookie;
  CPSSpan.textContent = stats.CPS;
}

function updateStorage() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function resetGame() {
  stats.cookie = 0;
  stats.CPS = 0;
  updatePage();
  updateStorage();
}

CookieButton.addEventListener("click", buyCookie);
moreCookie.addEventListener("click", buyMore);

setInterval(function () {
  stats.cookie += stats.CPS;
  updatePage();
  updateStorage();
}, 1000);
