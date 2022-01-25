let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let isGameOver = false;

let wCanvas = canvas.width;
let hCanvas = canvas.height;

let xRect = 100;
let yRect = hCanvas - 30;
let wRect = 100;
let hRect = 20;

let xCircle = 100;
let yCircle = 100;
let rCircle = 20;

let wBrick = 50;
let score = 0;
let deception = 'down';
function start() {
    setUpBrick();
    isGameOver = false;
    document.getElementById('result').innerHTML = `Điểm: 0`
    deception = 'down';
    score = 0;
    xCircle = 100;
    yCircle = 100;
    if(!isGameOver) {
        setInterval(moveCircle, 50);
    }
}

function drawRect(x, y, w, h, color) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI *2);
    ctx.fillStyle = 'pink';
    ctx.fill();
}

let arrBrick = [];
function setUpBrick() {
    for(let i = 0; i < 7; i++) {
        arrBrick.push([60*i, 10, true]);
    }
}

console.log(arrBrick);
function drawBrick() {
    for(let i = 0; i < arrBrick.length  ; i++) {
        if(arrBrick[i][2]) {
            drawRect(arrBrick[i][0], arrBrick[i][1], wBrick, 20, 'blue');
        }
    }
}


drawCircle(xCircle, yCircle, rCircle);
let random;
function moveCircle() {
    ctx.clearRect(0, 0, wCanvas, hCanvas);
    drawRect(xRect, yRect, wRect, hRect, 'red');
    drawBrick();
    
    // Chạm trên dưới
    if(yCircle + rCircle == yRect && xCircle + rCircle >= xRect && xCircle - rCircle <= xRect + wRect) {
        random = Math.floor(Math.random() * 15 + 1);
        deception = 'up';
    } else if(yCircle == rCircle) {
        deception = 'down'
    } else {
        isGameOver = true;
    }
    
    // Chạm trái phải: 
    if(xCircle + rCircle >= wCanvas) {
        random = Math.floor(Math.random() * 15 + 1);
        deception = 'left';
    } else if(xCircle <= rCircle) {
        random = Math.floor(Math.random() * 15 + 1);
        deception = 'right';
    }
    // Chạm gạch:
    for(let i in arrBrick) {
        if(xCircle + rCircle > arrBrick[i][0] && xCircle - rCircle <= arrBrick[i][0] + wBrick) {
            if(yCircle - rCircle <= arrBrick[i][1] + 20) {
                if(arrBrick[i][2]) {
                    deception = 'down'
                    arrBrick[i][2] = false;
                    score += 10;
                    document.getElementById('result').innerHTML = `Điểm: ${score}`;
                } 
            }
        }
        
    }
    
    
    switch(deception) {
        case 'down': {
            yCircle += 5;
            break;
        } 
        case 'up': {
            yCircle -= 5;
            xCircle += random;
            break;
        }
        case 'left': {
            xCircle -= random;
            yCircle -= 5;
            break;
        }
        case 'right': {
            xCircle += random;
            yCircle -= 5;
            break;
        }
    }
    if(checkWin()) {
        document.getElementById('result').innerHTML = 'Chúc mừng bạn đã chiến thắng';
        return;
    }
    drawCircle(xCircle, yCircle, rCircle);
}

function checkWin() {
    return arrBrick.every(function (brick) {
        // console.log(brick);
        return brick[2] == false;
    })
}


window.addEventListener('keydown', function(e) {
    if(e.keyCode == 37) {
        if(xRect > 0) {
            xRect -= 5;
        }
    } else if(e.keyCode == 39) {
        if(xRect + wRect < wCanvas) {
            xRect += 5;
        }
    }
})



