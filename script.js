const canvas = document.querySelector("#dog");
const ctx = canvas.getContext("2d");
const sprite = new Image();
sprite.src = "./assets/sprite/Dog_White.png";


let position = {
    "x": 0,
    "y": 48,
};
let frame = 0;

let currentAnimation = "idle";

const states = {
    "idle": 0,
    "run": 1,
    "walk": 2,
    "sit": 3,
    "lying": 4,
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
        "barks": function () {
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
        }

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





