let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
 
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

function Grenade(x,y,width,height,dx){
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
       if (this.x < 0 ||this.x + this.width > innerWidth){
           this.dx = -this.dx
       }
       this.x -= this.dx   
           this.render()  
    }
}
let grenade = new Grenade(player.x,player.y,5,5,10)

function Teleport(x,y,width,height,){
    this. x = x
    this.y = y
    this.width = width
    this.height = height
    this.render = function(){
        ctx.fillstyle = 'rgba(145, 30, 40, 0.599)'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
let teleportBottom = new Teleport(550,900,30,30)
let teleportTop = new Teleport(550,10,30,30)
let teleportLeft = new Teleport(10,450,30,30)
let teleportRight = new Teleport(1120,450,30,30)

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
       if (this.x < 0 ||this.x + this.width > innerWidth){
           this.dx = -this.dx
       }
       this.x -= this.dx   
           this.render()  
    }
}
let wallOneTop = new Wall(1020,0,50,425,5)
let wallOneBottom = new Wall(1020,500,50,innerHeight,5)
let wallTwoTop = new Wall(1020,0,50,150,2)
let wallTwoBottom = new Wall(1020,250,50,innerHeight,2)
let wallThreeTop = new Wall(1020,0,110,200,2)
let wallThreeMiddle = new Wall(1020,275,110,500,2)
let wallThreeBottom = new Wall(1020,850,110,innerHeight,2)
let destroyWall = new Wall(1020,0,50,1000,2)


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
//const teleArray = [teleportBottom,teleportTop,teleportLeft,teleportRight]
const detectTeleportation = () => {
    if(player.x < teleportBottom.x + teleportBottom.width
        && player.x + player.width > teleportBottom.x
        && player.y < teleportBottom.y + teleportBottom.height
        && player.y + player.height > teleportBottom.y){
            
            player.alive = false
            player = new Player(1050,400,40,40)
            console.log(player.alive)
        }
   
   
    else if(player.x < teleportTop.x + teleportTop.width
        && player.x + player.width > teleportTop.x
        && player.y < teleportTop.y + teleportTop.height
        && player.y + player.height > teleportTop.y){
            
            player.alive = false
            player = new Player(50,450,40,40)
            console.log(player.alive)
        }
    
    else if(player.x < teleportLeft.x + teleportLeft.width
        && player.x + player.width > teleportLeft.x
        && player.y < teleportLeft.y + teleportLeft.height
        && player.y + player.height > teleportLeft.y){
            
            player.alive = false
            player = new Player(550,50,40,40)
            console.log(player.alive)
        }
    else if(player.x < teleportRight.x + teleportRight.width
        && player.x + player.width > teleportRight.x
        && player.y < teleportRight.y + teleportRight.height
        && player.y + player.height > teleportRight.y){
            
            player.alive = false
            player = new Player(1170,450,40,40)
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

let counter = 59

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,innerWidth,innerHeight)
    
  if (player.alive === true){
        player.render()
        detectHit()
        detectTeleportation()
        console.log(player.alive)
}
  teleportBottom.render()
  teleportTop.render()
  teleportLeft.render()
  teleportRight.render()
  
  wallOneTop.update()
  wallOneBottom.update()

  if (counter <= 53){
        wallTwoTop.update()
        wallTwoBottom.update()
  }
  if (counter <= 43.5){
        wallThreeTop.update()
        wallThreeMiddle.update()
        wallThreeBottom.update()
  }
  if (counter <= 25){
      destroyWall.update()
  }
}
animate()

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
const playerGrenade = (e) => {
        switch (e.keyCode) {
            case (32):
                grenade.update()
               grenade.x += 40
              break

        }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', playerMovement)
    document.addEventListener('keydown', playerGrenade)
    setInterval(() => {
        //timer.innerText = counter
    if (wallOneTop.alive === true) {
        
        console.log(counter)
    }
        counter --  
    }, 1000);


})