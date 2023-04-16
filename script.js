if (annyang) {
    // Définir des commandes vocales et des fonctions correspondantes
    var commands = {
        'sit down': function () {
            alert("I sit down !");
        },
        "what's your name": function () {
            alert('My name is DOGO !');
        },
        "barks": function () {
            let audio = new Audio('./assets/audio/aboiement.mp3');
            audio.play();
        },
    };

    // Ajouter les commandes à annyang
    annyang.addCommands(commands);

    // Démarrer annyang
    annyang.start();
}

const canvas = document.querySelector("#dog");

const ctx = canvas.getContext("2d");
const sprite = new Image();
sprite.src = "./assets/sprite/Dog_White.png";


let position = 0;
let frame = 0;


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, position, 0, 64, 48, 0, 0, 64, 48);
    
    if (frame % 20 === 0) {
        position += 64;
    }
    
    if (position > 832-48) {
        position = 0;
    }

    frame++;
}
animate();
