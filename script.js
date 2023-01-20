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
const attacks = [arcaneSceptre, entangle, dragonBlade, starFire];

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
    $('.hp-text').text(`${fungusHP} HP`);
    $('.ap-text').text(`${playerAP} AP`);
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

    for (let attack of attacks) {
        if (attack.cost > playerAP) {
            $(`.${attack.name}`).prop('disabled', true);
        } else {
            $(`.${attack.name}`).prop('disabled', false);
        }
    }
}

function onAttack() {
    let attack = $(this);


    for (let attackObj of attacks) {
        if (attack.hasClass(attackObj.name)) {
            attack = attackObj;
            break;
        }
    }

    if (playerAP >= attack.cost) {
        fungusHP -= attack.damage;
        (fungusHP < 0 ? fungusHP = 0:null);
        playerAP -= attack.cost;
        (playerAP < 0 ? playerAP = 0:null);
    }
    
    if (checkIfDead()) {
        playerAlive = false;
    }

    if (fungusHP <= 0){
        fungusAlive = false;
    }
    render();
}

function checkIfDead() {
    let isDead = true;
    for (let attack of attacks){
        if (playerAP > attack.cost) {
            isDead = false;
        }
    }
    return isDead;
}

function fungusRegen() {
    if (fungusHP < 50 && fungusHP > 0) {
        fungusHP++;
        render();
    }
}