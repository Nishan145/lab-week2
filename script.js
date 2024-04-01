console.log("hello World");

const CookieButton = document.getElementById("CookieButton");
const moreCookie = document.getElementById("moreCookie");
const CookieSpan = document.getElementById("CookieSpan");
const CPSSpan = document.getElementById("CPSSpan");
const MajorUpgradeButton = document.getElementById("MajorUpgradeButton");
const MajorUpgradeCPSSpan = document.getElementById("MajorUpgradeCPSSpan");

const stats = {
  cookie: 0,
  CPS: 0,
  tenCPS: 0,
};

const storageStats = JSON.parse(localStorage.getItem("stats"));

if (storageStats !== null) {
  stats.cookie = storageStats.cookie;
  stats.CPS = storageStats.CPS;
  stats.tenCPS = storageStats.tenCPS;
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
    stats.CPS += 10;
    //can do it like stats.cookie -=10; //short hand
    stats.cookie = stats.cookie - 10;
    updatePage();
    updateStorage();
  }
}

//getting 100 more added
function buyMajorUpgrade() {
  if (stats.cookie >= 100) {
    stats.tenCPS += 100;
    stats.cookie -= 100;
    updatePage();
    updateStorage();
  }
}
//record how many cookies/collected
function updatePage() {
  CookieSpan.textContent = stats.cookie;
  CPSSpan.textContent = stats.CPS;
  MajorUpgradeCPSSpan.textContent = stats.tenCPS;
}

function updateStorage() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

//allow the user to reset
function resetGame() {
  stats.cookie = 0;
  stats.CPS = 0;
  stats.tenCPS = 0;
  updatePage();
  updateStorage();
}

CookieButton.addEventListener("click", buyCookie);
moreCookie.addEventListener("click", buyMore);
MajorUpgradeButton.addEventListener("click", buyMajorUpgrade);

// proc on every 1 sec
setInterval(function () {
  stats.cookie += stats.CPS;
  updatePage();
  updateStorage();
}, 1000);
