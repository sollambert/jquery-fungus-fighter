$(document).ready(onReady);

// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:
// let fungusHP = 100;
let fungusHP = 100;
let playerAP = 100;
let playerAlive = true;
let fungusAlive = true;
const arcaneSceptre = {name: 'arcane-sceptre', damage: 14, cost: 12};
const entangle = {name: 'entangle', damage: 9, cost: 23};
const dragonBlade = {name: 'dragon-blade', damage: 47, cost: 38};
const starFire = {name: 'star-fire', damage: 25, cost: 33};

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
    if (!playerAlive) {
        let fungus = $('.freaky-fungus');
        fungus.removeClass('walk');
        fungus.addClass('jump');
    }

    if (arcaneSceptre.cost > playerAP) {
        $('.arcane-sceptre').prop('disabled', true);
    } else {
        $('.arcane-sceptre').prop('disabled', false);
    }
    if (entangle.cost > playerAP) {
        $('.entangle').prop('disabled', true);
    } else {
        $('.entangle').prop('disabled', false);
    }
    if (dragonBlade.cost > playerAP) {
        $('.dragon-blade').prop('disabled', true);
    } else {
        $('.dragon-blade').prop('disabled', false);
    }
    if (starFire.cost > playerAP) {
        $('.star-fire').prop('disabled', true);
    } else {
        $('.star-fire').prop('disabled', false);
    }
}

function onAttack() {
    let attack = $(this);

    if (attack.hasClass('arcane-sceptre')) {
        attack = arcaneSceptre;
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
    if (playerAP < arcaneSceptre.cost
        && playerAP < entangle.cost
        && playerAP < dragonBlade.cost
        && playerAP < starFire.cost) {
            playerAlive = false;
        }

    if (fungusHP <= 0){
        fungusAlive = false;
    } else if (playerAP <= 0) {
        playerAlive = false;
    }
    render();
}

function fungusRegen() {
    if (fungusHP <= 50) {
        fungusHP++;
    }
    render();
}