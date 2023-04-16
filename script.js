const canvas = document.querySelector("#dog");
const ctx = canvas.getContext("2d");
const sprite = new Image();
sprite.src = "./assets/sprite/Dog_White.png";


let position = {
    "x": 0,
    "y": 0,
};
let frame = 0;

let currentAnimation = "idle";



if (annyang) {
    // Définir des commandes vocales et des fonctions correspondantes
    var commands = {
        'sit down': function () {
            currentAnimation = "sit";
            position.y = 3*48;
            position.x = 0;
        },
        "what's your name": function () {
            alert('My name is DOGO !');
        },
        "barks": function () {
            let audio = new Audio('./assets/audio/aboiement.mp3');
            audio.play();
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
    ctx.drawImage(sprite, position.x, position.y, 64, 48, 0, 0, 64, 48);

    
    if (frame % 20 === 0) {
        position.x += 64;
    }

    switch (currentAnimation) {
        case "idle":
            if (position.x > 832 - 48) {
                position.x = 0;
            }
            break;

        case "sit":
            if (position.x > 832 - 48*10) {
                position.x = 0;
            }
            break;
        
        case "walk":
            if (position.x > 832 - 48*9) {
                position.x = 0;
            }
            break;
        
        case "run":
            if (position.x > 832 - 48) {
                position.x = 0;
            }
            break;

        case "lying":
            if (position.x > 832 - 48*11) {
                position.x = 0;
            }
            break;
    }

    frame++;
}
animate();





