let canvas = document.querySelector('#game')
let timerBox = document.querySelector('#timer')
let instructionBox = document.querySelector('instructions')
let typewriter = document.querySelector('#typewriter')
let nextLevelButton = document.querySelector('#button')
//canvas.setAttribute('width', getComputedStyle(canvas)['width'])
//canvas.setAttribute('height', getComputedStyle(canvas)['height'])
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
 console.log(ctx)
 console.log(canvas.width)

function Player(x,y,width,height){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.render = function (){
       ctx.fillStyle = 'rgba(30, 145, 118, 0.599)'
       ctx.fillRect(this.x,this.y,this.width,this.height,this.dx)
    }
   //this.update = function () {
     //  }
}
let player = new Player(50,50,40,40)

function Teleport(x,y,width,height,){
    this. x = x
    this.y = y
    this.width = width
    this.height = height
    this.alive = true
    this.render = function(){
        ctx.fillstyle = 'rgba(145, 30, 40, 0.599)'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let teleportBottom = new Teleport(500,660,30,30)
let teleportTop = new Teleport(500,10,30,30)
let teleportLeft = new Teleport(10,350,30,30)
let teleportRight = new Teleport(960,350,30,30)

function Wall(x,y,width,height,dx) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.dx = dx
    this.alive = true
    this.render = function (){
       ctx.fillStyle = 'rgba(30, 145, 118, 0.599)'
       ctx.fillRect(this.x,this.y,this.width,this.height,this.dx)
    }
   this.update = function () {
    //    console.log(this.x < 0)
    //    console.log(this.x + this.width)
    //    console.log(canvas.width)
       if (this.x < 0 || this.x + this.width > canvas.width){
           this.dx = -this.dx
       }
       this.x -= this.dx   
           this.render()  
   }
    
}   

// this.draw(ctx) {
//    ctx.strokeStyle = 'orange';
//    ctx.fillStyle = 'black'
//    ctx.strokeRect(this.x,this.y,this.width,this.height)
//    ctx.fillRect(this.x,this.y,this.width,this.height)
//   } 
//console.log(innerWidth, canvas.width)

let wallOneTop = new Wall(949,0,50,425,5)
let wallOneBottom = new Wall(949,500,50,200,5)
let wallTwoTop = new Wall(949,0,50,150,2)
let wallTwoBottom = new Wall(949,250,50,500,2)
let wallThreeTop = new Wall(899,0,100,200,3)
let wallThreeMiddle = new Wall(899,275,100,500,3)
let wallThreeBottom = new Wall(899,850,100,480,3)

const arrayForHit = [wallOneTop, wallOneBottom, wallTwoTop, wallTwoBottom, wallThreeTop, wallThreeMiddle, wallThreeBottom]

const detectHit = () => {    
    for (let i = 0; i < arrayForHit.length;i++){
        if(player.x < arrayForHit[i].x + arrayForHit[i].width
        && player.x + player.width > arrayForHit[i].x
        && player.y < arrayForHit[i].y + arrayForHit[i].height
        && player.y + player.height > arrayForHit[i].y){
           // if(counter <= 53 && wallTwoTop.alive && wallTwoBottom.alive
            //  && wallThreeTop.alive && wallThreeMiddle.alive && wallThreeBottom.alive){
             //   player.alive = false
           // }
            //if(counter <= 43 && wallThreeTop.alive && wallThreeMiddle.alive && wallThreeBottom.alive){
             //   player.alive = false
           // }
             // if(counter )
            //player.alive = false
           // console.log('hit detected', arrayForHit[i])
            player.alive = false
        }
    }   
}
//const teleArray = [teleportBottom,teleportTop,teleportLeft,teleportRight]
const detectTeleportation = () => {
    if(player.x < teleportBottom.x + teleportBottom.width
        && player.x + player.width > teleportBottom.x
        && player.y < teleportBottom.y + teleportBottom.height
        && player.y + player.height > teleportBottom.y){
            
            player.alive = false
            player = new Player(910,350,40,40)
            console.log(player.alive)
        
        } else if(player.x < teleportTop.x + teleportTop.width
        && player.x + player.width > teleportTop.x
        && player.y < teleportTop.y + teleportTop.height
        && player.y + player.height > teleportTop.y){
            
            player.alive = false
            player = new Player(50,350,40,40)
            console.log(player.alive)
        
        } else if(player.x < teleportLeft.x + teleportLeft.width
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

       // for (let i = 0; i < teleArray.length; i++){
       //     if (player.x < teleArray[i].x + teleArray[i].width
       //         && player.x + player.width > teleArray[i].x
       //         && player.y < teleArray[i].y + teleArray[i].height
       //         && player.y + player.height > teleArray[i].y){
       //             if (teleArray[0]){
       //                 player.alive = false
       //     player = new Player(1050,400,40,40)
       //     console.log(player.alive)
       //             }
       //             else if (teleArray[1]){
       //                 player.alive = false
       //                 player = new Player(50,450,40,40)
       //                 console.log(player.alive)
       //             }
       //             else if (teleArray[2]){
       //                 player.alive = false
       //                 player = new Player(550,50,40,40)
       //                 console.log(player.alive)
       //             }
       //             else {
       //                 player.alive = false
       //                 player = new Player(1170,450,40,40)
       //                 console.log(player.alive)
       //             }
       //             
       //         }
       // }

}

function animate() {
   animation = requestAnimationFrame(animate)
   moodyManAudio.play() 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    
  if (player.alive === true){
        player.render()
        detectHit()
        detectTeleportation()
        //console.log(player.alive)
}
        
 //   if (counter <= 53){
 //      wallTwoTop.update()
 //      wallTwoBottom.update()
 //}  
 // 
 //   if (counter <= 43){
 //      wallThreeTop.update()
 //      wallThreeMiddle.update()
 //      wallThreeBottom.update()
 //} 
   
    
 


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

    //console.log(wallOneTop.x,wallOneTop.y)
    
}

function animate2() {
   animation2 = requestAnimationFrame(animate2)
    
ctx.clearRect(0,0,canvas.width,canvas.height)

//wallOneTop.dx = 3
//wallOneBottom.dx = 3 
//wallTwoTop.dx = 2
//wallTwoBottom.dx = 2 
//wallThreeTop.dx = 1
//wallThreeMiddle.dx = 1
//wallThreeBottom.dx = 1
let wallOneTop = new Wall(949,0,50,425,5)
let wallOneBottom = new Wall(949,500,50,200,5)
let wallTwoTop = new Wall(949,0,50,150,2)
let wallTwoBottom = new Wall(949,250,50,500,2)
let wallThreeTop = new Wall(899,0,100,200,3)
let wallThreeMiddle = new Wall(899,275,100,500,3)
let wallThreeBottom = new Wall(899,850,100,480,3)
    
        //player.alive === true
        player.render()
        detectHit()
        detectTeleportation()
        //console.log(player.alive)

        
 //   if (counter <= 53){
 //      wallTwoTop.update()
 //      wallTwoBottom.update()
 //}  
 // 
 //   if (counter <= 43){
 //      wallThreeTop.update()
 //      wallThreeMiddle.update()
 //      wallThreeBottom.update()
 //} 
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

    //console.log(wallOneTop.x,wallOneTop.y)

}

document.addEventListener('keydown', (e) => {
if (e.keyCode === 71){  
typewriter.style.visibility = "hidden"
GameTimer()
animate()
//moodyManAudio.play()
}
})
nextLevelButton.addEventListener('click', () => {
    animate2()
    GameTimer()
    })

const prettyGoodAudio = new Audio('pretty-good.m4a');
const xmasTimeAudio = new Audio('xmas-time.m4a')
const moodyManAudio = new Audio('moody-man.m4a')
let counter = 59
const GameTimer = () => {
    setInterval(() => {    
    if (player.alive && counter > 0) {
        
        
    }  
    if (player.alive && counter === 0){
        window.cancelAnimationFrame(animation)
        moodyManAudio.pause()
         moodyManAudio.currentTime = 0
        prettyGoodAudio.play()    
        counter = 0
        console.log(counter)
        typewriter.style.visibility = "visible"

        typewriter.innerText = `What the hell. That wasn't supposed to happen.`
    }
    else if (!player.alive && counter > 0){
        window.cancelAnimationFrame(animation)
        //window.cancelAnimationFrame(animation2)
        moodyManAudio.pause()
        moodyManAudio.currentTime = 0
       // xmasTimeAudio.play()
        counter = counter
        typewriter.style.visibility = "visible"
        typewriter.innerText = `You died. Press start to try again.`
        
       // typewriter.style.overflow = "hidden"
       // typewriter.style.borderRight = ".15em solid orange"
       // typewriter.style.whiteSpace = "nowrap"
       // typewriter.style.fontSize = "1.2rem"
       // typewriter.style.width = 0
       // typewriter.style.animation = 
       //     "typing 2s steps(40, end) forwards"
       //     "blink .8s infinite;"
    }
    timerBox.innerText = counter
      
         
    }, 1000);
    

}


const playerMovement = (e) => {
    // we can use if...else and keycodes to determine player movement
    // keycodes refer to specific keyboard keys with a number
    // if we want to use WASD the key codes are as follows:
    // w=87, a=65, s=83, d=68
    // up=38, down=40, left=37, right=39
    // we can also use a switch case which can be handy when we have multiple possibilities
    // switch case has a main switch, cases(which are our inputs in this instance)
    // we also need to break out of our cases, using the keyword break
    switch (e.keyCode) {
        case (87):
            // we'll move the player up
            player.y -= 40
            // then break the case
            break
        case (65):
            // move the player left
            player.x -= 40
            break
        case (83):
            // move player down
            player.y += 40
            break
        case (68):
            // move the player right
            player.x += 40
            break
        case (38):
            // we'll move the player up
            player.y -= 40
            // then break the case
            break
        case (37):
            // move the player left
            player.x -= 40
            break
        case (40):
            // move player down
            player.y += 40
            break
        case (39):
            // move the player right
            player.x += 40
            break
    }
}
//const playerGrenade = (e) => {
//        switch (e.keyCode) {
//            case (32):
//                grenade.update()
//              //  grenade.x += 10
//
//        }
//}
document.addEventListener('keydown', playerMovement)




document.addEventListener('DOMContentLoaded', () => {
typewriter.innerText = `Press G to start`


 



})



