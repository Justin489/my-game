var score = 0

// var laserCount = 3

var gameState = "play"

function preload() {
    laserImg = loadImage("Assets/laser.png")
    bgImg = loadImage("Assets/galaxy.jpg")
    rocketImg = loadImage("Assets/rocket.png")
    meteorImg = loadImage("Assets/meteor.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    bg = createSprite(width / 2, height / 2, width, height)
    bg.addImage(bgImg)

    rocket = createSprite(140, height / 2)
    rocket.addImage(rocketImg)
    rocket.scale = 0.5

    meteorsGroup = new Group()

    laserGroup = new Group()

    wall = createSprite(rocket.x + 150, height/2, 5, height)
    wall.shapeColor = "yellow"

    
}

function draw() {

    background("black")

    drawSprites()

    if (gameState == "play") {

        if (keyDown("up")) {
            rocket.y -= 15
        }

        if (keyDown("down")) {
            rocket.y += 15
        }

        if (keyWentDown("space")) {
            shootLaser()
            // laserCount -= 1
        }

        if (meteorsGroup.isTouching(laserGroup)) {
            for (var i = 0; i < meteorsGroup.length; i++) {

                if (meteorsGroup[i].isTouching(laserGroup)) {
                    meteorsGroup[i].destroy()
                    laserGroup.destroyEach()
                    score += 1

                }

            }
        }

        spawnMeteor()

         if (meteorsGroup.isTouching(wall)) {
             gameState = "end"
         }
    }


    if (gameState == "end") {
        meteorsGroup.destroyEach()
        laserGroup.destroyEach()
        rocket.destroy()

        fill("red")
        textSize(35)
        text("GAME OVER!!", width / 2, height / 2)

    }

    fill("white")
    textSize(25)
    text("Score :" + score, width-100 , 50)

}


function spawnMeteor() {
    if (frameCount % 60 == 0) {
        meteor = createSprite(width, Math.round(random(100, height - 100)))
        meteor.velocityX = -5
        meteor.addImage(meteorImg)
        meteor.scale = 0.5

        meteorsGroup.add(meteor)
    }
}


// write the code such that everytime you presses the space bar the lazer beam shoul be shot from the spacecraft and 
// create the groups for laser and meteors and the members into the group

function shootLaser() {
    laser = createSprite(rocket.x + 150, rocket.y)
    laser.addImage(laserImg)
    laser.velocityX = 10
    laser.scale = 0.3
    laserGroup.add(laser)
}












