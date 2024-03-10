let gameArea = document.getElementById("gameArea");

let player = { speed: 7, score: 0 };

for (let i = 0; i < 5; i++) {
  let roadLineElement = document.createElement("div");
  roadLineElement.setAttribute("class", "roadLines");
  roadLineElement.y = i * 150;
  roadLineElement.style.top = roadLineElement.y + "px";
  gameArea.appendChild(roadLineElement);
}

let carElement = document.createElement("div");
carElement.setAttribute("class", "car");
carElement.style.top ='340px'
gameArea.appendChild(carElement);

player.x = carElement.offsetLeft;
player.y = carElement.offsetTop;

for (let i = 0; i < 3; i++) {
  let enemyCar = document.createElement("div");
  enemyCar.setAttribute("class", "enemyCar");
  enemyCar.y = (i + 1) * 350 * 1;
  enemyCar.style.top = enemyCar.y + "px";
  enemyCar.style.backgroundColor = randomColor();
  enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
  gameArea.appendChild(enemyCar);
}

document.addEventListener("keydown", gamePlayer);

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0"+ String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

function gamePlayer(e) {
    let road = gameArea.getBoundingClientRect()
    console.log(road);

  let key = e.key;
  let x = parseInt(carElement.style.left) || 0;
  let y = parseInt(carElement.style.top) || 0;
console.log(carElement);

  switch (key) {
    case "ArrowUp":
    //   y -=  5
      break;

    case "ArrowDown":
      y += 5;
      break;

    case "ArrowLeft":
      x -= 10;
      break;

    case "ArrowRight":
      x += 10;
      break;

    case "Alt":
      jump();
      break;

    default:
      console.log("log");
      break;
  }
  console.log(x);
  console.log(y);
  carElement.style.left = x + "px";
  carElement.style.top = y + "px";

  //   boundOf()
}

function moveRoadLines() {
    let roadLines = document.querySelectorAll('.roadLines');
    roadLines.forEach((item)=> {
        if(item.y >= 700){
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

setInterval(moveRoadLines , 100)


function onCollision(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top >  bRect.bottom) || (aRect.bottom <  bRect.top) ||
        (aRect.right <  bRect.left) || (aRect.left >  bRect.right)); 
}


function moveEnemyCars(){
    let enemyCars = document.querySelectorAll('.enemyCar');
    enemyCars.forEach((item)=> {

        if(onCollision(carElement, item)){
            alert('you is gameOver')
            window.open("index.html", "_blank");
        }
        if(item.y >= 750){
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
} 

setInterval(moveEnemyCars , 100)