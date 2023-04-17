'use strict'

const choice = document.querySelector(".dogos-choice");
const canvas = document.querySelector("#dog");
const displayDog = document.querySelector(".dogos-choice .dogos");

let dogosContainer = document.querySelector('.dogos-container')

let dogos = []


for (let i = 1; i <= 8; i++) {
    let div = document.createElement("div");
    div.classList.add("dog");
    let numberP = document.createElement("p");
    numberP.textContent = i;
    div.appendChild(numberP);
    let newCanvasDog = document.createElement("canvas");
    newCanvasDog.width = 64;
    newCanvasDog.height = 48;
    let ctxDog = newCanvasDog.getContext("2d");
    let spriteDog = new Image();
    spriteDog.src = `./assets/sprite/${i}.png`;
    spriteDog.onload = function () {
        ctxDog.drawImage(spriteDog, 0, 0, 64, 48, 0, 0, 64, 48);
        div.appendChild(newCanvasDog);
        displayDog.appendChild(div);
    }   
}


const ctx = canvas.getContext("2d");
const sprite = new Image();
sprite.src = "./assets/sprite/1.png";


let position = {
    "x": 0,
    "y": 48,
};
let frame = 0;

let currentAnimation = "run";

const states = {
    "idle": 0,
    "run": 1,
    "walk": 2,
    "sit": 3,
    "lying": 4,
};

const avalaibleDogs = [
    "one", "two", "three", "four", "five", "six", "seven", "eight",
    "1", "2", "3", "4", "5", "6", "7", "8"
];

const letterToNumber = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8"
};   


