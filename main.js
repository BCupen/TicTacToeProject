//get buttons
const playPvPButton =  document.querySelector('.PvP');
const playAIButton = document.querySelector('.AI');

//get containers
const menuC = document.querySelector('.menu-container');
const gameC = document.querySelector('.game-container');

playPvPButton.addEventListener('click', function(e){
    menuC.style.display = 'none';
    gameC.style.display = 'flex';
});

const GameBoard = (() =>{

})();