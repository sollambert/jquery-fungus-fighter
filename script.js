$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;
let fungusHP = 100;
let playerAP = 100;
let fungusAlive = true;

function onReady() {
    
    // Make sure you check the index.html file! 
    // There are lots of buttons and things ready for you to hook into here!
    $(".attack-btn").on('click', onAttack);
    
    // 🧠 Remember
    // - Handle events that ->
    // - Updates state which is ->
    // - Rendered to the DOM
    setInterval(fungusRegen, 1000);
    render();
}

function render() {
    $('#hp-meter').val(fungusHP);
    $('#ap-meter').val(playerAP);
    if (!fungusAlive) {
        let fungus = $('.freaky-fungus');
        fungus.removeClass('walk');
        fungus.addClass('dead');
    }
}

function onAttack() {
    let attack = $(this);
    let damage = 0;
    let apCost = 0;
    if (attack.hasClass('arcane-sceptre')) {
        damage = 14;
        apCost = 12;
    } else if (attack.hasClass('entangle')) {
        damage = 9;
        apCost = 23;
    } else if (attack.hasClass('dragon-blade')) {
        damage = 47;
        apCost = 38;
    } else if (attack.hasClass('star-fire')) {
        damage = 25;
        apCost = 33;
    }
    if (playerAP >= apCost) {
        fungusHP -= damage;
        playerAP -= apCost;
    } else {
        console.log('not enough ap')
    }

    if (fungusHP <= 0){
        fungusAlive = false;
    }
    render();
}

function fungusRegen() {
    if (fungusHP <= 50) {
        fungusHP++;
    }
    render();
}