if (annyang) {
    // Définir des commandes vocales et des fonctions correspondantes
    var commands = {
        "sit down": function () {
            currentAnimation = "sit";
            position.y = 3 * 48;
            position.x = 0;
            if(dogos.length > 0) {
                dogos[dogos.length - 1].animation = 'walk'
                dogos[dogos.length - 1].position = {x: 0, y: 1.5 * 48}
            }
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.sit').classList.add('active')
        },
        "what's your name": function () {
            alert('My name is DOGO !');
        },
        "bark": function () {
            let audio = new Audio('./assets/audio/aboiement.mp3');
            audio.play();
        },
        "walk": function () {
            currentAnimation = "walk";
            position.x = 0;
            if(dogos.length > 0) {
                dogos[dogos.length - 1].animation = 'walk'
                dogos[dogos.length - 1].position.x = 0
                dogos[dogos.length - 1].position.y = 48
            }
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.walk').classList.add('active')
        },
        "run": function () {
            currentAnimation = "run";
            position.x = 0;
            if(dogos.length > 0) {
                dogos[dogos.length - 1].animation = 'run'
                dogos[dogos.length - 1].position.x = 0
                dogos[dogos.length - 1].position.y = 48
            }
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.run').classList.add('active')
        },
        "lie down": function () {
            currentAnimation = "lying";
            position.x = 0;
            if(dogos.length > 0) {
                dogos[dogos.length - 1].animation = 'lying'
                dogos[dogos.length - 1].position.x = 0
                dogos[dogos.length - 1].position.y = 2.5 * 48
            }
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.lie').classList.add('active')
        },
        "stand up": function () {
            currentAnimation = "idle";
            position.x = 0;
            if(dogos.length > 0) {
                dogos[dogos.length - 1].animation = 'idle'
                dogos[dogos.length - 1].position.x = 0
            }
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.stand').classList.add('active')
        },
        "I want a new dog": function () {
            dogos[dogos.length - 1].animation = 'run'
            dogos[dogos.length - 1].position.y = 48
            choice.classList.remove("hide");
            document.querySelector('.dogos-commands').classList.add('hide')
            document.querySelector('.dogos-choice').classList.remove('hide')
            document.querySelectorAll('.dogos-container > .dogo').forEach(dogoToDestroy => {
                dogoToDestroy.classList.remove('alive')
                dogoToDestroy.classList.add('dead')
                dogoToDestroy.classList.add('out')
                setTimeout(() => {
                    dogoToDestroy.remove()
                    dogos.shift()
                }, 2000)
            })
        },

        "I want the dog number *tag": function (tag) {
            if(!avalaibleDogs.includes(tag)) return
            if(dogos.length === 0) {
                document.querySelector('.dogos-choice').classList.add('hide')
                document.querySelector('.dogos-commands').classList.remove('hide')
            }
            console.log(tag);
            document.querySelector('.active').classList.remove('active')
            document.querySelector('.run').classList.add('active')
            if (avalaibleDogs.includes(tag)) {
                if (tag.length > 1) {
                    tag = letterToNumber[tag];
                }
                sprite.src = `./assets/sprite/${tag}.png`;
                // choice.classList.add("hide");
            } else {
                alert('This dog does not exist !');
            }

            if(dogos.length > 0) dogos[dogos.length - 1].animation = 'run'
            let dogo = document.createElement('canvas')
            dogo.classList.add("dogo")
            dogo.classList.add("alive")
            dogo.height = 64
            dogo.width = 64
            tag = tag.length === 1 ? tag : letterToNumber[tag]
            let dogoCtx = dogo.getContext('2d')
            let dogoSprite = new Image()
            dogoSprite.src = `./assets/sprite/${tag}.png`
            
            dogoSprite.onload = function () {
                dogosContainer.appendChild(dogo)
                dogoCtx.drawImage(dogoSprite, 0, 0, 64, 48, 0, 0, 64, 48);
                dogos.push({
                    el: dogo,
                    sprite: dogoSprite,
                    ctx: dogoCtx,
                    spriteNumber: tag,
                    startingFrame: frame,
                    animation: 'run',
                    position: {
                        x: 0,
                        y: 48
                    }
                })
                setTimeout(() => dogo.classList.add("center"), 500)
            }   

            let dogoToDestroy = document.querySelectorAll('.dogos-container > .dogo')
            console.log(dogoToDestroy)
            if(dogoToDestroy.length >= 1) {
                console.log("there are too many of us")
                dogoToDestroy = Array.from(dogoToDestroy).find(dogo => !dogo.classList.contains('dead'))
                dogoToDestroy.classList.remove('alive')
                dogoToDestroy.classList.add('dead')
                dogoToDestroy.classList.add('out')
                setTimeout(() => {
                    dogoToDestroy.remove()
                    dogos.shift()
                }, 2000)
            }
            
        },

    };

    // Ajouter les commandes à annyang
    annyang.addCommands(commands);

    // Démarrer annyang
    annyang.start();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, position.x, position.y * states[currentAnimation], 64, 48, 0, 0, 64, 48);


    if (frame % 20 === 0) {
        position.x += 64;
    }

    switch (currentAnimation) {
        case "idle":
            if (position.x >= 64 * 13) {
                position.x = 0;
            }
            break;

        case "run":
            if (position.x >= 64 * 8) {
                position.x = 0;
            }
            break;

        case "walk":
            if (position.x >= 64 * 7) {
                position.x = 0;
            }
            break;

        case "sit":
            if (position.x >= 64 * 6) {
                position.x = 0;
            }
            break;


        case "lying":
            if (position.x >= 64 * 5) {
                position.x = 0;
            }
            break;
    }

    dogos.forEach(dogo => {
        console.log(dogo)
        dogo.ctx.clearRect(0, 0, 64, 64);
        dogo.ctx.drawImage(dogo.sprite, dogo.position.x, dogo.position.y * states[dogo.animation], 64, 48, 0, 0, 64, 48);

        if ((frame - dogo.startingFrame) % 20 === 0) {
            dogo.position.x += 64;
        }
    
        switch (currentAnimation) {
            case "idle": if (dogo.position.x >= 64 * 13) dogo.position.x = 0; break;
    
            case "run": if (dogo.position.x >= 64 * 8) dogo.position.x = 0; break;
    
            case "walk": if (dogo.position.x >= 64 * 7) dogo.position.x = 0; break;
    
            case "sit": if (dogo.position.x >= 64 * 6) dogo.position.x = 0; break;
    
            case "lying": if (dogo.position.x >= 64 * 5) dogo.position.x = 0; break;
        }
    })

    frame++;
}
animate();