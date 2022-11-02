const displayController = (()=>{
    //get buttons
    const playPvPButton =  document.querySelector('.PvP');
    const playAIButton = document.querySelector('.AI');

    //get containers
    const menuC = document.querySelector('.menu-container');
    const gameC = document.querySelector('.game-container');

    playPvPButton.addEventListener('click', function(e){
        menuC.style.display = 'none';
        gameC.style.display = 'flex';
        GameBoard.startGame();
    });
})();

const GameBoard = (() =>{
    //get Header
    const header=  document.querySelector('.header');

    const player = (name, char, score, color,moves=[])=>{
        return {name, char, score, color,moves};
    };

    const player1 = player('Player 1', 'X', 0, '#3b82f6');
    const player2 = player('Player 2', 'O', 0, '#ef4444');
    let currPlayer = player1;

    const winCombos = [
        [0,1,2], [0,3,6], [0,4,8],
        [1,4,7], [2,5,8], [2,4,6],
        [3,4,5], [6,7,8]
    ];

    let board = Array(9).fill('');
    let turns = 0;

    const startGame = () =>{
        const coinFlip = Math.floor(Math.random() * 2);
        if(coinFlip === 1){
            player2.char = 'X';
            player1.char = 'O';
            currPlayer= player2;
        };
        setTimeout(function(){
            header.textContent = `${currPlayer.name}! Your turn.`;
        }, 2000);
    };

    const checkWin = (mark) =>{
        let win;
        for(let combo of winCombos){
            win = true;
            for(let pos of combo){
                if(board[pos] !== mark){
                    win = false;
                }
            }
            if(win){
                return {win, combo};
            }
        }
        return {win, combo: []};
    }


    //get board
    const spaces  = document.querySelectorAll('.space');

    //get player scores
    const player1Score = document.querySelector('.first').nextElementSibling;
    const player2Score = document.querySelector('.second').nextElementSibling;

    spaces.forEach(space =>{
        space.addEventListener('click', (e)=>{
            const el = e.target;
            const index = el.getAttribute('data-index');
            if(!el.textContent){
                turns++;
                board[index] = currPlayer.char;
                el.textContent = currPlayer.char;
                el.style.color = currPlayer.color;
                currPlayer.moves.push(index);
                const checkWinObj = checkWin(currPlayer.char);
                if (checkWinObj.win){
                    header.textContent = `${currPlayer.name} wins!`;
                    currPlayer.score++;
                    if(currPlayer.name === 'Player 1'){
                        player1Score.textContent = currPlayer.score;
                    }else{
                        player2Score.textContent = currPlayer.score;
                    }
                    for(let pos of checkWinObj.combo){
                        const currSpace = document.querySelector(`[data-index='${pos}']`);
                        currSpace.style.color = '#22c55e';
                    }
                }else{
                    if(turns >= 9){
                        player1Score.textContent = parseInt(player1Score.textContent) + 1;
                        player2Score.textContent = parseInt(player2Score.textContent) + 1;
                        header.textContent = `It's a Tie!`;
                    }else{
                        if(currPlayer === player1)
                            currPlayer = player2;
                        else currPlayer = player1;

                        header.textContent = `${currPlayer.name}! Your turn.`;
                    }
                    
                }
                
            }          
            else{
                header.textContent = `You cannot play here`;
            }            
        })
    })

    return {startGame};
})();
