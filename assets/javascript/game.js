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
            enemies[i].classList.add('redBackground');
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
        $(this).removeClass('redBorder redBackground').addClass('whiteBorder whiteBackground');

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

            $('#logs').empty();

        // take away from enemy health and display new HP
        enemyHealthPoints -= playerAttackPower;
        $(currentOpponent).children('.healthPoints').text(enemyHealthPoints);

        // display this event in '#logs'
        var oppName = $(currentOpponent).children('.characterName').text();
        $('#logs').text('You attacked ' + oppName + ' for ' + playerAttackPower + ' damage.');

        // increase player attack power
        playerAttackPower += playerAttackPowerBase;

        // check if enemy is dead
        if (enemyHealthPoints <= 0) {
            console.log($('#enemies').children().length == 0);
            $(currentOpponent).detach();
            currentOpponent = null;
            $('#logs').append('<br>You killed ' + oppName)
            
            if ($('#enemies').children().length == 0) {
                console.log("hi");
                $('#exampleModal').modal('show');
                return;
            }
            $('#logs').append('<br>Please select another opponent from above');
            return;
        }
        
        // enemy does counter attack on player, and display new HP
        playerHealthPoints -= enemyCounterAttackPower;
        $(currentPlayer).children('.healthPoints').text(playerHealthPoints);

        // display this event in '#logs'
        $('#logs').append('<br>' + oppName + ' attacked you back for ' + enemyCounterAttackPower + ' damage.');

        // check if player is dead
        if (playerHealthPoints <= 0) {
            $(currentPlayer).addClass('dead');
            $('#logs').append('<br>' + oppName + ' killed you... Refresh the page to try again');
        }

    })



})