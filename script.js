const choice = document.querySelector(".choice");
const canvas = document.querySelector("#dog");
const displayDog = document.querySelector(".display-dog");


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
        },
        "run": function () {
            currentAnimation = "run";
            position.x = 0;
        },
        "lie down": function () {
            currentAnimation = "lying";
            position.x = 0;
        },
        "stand up": function () {
            currentAnimation = "idle";
            position.x = 0;
        },
        "I want a new dog": function () {
            choice.classList.remove("hide");
        },

        "I want the dog number *tag": function (tag) {
            //console.log(tag);
            if (avalaibleDogs.includes(tag)) {
                if (tag.length > 1) {
                    tag = letterToNumber[tag];
                }
                sprite.src = `./assets/sprite/${tag}.png`;
                choice.classList.add("hide");
            } else {
                alert('This dog does not exist !');
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

    frame++;
}
animate();