$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;
let fungusHP = 100;
let playerAP = 100;
let fungusAlive = true;
let arcanceSceptre = {name: 'arcane-sceptre', damage: 14, cost: 12};
let entangle = {name: 'entangle', damage: 9, cost: 23};
let dragonBlade = {name: 'dragon-blade', damage: 47, cost: 38};
let starFire = {name: 'star-fire', damage: 25, cost: 33};

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

    if (attack.hasClass('arcane-sceptre')) {
        attack = arcanceSceptre;
    } else if (attack.hasClass('entangle')) {
        attack = entangle;
    } else if (attack.hasClass('dragon-blade')) {
        attack = dragonBlade;
    } else if (attack.hasClass('star-fire')) {
        attack = starFire;
    }
    if (playerAP >= attack.cost) {
        fungusHP -= attack.damage;
        playerAP -= attack.cost;
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