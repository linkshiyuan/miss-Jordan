let star = document.querySelector(".star");

let bullets;
let findBulletTime;
let enemys2Fly;
star.addEventListener("click", starGame);

// 开始游戏
function starGame() {
  star.remove();

  let plane = document.querySelector(".plane");

  plane.style.display = "block";

  // 鼠标按住飞机
  plane.addEventListener("mousedown", event => {
    let shiftX = event.clientX - plane.offsetLeft;

    let shiftY = event.clientY - plane.offsetTop;

    document.addEventListener("mousemove", handleMove);

    document.addEventListener("mouseup", handleStop);

    // 移动鼠标
    function handleMove(event) {
      plane.style.left = event.pageX - shiftX + "px";

      plane.style.top = event.pageY - shiftY + "px";
    }

    // 放开鼠标
    function handleStop(event) {
      document.removeEventListener("mousemove", handleMove);

      document.removeEventListener("mouseup", handleStop);
    }
  });

  plane.ondragstart = () => false;

  //创建子弹
  function createBullets() {
    for (let i = 0; i < 20; i++) {
      let bullet = document.createElement("img");

      bullet.classList.add("bullet");

      bullet.style.display = "block";

      plane.after(bullet);

      bullet.style.top = "-30px";
      bullet.style.left = "-1000px";
    }
  }
  createBullets();

  bullets = document.querySelectorAll(".bullet");

  // 找到子弹

  findBulletTime = setInterval(findBullet, 200);

  function findBullet() {
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].offsetTop < 0) {
        bullets[i].style.left = plane.offsetLeft + 29 + "px";
        bullets[i].style.top = plane.offsetTop - 12 + "px";

        break;
      }
    }
  }
  findBullet();

  // 发射子弹

  let BulletFly = setInterval(bulletFly, 20);

  function bulletFly() {
    for (let j = 0; j < bullets.length; j++) {
      if (bullets[j].offsetTop >= 30) {
        bullets[j].style.top = bullets[j].offsetTop - 10 + "px";
      } else {
        bullets[j].style.top = "-200px";
        bullets[j].style.left = "-200px";
      }
    }
  }

  let bulletVoice = document.querySelector(".bulletVoice");

  bulletVoice.play();

  // 创建小敌人
  function createEnemy1() {
    for (let i = 0; i < 10; i++) {
      let enemy1 = document.createElement("span");

      enemy1.classList.add("enemy1");

      // enemy1.style.display = "block";

      enemy1.setAttribute("enemy1-speed", _.random(3, 7));

      plane.after(enemy1);

      enemy1.style.top = "0px";
    }
  }
  createEnemy1();

  // 找到小敌人

  let enemys1 = document.querySelectorAll(".enemy1");

  let bg = document.querySelector(".bg");

  function findEnemys1() {
    for (let i = 0; i < enemys1.length; i++) {
      if (enemys1[i].offsetTop < bg.offsetHeight) {
        enemys1[i].style.left = _.random(0, bg.offsetWidth - 30) + "px";

        enemys1[i].style.top = _.random(0, -800) + "px";
      }
    }
  }
  findEnemys1();

  // 让小敌人恢复初始位置
  function recoverEnemys1() {
    for (let enemy of enemys1) {
      if (enemy.offsetTop >= bg.offsetHeight) {
        enemy.setAttribute("enemy1-speed", _.random(3, 7));
        enemy.style.left = _.random(0, bg.offsetWidth - 30) + "px";
        enemy.style.top = _.random(0, -800) + "px";
      }
    }
  }
  setInterval(recoverEnemys1, 5);

  // 让小敌人飞
  let enemys1Fly = setInterval(Enemys1Fly, 20);

  function Enemys1Fly() {
    for (let j = 0; j < enemys1.length; j++) {
      if (enemys1[j].offsetTop < bg.offsetHeight) {
        let step = +enemys1[j].getAttribute("enemy1-speed");

        enemys1[j].style.top = enemys1[j].offsetTop + step + "px";
      }
    }
  }
  Enemys1Fly();

  // 创建大敌人
  function createEnemy2() {
    for (let i = 0; i < 2; i++) {
      let enemy2 = document.createElement("span");

      enemy2.classList.add("enemy2");

      // enemy2.style.display = "block";

      // enemy2.setAttribute('enemy2-speed',_.random(3,7));

      plane.after(enemy2);

      // enemy2.style.top= '30px';
    }
  }
  createEnemy2();

  // 找到大敌人

  let enemys2 = document.querySelectorAll(".enemy2");

  function findEnemys2() {
    for (let i = 0; i < enemys2.length; i++) {
      if (enemys2[i].offsetTop < bg.offsetHeight) {
        enemys2[i].style.left = _.random(0, bg.offsetWidth - 30) + "px";

        enemys2[i].style.top = _.random(-500, -2500) + "px";
      }
    }
  }
  findEnemys2();

  // 让大敌人恢复初始位置
  function recoverEnemys2() {
    for (let enemy2 of enemys2) {
      if (enemy2.offsetTop >= bg.offsetHeight) {
        // enemy2.setAttribute('enemy2-speed',_.random(3,7));
        enemy2.style.left = _.random(0, bg.offsetWidth - 30) + "px";
        enemy2.style.top = _.random(-500, -2500) + "px";
      }
    }
  }
  setInterval(recoverEnemys2, 1);

  // 让大敌人飞
  enemys2Fly = setInterval(Enemys2Fly, 30);

  function Enemys2Fly() {
    for (let j = 0; j < enemys2.length; j++) {
      if (enemys2[j].offsetTop < bg.offsetHeight) {
        // let step= +enemys2[j].getAttribute('enemy2-speed');

        enemys2[j].style.top = enemys2[j].offsetTop + 6 + "px";
      }
    }
  }
  Enemys2Fly();

  // 找到子弹击中小敌人
  let HitSmallEnemyTime = setInterval(HitSmallEnemy, 10);

  function HitSmallEnemy() {
    for (let enemy of enemys1) {
      for (let bullet of bullets) {
        if (checkIntersect(enemy, bullet) && !enemy.querySelector(".boom")) {
          let boomm = document.createElement("div");
          boomm.classList.add("boom");
          boomm.style.transform = "scale(2)";
          enemy.append(boomm);
          let recoverEnemyTime = setTimeout(recoverEnemy, 400, enemy);
        }
      }
    }
  }
  function recoverEnemy(enemy) {
    enemy.innerHTML = "";
    enemy.style.left = _.random(0, bg.offsetWidth - 30) + "px";
    enemy.style.top = _.random(-800, -100) + "px";
  }

  function checkIntersect(elA, elB) {
    let rectA = elA.getBoundingClientRect();
    let rectB = elB.getBoundingClientRect();
    let nonIntersect =
      rectB.right < rectA.left ||
      rectB.left > rectA.right ||
      rectB.bottom < rectA.top ||
      rectB.top > rectA.bottom;
    return !nonIntersect;
  }
  HitSmallEnemy();

  // 找到子弹击中大敌人
  let HitBigEnemyTime = setInterval(HitBigEnemy, 600);

  function HitBigEnemy() {
    for (let enemy of enemys2) {
      for (let bullet of bullets) {
        if (checkIntersect(bullet, enemy)) {
          if (!enemy.querySelector(".boom")) {
            let boomm = document.createElement("div");
            boomm.classList.add("boom");
            boomm.style.transform = "scale(2.5)";
            enemy.append(boomm);
          }
          let recoverEnemyTime = setTimeout(() => recoverEnemy(enemy), 300);
        }
      }
    }
  }
  function recoverEnemy(enemy) {
    enemy.style.left = _.random(30, bg.offsetWidth - 30) + "px";
    enemy.style.top = _.random(-1200, -800) + "px";
    enemy.innerHTML = "";
  }
  HitBigEnemy();

  // 击中大敌人让子弹消失
  let BulletHitBigEnemyTime = setInterval(BulletHitBigEnemy, 60);

  function BulletHitBigEnemy() {
    for (let enemy of enemys2) {
      for (let bullet of bullets) {
        if (checkIntersect(bullet, enemy)) {
          bullet.style.left = "-100px";
          bullet.style.top = "-100px";
        }
      }
    }
  }

  BulletHitBigEnemy();

  // 创建子弹奖励
  function createBulletAward() {
    for (let i = 0; i < 3; i++) {
      let bulletAward = document.createElement("span");

      bulletAward.classList.add("bullet-award");

      // bulletAward.style.display = "block";

      // enemy2.setAttribute('enemy2-speed',_.random(3,7));

      plane.after(bulletAward);

      console.log("1");

      bulletAward.style.top = "-60px";
    }
  }
  createBulletAward();

  //  找到子弹奖励

  let bulletAwards = document.querySelectorAll(".bullet-award");

  function findBulletAwards() {
    for (let i = 0; i < bulletAwards.length; i++) {
      if (bulletAwards[i].offsetTop < bg.offsetHeight) {
        bulletAwards[i].style.left = _.random(0, bg.offsetWidth - 30) + "px";

        bulletAwards[i].style.top = _.random(-600, -1200) + "px";
      }
    }
  }
  findBulletAwards();

  //  让子弹奖励飞

  let bulletAwardsFly = setInterval(BulletAwardsFly, 10);

  function BulletAwardsFly() {
    for (let j = 0; j < bulletAwards.length; j++) {
      if (bulletAwards[j].offsetTop < bg.offsetHeight) {
        // let step= +enemys2[j].getAttribute('enemy2-speed');

        bulletAwards[j].style.top = bulletAwards[j].offsetTop + 3 + "px";
      }
    }
  }
  BulletAwardsFly();

  // 让奖励恢复初始位置

  function recoverBulletAwards() {
    for (let bulletaward of bulletAwards) {
      if (bulletaward.offsetTop >= bg.offsetHeight) {
        // enemy2.setAttribute('enemy2-speed',_.random(3,7));
        bulletaward.style.left = _.random(0, bg.offsetWidth - 30) + "px";
        bulletaward.style.top = _.random(-2500, -5000) + "px";
      }
    }
  }
  setInterval(recoverBulletAwards, 1);

  // // 飞机碰到子弹奖励
  let getBulletAwardTime = setInterval(getBulletAward, 100);

  function getBulletAward() {
    for (let bulletAward of bulletAwards) {
      if (checkIntersect(bulletAward, plane)) {
        bulletAward.style.left = _.random(30, bg.offsetWidth - 30) + "px";
        bulletAward.style.top = _.random(-2500, -5000) + "px";
      }
    }
  }
  getBulletAward();

  //飞机碰到敌人
  function hitPlane() {
    for (let enemy1 of enemys1) {
      if (checkIntersect(enemy1, plane) && !plane.querySelector(".boom")) {
        let boomm = document.createElement("div");
        boomm.classList.add("boom");
        boomm.style.transform = "scale(2)";
        plane.append(boomm);
        let recoverPlaneTime = setTimeout(() => recoverPlane(plane), 600);
        clearInterval(findBulletTime);
      }
      // for (let enemy2 of enemys2) {
      //   if (checkIntersect(enemy2, plane)) {
      //     bulletAward.style.left = _.random(30, bg.offsetWidth - 30) + "px";
      //     bulletAward.style.top = _.random(-800, -1200) + "px";
      //   }
      // }
    }
  }
  setInterval(hitPlane, 50);
}

function recoverPlane(plane) {
  plane.style.display = "none";
  for (let bullet of bullets) {
    if (bullet.offsetTop > -bullet.offsetHeight) {
      bullet.style.top = -bullet.offsetHeight + "px";
    }
  }
}
