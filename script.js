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
