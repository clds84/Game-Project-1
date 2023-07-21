let canvas = document.getElementById('game')
const ctx = canvas.getContext('2d');

let timerBox = document.querySelector('#timer')
let instructionBox = document.querySelector('instructions')
let button = document.getElementById('button')
let typewriter = document.createElement('div')
typewriter.id = "typewriter"
let typewriterContainer = document.querySelector('#typewriter-container')

typewriterContainer.appendChild(typewriter)

const prettyGoodAudio = new Audio('pretty-good.m4a');
const xmasTimeAudio = new Audio('xmas-time.m4a')
const moodyManAudio = new Audio('moody-man.m4a')

//This class will be for creating my player. 
function Player(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.direction = {
        up: false,
        down: false,
        right: false,
        left:false
}

//This function inside the player class will be part of the code for moving the player
//and changing this.direction to true in the event the keys are pressed
    this.setDirection = function (key) {
        console.log('key pressed is', key)
        if (key.toLowerCase() === 'w') this.direction.up = true
        if (key.toLowerCase() === 'a') this.direction.left = true
        if (key.toLowerCase() === 's') this.direction.down = true
        if (key.toLowerCase() === 'd') this.direction.right = true
    }
//this section will return the direction back to false when the key is depressed.
//until this happens, player will be in continuous motion
    this.unsetDirection = function (key) {
        console.log('key pressed is', key)
        if (key.toLowerCase() === 'w') this.direction.up = false
        if (key.toLowerCase() === 'a') this.direction.left = false
        if (key.toLowerCase() === 's') this.direction.down = false
        if (key.toLowerCase() === 'd') this.direction.right = false
    }
    //this is the set direction method so if the key is pressed, the movement 
    //occurs until you depress the key
    this.movePlayer = function (){
        if (this.direction.up){
            this.y -= 5
        //up movement conditional to limit top of canvas since we're establishing up direction
            if(this.y <= 0){
                this.y = 0
            }
        }
        if (this.direction.left){
            this.x -= 5
        //conditional for left side of canvas
            if(this.x <= 0){
                this.x = 0
            }
        }
        if (this.direction.down){
            this.y += 5
            if(this.y + this.height >= canvas.height){
                this.y = canvas.height - this.height
            }
        }   
        if (this.direction.right){
            this.x += 5
            if(this.x + this.width >= canvas.width){
                  this.x = canvas.width - this.width
            }
        }
    }
    //This will render the player and give it style
    this.render = function (){
        ctx.fillStyle = 'rgba(0, 57, 204, 1)'
        ctx.fillRect(this.x,this.y,this.width,this.height,this.speed)
        ctx.strokeStyle = "cream"
        ctx.strokeRect(this.x,this.y,this.width,this.height,this.speed)
        ctx.shadowColor = "#d53"; 
        ctx.shadowBlur = 20;
        ctx.lineJoin = "bevel"
        ctx.lineWidth = 10     
    }    
}
//adding key events for keyup and keydown. These are linked to set and unset functions
document.addEventListener('keydown', (e) => {
    //when key is pressed, direction is changed according to setDirection function
    player.setDirection(e.key)
})
document.addEventListener('keyup', (e) => {
    //if any key is released (WASD), direction changes to false
    if (['w','a','s','d'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

let player = new Player(50,50,40,40)
//This will be the class for creating teleport squares
function Teleport(x,y,width,height,){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.render = function(){
       ctx.fillStyle = 'black'
       ctx.fillRect(this.x,this.y,this.width,this.height)
       ctx.strokeStyle = "white"
       ctx.strokeRect(this.x,this.y,this.width,this.height)
       ctx.shadowColor = "#d53"; 
       ctx.shadowBlur = 20;
       ctx.lineJoin = "bevel";
       ctx.lineWidth = 10
    }
}

let teleportBottom = new Teleport(500,660,30,30)
let teleportTop = new Teleport(500,10,30,30)
let teleportLeft = new Teleport(10,350,30,30)
let teleportRight = new Teleport(960,350,30,30)

//This will be the class for creating the walls. The walls will have a speed
//property to move them throughout the canvas
function Wall(x,y,width,height,speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = speed
    this.alive = true
    this.render = function (){
        ctx.fillStyle = 'rgba(255, 157, 77, .5)'
        ctx.fillRect(this.x,this.y,this.width,this.height,this.speed)
        ctx.strokeStyle = "white"
        ctx.strokeRect(this.x,this.y,this.width,this.height,this.speed)
        ctx.shadowColor = "#d53"; 
        ctx.shadowBlur = 20;
        ctx.lineJoin = "bevel";
        ctx.lineWidth = 10
    }
    //This section will move the walls along the x-axis in a continuous bouncing 
    //fashion, dependent on its position
    this.update = function () {
        //If the wall is at x=0 or at x=canvas.width, the speed property will negate
        //and affect the x-coordinate. there
        // is a change in direction as well as a change in speed  
        this.render()  
        this.x -= this.speed   
        if (this.x < 0 || this.x + this.width > canvas.width){
           this.speed = -this.speed
        }
        if (counter <= 45){
        this.x = this.x - (this.speed * 1.2)
        }  
        if (counter <= 7){
        this.x = this.x - (this.speed * 1.4)
        }
   }
    
} 

let wallOneTop = new Wall(949,0,50,425,1.9)
let wallOneBottom = new Wall(949,500,50,200,1.9)
let wallTwoTop = new Wall(949,0,50,150,1.4)
let wallTwoBottom = new Wall(949,250,50,500,1.4)
let wallThreeTop = new Wall(899,0,100,200,1)
let wallThreeMiddle = new Wall(899,275,100,500,1)
let wallThreeBottom = new Wall(899,850,100,480,1)

//This will be the hit ditection function. I started with a long code but made it
//drier by utilizing a for loop. Player.alive will be false in the event collision
//is detected.
const arrayForHit = [wallOneTop, wallOneBottom, wallTwoTop, wallTwoBottom, wallThreeTop, wallThreeMiddle, wallThreeBottom]
const detectHit = () => {  
    for (let i = 0; i < arrayForHit.length;i++){
        if(player.x < arrayForHit[i].x + arrayForHit[i].width
        && player.x + player.width > arrayForHit[i].x
        && player.y < arrayForHit[i].y + arrayForHit[i].height
        && player.y + player.height > arrayForHit[i].y){
            player.alive = false
        }
    }   
}
//Same as above but for teleporting. The difference is after player.alive = false,
//the player then "teleports", but in reality the player class is utilized to 
//render a new player at a different location after killing off its old self
const detectTeleportation = () => {
    if(player.x < teleportBottom.x + teleportBottom.width
        && player.x + player.width > teleportBottom.x
        && player.y < teleportBottom.y + teleportBottom.height
        && player.y + player.height > teleportBottom.y){
            player.alive = false
            player = new Player(910,350,40,40)
            console.log(player.alive)
    } 
    else if(player.x < teleportTop.x + teleportTop.width
        && player.x + player.width > teleportTop.x
        && player.y < teleportTop.y + teleportTop.height
        && player.y + player.height > teleportTop.y){
            player.alive = false
            player = new Player(50,350,40,40)
            console.log(player.alive)
    } 
    else if(player.x < teleportLeft.x + teleportLeft.width
        && player.x + player.width > teleportLeft.x
        && player.y < teleportLeft.y + teleportLeft.height
        && player.y + player.height > teleportLeft.y){
            player.alive = false
            player = new Player(500,50,40,40)
            console.log(player.alive)
    } 
    else if(player.x < teleportRight.x + teleportRight.width
        && player.x + player.width > teleportRight.x
        && player.y < teleportRight.y + teleportRight.height
        && player.y + player.height > teleportRight.y){
            player.alive = false
            player = new Player(500,610,40,40)
            console.log(player.alive)
    }
}
//This will be the section that animates the game with conditions inside to affect
//the outcomes of the game. As I understand it, using requestAnimationFrame and
//passing the function it's in as its argument causes a continuous loop
function animate() {
    //This is defined so the animation can later be canceled
    const animation = requestAnimationFrame(animate)
   //this is to play music by default when the game starts
    moodyManAudio.play() 
   //the canvas must be cleared as part of the animation or else each frame shows
   //a 'history' of the movement
    ctx.clearRect(0,0,canvas.width,canvas.height)
    //In the event the player is not alive, stop the animation, pause one song and 
    //start another, and change visibility of 'typewriter' so a new message to the 
    //user becomes visible
    if (!player.alive){
        window.cancelAnimationFrame(animation)
        moodyManAudio.pause()
        xmasTimeAudio.play()
        //removing child and then appending fixes a bug with the typing animation. If I don't do this, then the typing starts halfway through
        //"you died" in the innerText below.
        typewriterContainer.removeChild(typewriter)
        typewriterContainer.appendChild(typewriter)
        typewriter.style.visibility = "visible"
        typewriter.innerText = `You died. Play again?`
        setTimeout(() => {
            button.style.visibility = "visible"
        }, 2100);
        button.addEventListener('click', () => {
            window.location.reload()
        })
    }
    //Similar to above, except run this code when player is alive, and counter = -1
    //If I try counter = 0, prettyGoodAudio starts at 1 second, so I did -1
    else if (player.alive && counter === -1){
        window.cancelAnimationFrame(animation)
        moodyManAudio.pause()
        prettyGoodAudio.play()
        typewriterContainer.removeChild(typewriter)
        typewriterContainer.appendChild(typewriter)
        typewriter.style.visibility = "visible"
        typewriter.innerText = `Woah woah woah. Sick! Play again?`
        setTimeout(() => {
            button.style.visibility = "visible"
        }, 2100);
        button.addEventListener('click', () => {
        window.location.reload()
        })
    }
    
    teleportBottom.render()
    teleportTop.render()
    teleportLeft.render()
    teleportRight.render()
    wallOneTop.update()
    wallOneBottom.update() 
    wallTwoTop.update()
    wallTwoBottom.update()
    wallThreeTop.update()
    wallThreeMiddle.update()
    wallThreeBottom.update()
    player.render()
    player.movePlayer()
    detectHit()
    detectTeleportation()
    //If the player.alive = true, render the player and run hit detection as well as 
    //teleport detection
    // if (player.alive === true){
    //     player.render()
    //     detectHit()
    //     detectTeleportation()
    // } 
    // //Run the movePlayer function inside animate as well
    // player.movePlayer()
}
//This section is for running the game
const playLevel1 = (e) => {
    //If the G key is pressed, 'press G to start' will disappear, animate function runs,
    //and the keydown to run the game is disabled
    if (e.keyCode === 71){  
        document.removeEventListener('keydown', playLevel1)
        typewriter.style.visibility = "hidden"
        animate()
        const Timer = setInterval(GameTimer, 1000)
    }
}
let counter = 59

const GameTimer = () => {
    timerBox.innerText = "Time Left: " + counter  
    //This will clear the timer based on the condition of time and player.alive
    //status
    if (!player.alive || player.alive && counter === 0){
        clearInterval(Timer)
    }
    counter--
}
//The gameTimer function will control the counter for the game 
//This event listener will run the playLevel1 function when the playAgain button is clicked
//As a try again or to just play again
document.addEventListener('keydown', playLevel1)

//This is to run the prompt for the user to press G to start when the browser loads
document.addEventListener('DOMContentLoaded', () => {
    typewriter.innerText = `Press G to start`
    button.style.visibility = "hidden"
    
})

//9 16 66