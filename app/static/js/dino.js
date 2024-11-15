
//資料////////////////////////////////////////////////////////
let dino = {
    x: 50,
    y: 150,
    width: 25,
    height: 50,
    status: true,
    score: 0,
    jumpHeight: 100,
    jumpSpeed: 0.4, //跳躍速度
    gravity: 0.00005, // 重力加速度
}

let obstacle = {
    x: 0,
    y: 0,
    speed: 0,
    width: 0,
    height: 0,
    el: false,
}

//畫面上的箱子
let nowObstacles = []

//顯示////////////////////////////////////////////////////////

let eldino = document.getElementById('dino')
let elscore = document.getElementById('score')
let elements = document.getElementsByClassName('obs')
let elstart = document.getElementById('start')
let elrestart = document.getElementById('restart')
let elover = document.getElementById('over')

//顯示恐龍
function drawDino() {
    eldino.style.left = `${dino.x}px`
    eldino.style.top = `${dino.y}px`
}

//顯示障礙物
function drawObstacle() {
    for (let i = 0; i < nowObstacles.length; i++) {
        let obstacle = nowObstacles[i]
        obstacle.el.style.left = `${obstacle.x}px`
        obstacle.el.style.top = `${obstacle.y}px`
        obstacle.el.style.width = `${obstacle.width}px`
        obstacle.el.style.height = `${obstacle.height}px`
    }
}

//顯示分數
function drawScore() {
    elscore.textContent = `score:${dino.score}`
}

//移除障礙物div
function removeDivs() {
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0])
    }
}

//控制////////////////////////////////////////////////////////

//增加得分
function addscore() {
    dino.score++
}
// 恐龍跳躍
function setJump() {
    let jumpStartY = dino.y
    let jumpStartTime

    function jumpStep(timestamp) {
        if (!jumpStartTime) jumpStartTime = timestamp

        const elapsedTime = timestamp - jumpStartTime
        const jumpDistance = Math.min(dino.jumpSpeed * elapsedTime, dino.jumpHeight)

        dino.y = jumpStartY - jumpDistance
        drawDino()

        if (jumpDistance < dino.jumpHeight) {
            requestAnimationFrame(jumpStep)
        } else {
            // 開始下降
            jumpStartTime = null
            jumpDown()
        }
    }
    requestAnimationFrame(jumpStep)
}

function jumpDown() {
    let jumpStartY = dino.y
    let jumpStartTime
    let fallSpeed = 0.2 // 初始下落速度为0

    function jumpStep(timestamp) {
        if (!jumpStartTime) jumpStartTime = timestamp

        const elapsedTime = timestamp - jumpStartTime
        fallSpeed += dino.gravity * elapsedTime // 根据重力加速度增加下落速度
        const jumpDistance = Math.min(fallSpeed * elapsedTime, dino.jumpHeight)

        dino.y = jumpStartY + jumpDistance
        drawDino()

        if (jumpDistance < dino.jumpHeight) {
            requestAnimationFrame(jumpStep)
        } else {
            // 跳跃结束
        }
    }
    requestAnimationFrame(jumpStep)
}
function jump(event) {
    // 檢查空白鍵、滑鼠左鍵或觸摸事件
    if (event.type === 'keydown' && event.code === 'Space' ||
        event.type === 'touchstart') {

        if (dino.status === false) {
            return;
        }

        if (dino.y === 150) {
            setJump();
        }
    }
}


//障礙物長寬
function setObstacle() {
    addObstacle()
    obstacle.width = 25 + Math.random() * 30
    obstacle.height = 35 + Math.random() * 30
    obstacle.x = 800 - obstacle.width
    obstacle.y = 200 - obstacle.height
}

//新生成的障礙物放進陣列
function addObstacle() {
    let elObstacle = document.createElement('div')
    let elBackground = document.getElementById('background')
    elObstacle.classList.add('obs')
    elBackground.appendChild(elObstacle)
    nowObstacles.push({
        x: obstacle.x,
        y: obstacle.y,
        width: obstacle.width,
        height: obstacle.height,
        el: elObstacle,
        speed: obstacle.speed,
    })
}

//改變障礙物x位置 用以移動
function moveObstacle() {
    for (let i = 0; i < nowObstacles.length; i++) {
        nowObstacles[i].x += obstacle.speed - 0.6
    }
}

let speedUp
//加速障礙物
function boostSpeed() {
    speedUp = setTimeout(() => {
        //對將要生成的障礙物增加基礎速度
        obstacle.speed -= 0.1
        for (let i = 0; i < nowObstacles.length; i++) {
            //讓畫面上的障礙物速度為增加過後的速度
            nowObstacles[i].speed = obstacle.speed
            console.log(nowObstacles)
        }
        boostSpeed()
    }, 10000)
}

// 移除超出畫面的障礙物
function removeObstacle() {
    for (let i = 0; i < nowObstacles.length; i++) {
        let obstacle = nowObstacles[i]
        if (obstacle.x <= 0) {
            obstacle.el.remove()
            nowObstacles.splice(i, 1)
            i--
        }
    }
}

// 檢查恐龍和障礙物之間的碰撞
function checkCollision() {
    for (let i = 0; i < nowObstacles.length; i++) {
        let obstacle = nowObstacles[i]
        if (
            dino.x + dino.width > obstacle.x &&
            dino.x < obstacle.x + obstacle.width &&
            dino.y + dino.height > obstacle.y &&
            dino.y < obstacle.y + obstacle.height
        ) {
            gameOver()
            console.log('撞到')
        }
    }
}

let obstacleInterval
let updateInterval
let scoreInterval

//隨機產生時間
function randomTime() {
    return 600 + Math.floor(Math.random() * 3) * 1000
}

//隨機間隔 生成障礙物
function createObstacle() {
    setObstacle()
    let interval = randomTime()
    obstacleInterval = setTimeout(() => {
        createObstacle()
    }, interval)
}

//移動 渲染 檢查 移除畫面外障礙物
function updateObstacle() {
    updateInterval = setInterval(() => {
        moveObstacle()
        drawObstacle()
        checkCollision()
        removeObstacle()
    }, 0.05)
}

//得分
function addScore() {
    scoreInterval = setInterval(() => {
        drawScore()
        addscore()
    }, 100)
}

//遊戲結束
function gameOver() {
    dino.status = false
    elover.style.display = 'block'
    elrestart.style.display = 'block'
    clearInterval(updateInterval)
    clearInterval(scoreInterval)
    clearTimeout(obstacleInterval)
    clearTimeout(speedUp)
}

// 重新初始化遊戲狀態
function restartGame() {
    // 重置恐龍位置和狀態
    elover.style.display = 'none'
    elrestart.style.display = 'none'
    dino.x = 50
    dino.y = 150
    dino.status = true

    obstacle.speed = -1
    // 清空障礙物陣列
    nowObstacles = []
    removeDivs()
    // 重置分數
    dino.score = 0
    drawScore()

    // 重新執行
    drawDino()
    createObstacle()
    updateObstacle()
    addScore()
    boostSpeed()
}
//執行////////////////////////////////////////////////////////

function start() {
    eldino.style.display = 'block'
    elstart.style.display = 'none'
    elrestart.style.display = 'none'
    restartGame()
}


// 監聽空白鍵和滑鼠左鍵來執行跳躍
document.addEventListener('keydown', function (event) {
    jump(event)
})
// 監聽手機觸摸事件來減少延遲
document.addEventListener('touchstart', function (event) {
    jump(event);
});