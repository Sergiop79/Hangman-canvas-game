var game = (function () {
    'use strict';
    /**
    * Global variables
    */
    var imagesArr = [
        'img/background.png',   //0 600x400px
        'img/head.png',         //1
        'img/torso.png',        //2
        'img/left-hand.png',    //3
        'img/right-hand.png',   //4
        'img/left-leg.png',     //5
        'img/cowboy.png',       //6
        'img/dead-xx.png',      //7
    ];

    var backGround, head, torso, leftHand, rightHand, leftLeg, cowBoy, deadXX, hintArr;

    var letter = '';


    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    var letterInput = document.getElementById('letra'),
        boomButton = document.getElementById('boom'),
        hint = document.getElementById('hint');

    var wordsArr = ['Manzana', 'Mandarina', 'Cantina', 'Alforja', 'Herradura', 'Pomelo', 'Sheriff', 'Diligencia', 'Ferrocarril', 'Desierto', 'Revolver', 'Cactus', 'Reverendo', 'Poncho', 'Gallina', 'Caballo', 'Buffalo', 'Estampida', 'Barberia'];

    var word;
    var lives;
    var letterCounter;
    var playedLetters;


    // Function to preload the images
    function preloadImages(arr) {
        var newImages = [];
        var loadedImages = 0;
        var arr = (typeof arr != 'object') ? [arr] : arr;
        var postAction = function () {};

        function imageLoadPost () {
            loadedImages++;
            if (loadedImages === arr.length){
                postAction(newImages);
            }
        }


        for (var i = 0; i < arr.length; i++) {
            newImages[i] = new Image();
            newImages[i].src = arr[i];
            newImages[i].onload = function () {
                imageLoadPost();
            };
            newImages[i].onerror = function () {
                console.err('Error loading an image.');
            }
        }

        return {
            done: function (f) {
                postAction = f || postAction;
            }
        }
    }

    /**
    * Get a random integer
    */
    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

   /**
   * Drawing functions
   */
    function drawBackground () {
        ctx.drawImage(backGround, 0, 0);
    }

    function drawHead () {
        ctx.drawImage(head, 180, 20);
    }

    function drawTorso () {
        ctx.drawImage(torso, 180, 20);
    }

    function drawLeftHand () {
        ctx.drawImage(leftHand, 180, 20);
    }

    function drawRightHand () {
        ctx.drawImage(rightHand, 180, 20);
    }

    function drawLeftLeg () {
        ctx.drawImage(leftLeg, 180, 20);
    }

    function drawCowBoy () {
        ctx.drawImage(cowBoy, 180, 20);
    }

    function drawDeadXX () {
        ctx.drawImage(deadXX, -2, -2);
    }

    // Fetching a letter
    function fetchLetter () {
        letter = letterInput.value.toUpperCase();
        checkLetter(letter);
        letterInput.value = '';
        letterInput.focus();
    }

    /**
    * Function to found one item in array of playedLetters
    */
    function include(arr, item) {
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                found = true;
            }
        }
        return found;
    }

    /**
    * Check every letter
    */
    function checkLetter (letter) {
        var found = false;


        for (var i = 0; i < hintArr.length; i++) {
            if (letter === word[i]) {
                hintArr[i] = letter;
                found = true;
                if( include(playedLetters, letter) ) {
                    alert('letra ya jugada');
                    return;
                }
                letterCounter--;
            }
        }

        playedLetters.push(letter);

        if (!found && lives) {
            lives--;

            if (lives === 6) {
                drawHead();
            }

            if (lives === 5) {
                drawTorso();
            }

            if (lives === 4) {
                drawLeftHand();
            }

            if (lives === 3) {
                drawRightHand();
            }

            if (lives === 2) {
                drawLeftLeg();
            }

            if (lives === 1) {
                drawCowBoy();
            }

            if (lives === 0) {
                alert('GAME OVER\nSigue jujando :(');
                newGame();
            }
        }


        if (!letterCounter) {
            alert('Bien!! la palabra es \n' + word);
            newGame();
        }


        showHint();
    }

    /**
    *   Show the Hint text
    */
    function showHint () {
        var hintText = '';
        var p;
        for (p in word) {
            if(hintArr[p] === undefined) {
                hintText += '_ ';
            } else {
                hintText += word[p] + ' ';
            }
        }

        hint.innerHTML = hintText;
    }

    /**
     * CrossBrowser implementation for a Event Listener
     */
    function addListener ( element, type, expression, bubbling ) {
        bubbling = bubbling || false;

        if ( window.addEventListener ) { // Standard
            element.addEventListener( type, expression, bubbling );
        } else if ( window.attachEvent ) { // IE
            element.attachEvent( 'on' + type, expression );
        } else {
            return false;
        }
    }

    /**
    * Function for a new game.
    */
    function newGame () {
        word = wordsArr[ getRandomInt( 0, wordsArr.length - 1 ) ]; // Get a random word from words Array
        word = word.toLocaleUpperCase();
        lives = 7;
        letterCounter = word.length;
        playedLetters = [];
        hintArr = new Array(word.length);
        canvas.width = canvas.width; // Clean the canvas
        drawBackground();
        showHint();
    }

    /**
    * The main function of the game
    */
    function main (images) {
        // The loaded images
        backGround = images[0],
        head = images[1];
        torso = images[2];
        leftHand = images[3];
        rightHand = images[4];
        leftLeg = images[5];
        cowBoy = images[6];
        deadXX = images[7];
        addListener(boomButton, 'click', fetchLetter, false);
        newGame();
    }


    function init() {
        preloadImages(imagesArr).done( main );
    };

    return {
        init: init
    };
}());
