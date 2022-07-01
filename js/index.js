//Game Constants and Variables

let snakeVelocity = {x:0, y:0}
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 10
let score = 0
let lastPaintTime = 0
let snakeArr = [{x:13, y:15}]
food = {x:6, y:7}


//Game Functions

function main(ctime) {
    window.requestAnimationFrame(main); //uses for achieving high fps in game
    // console.log(ctime)
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime
    gameEngine();

}

function isCollide(snake) {
    //collide into yourself

    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }


        //collide with the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    
}

function gameEngine() {
    //Updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play()
        musicSound.pause()
        snakeVelocity = {x:0, y:0}
        alert("Game Over. Press any key to play again")
        snakeArr = [{x:13, y:15}]
        musicSound.play()
        score = 0
    }

    //After eating the food increment the food and regenarate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play()
        score +=1
        if(score>hiscoreval) {
            hiscoreval = score
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval
        }
        scoreBox.innerHTML = "Score: " + score
        snakeArr.unshift({x: snakeArr[0].x + snakeVelocity.x, y: snakeArr[0].y + snakeVelocity.y})
        let a = 2
        let b = 16
        food = {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
     
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += snakeVelocity.x
    snakeArr[0].y += snakeVelocity.y


    //Render the snake 
        board.innerHTML = "";
        snakeArr.forEach((e, index)=> {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        
        if(index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

     //Render the food
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y
        foodElement.style.gridColumnStart = food.x
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}






//Main Logic
musicSound.play()
let hiscore = localStorage.getItem("hiscore")
if(hiscore === null) {
    hiscoreval = 0
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = "HiScore: " + hiscore
}

window.requestAnimationFrame(main)

window.addEventListener('keydown',e=>{
    snakeVelocity = {x:0, y:1} //Game will be start
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
    
        default:
            break;
    }
})