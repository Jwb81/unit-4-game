
// callback for when the document is loaded
$(() => {
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
    })

    $('.characterCard').on('click', function() {
        if (!$(this).hasClass('redBorder'))  
            return;

        if ($('#currentOpponent').children().length != 0)
            return;
            
        $('#currentOpponent').append(this);
        $(this).removeClass('redBorder').addClass('blackBorder');
    })



})