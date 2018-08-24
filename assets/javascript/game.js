var playerHealthPoints, playerAttackPower, playerAttackPowerBase;
var enemyHealthPoints, enemyCounterAttackPower;
var currentPlayer, currentOpponent; // hold the character objects



// callback for when the document is loaded
$(() => {

    // when the player selects his character
    $('.characterCard').on('click', function() {
        if ($('#userCharacter').children().length != 0) 
            return;

        $('#userCharacter').append(this);

        var enemies = $('#characters').children();
        // console.log(enemies[0]);
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].classList.remove('greenBorder');
            enemies[i].classList.add('redBorder');
            $('#enemies').append(enemies[i]);
        }

        // set player health
        playerHealthPoints = parseInt($(this).children('.healthPoints').text());
        
        // set player attack power
        playerAttackPower = parseInt($(this).children('.healthPoints').data('attack-power'));
        playerAttackPowerBase = playerAttackPower;

        // set the current player character
        currentPlayer = this;
    })  

    // when the player selects the current opponent
    $('.characterCard').on('click', function() {
        if (!$(this).hasClass('redBorder'))  
            return;

        if ($('#currentOpponent').children().length != 0)
            return;

        $('#currentOpponent').append(this);
        $(this).removeClass('redBorder').addClass('blackBorder');

        // set opponent health
        enemyHealthPoints = parseInt($(this).children('.healthPoints').text());

        // set enemy counter attack power
        enemyCounterAttackPower = parseInt($(this).children('.healthPoints').data('counter-attack-power'));

        // set the current opponent character
        currentOpponent = this;
    })

    // setup events for the 'Attack' button
    $('#attack').on('click', function() {
        // make sure there is an opponent
        if (!currentOpponent)
            return;

        // take away from enemy health and display new HP
        enemyHealthPoints -= playerAttackPower;
        $(currentOpponent).children('.healthPoints').text(enemyHealthPoints);

        // increase player attack power
        playerAttackPower += playerAttackPowerBase;

        // check if enemy is dead
        if (enemyHealthPoints <= 0) {
            $(currentOpponent).detach();
            currentOpponent = null;
            return;
        }
        
        // enemy does counter attack on player, and display new HP
        playerHealthPoints -= enemyCounterAttackPower;
        $(currentPlayer).children('.healthPoints').text(playerHealthPoints);

        // check if player is dead
        if (playerHealthPoints <= 0) {
            $(currentPlayer).addClass('dead');
        }
    })



})