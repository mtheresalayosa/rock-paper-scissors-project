const moveTypes = ['rock', 'paper', 'scissors'];
let p1points = 0, p2points = 0;
let roundWinner = '';

let playerOneMoveOneType = undefined;
let playerOneMoveTwoType = undefined;
let playerOneMoveThreeType = undefined;

let playerTwoMoveOneType = undefined;
let playerTwoMoveTwoType = undefined;
let playerTwoMoveThreeType = undefined;

let playerOneMoveOneValue = undefined;
let playerOneMoveTwoValue = undefined;
let playerOneMoveThreeValue = undefined;

let playerTwoMoveOneValue = undefined;
let playerTwoMoveTwoValue = undefined;
let playerTwoMoveThreeValue = undefined;

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue){
    const currentPlayer = player;
    const playerMoveTypes = [moveOneType, moveTwoType, moveThreeType];
    const playerMoveValues = [moveOneValue, moveTwoValue, moveThreeValue];

    const checkTypeUndefined = playerMoveTypes.every((types)=> types !== undefined);
    const checkValueUndefined = playerMoveValues.every((value) => value !== undefined);
    const checkMoveType = playerMoveTypes.every((moves)=>moveTypes.includes(moves));
    const checkMoveValues = playerMoveValues.every((value)=> value >= 1 && value <= 99);
    let sum = 0;
    playerMoveValues.forEach((values) => {
        sum += values;
    })
    const checkValueSum = sum > 99;

    if(checkTypeUndefined === true && checkValueUndefined === true && checkMoveType === true && checkMoveValues === true && checkValueSum === false){
        if(currentPlayer === "Player One"){
            playerOneMoveOneType = moveOneType;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeValue = moveThreeValue;
        }else{
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeValue = moveThreeValue;
        }  
    } 
}

function getRoundWinner(roundNumber){
    let p1mt, p2mt, p1mv, p2mv = '';

    const playround = (p1mt, p2mt, p1mv, p2mv) =>{
        if(p1mv !== undefined && p2mv !== undefined){
            if(p1mt === 'rock'){
                if(p2mt === 'scissors'){
                    roundWinner = 'Player One';
                }else if(p2mt === 'paper'){
                    roundWinner = 'Player Two';
                }else if(p2mt === 'rock'){
                    if(p1mv > p2mv){
                        roundWinner = 'Player One';
                    }else if(p1mv < p2mv){
                        roundWinner = 'Player Two';
                    }else{
                        roundWinner = 'Tie';
                    }
                }else{
                    roundWinner = null;
                }
            }else if(p1mt === 'scissors'){
                if(p2mt === 'paper'){
                    roundWinner = 'Player One';
                }else if(p2mt === 'rock'){
                    roundWinner = 'Player Two';
                }else if(p2mt === 'scissors'){
                    if(p1mv > p2mv){
                        roundWinner = 'Player One';
                    }else if(p1mv < p2mv){
                        roundWinner = 'Player Two';
                    }else{
                        roundWinner = 'Tie';
                    }
                }else{
                    roundWinner = null;
                }
            }else if(p1mt === 'paper'){
                if(p2mt === 'rock'){
                    roundWinner = 'Player One';
                }else if(p2mt === 'scissors'){
                    roundWinner = 'Player Two';
                }else if(p2mt === 'paper'){
                    if(p1mv > p2mv){
                        roundWinner = 'Player One';
                    }else if(p1mv < p2mv){
                        roundWinner = 'Player Two';
                    }else{
                        roundWinner = 'Tie';
                    }
                }else{
                    roundWinner = null;
                }
            }else{
                roundWinner = null;
            }
        }else{
            roundWinner = null;
        }
    }
    
    switch(roundNumber){
        case 1:
            p1mt = playerOneMoveOneType;
            p2mt = playerTwoMoveOneType;
            p1mv = playerOneMoveOneValue;
            p2mv = playerTwoMoveOneValue;

            playround(p1mt, p2mt, p1mv, p2mv);
            break;

        case 2:
            p1mt = playerOneMoveTwoType;
            p2mt = playerTwoMoveTwoType;
            p1mv = playerOneMoveTwoValue;
            p2mv = playerTwoMoveTwoValue;

            playround(p1mt, p2mt, p1mv, p2mv);
            break;

        case 3:
            p1mt = playerOneMoveThreeType;
            p2mt = playerTwoMoveThreeType;
            p1mv = playerOneMoveThreeValue;
            p2mv = playerTwoMoveThreeValue;
        
            playround(p1mt, p2mt, p1mv, p2mv);
            break;

        default:
            roundWinner = null;
            break;

    }

    return roundWinner;
}

function getGameWinner(){
    let winner = '';
    let rounds = [1, 2, 3];
    let p1pts = 0, p2pts = 0;
    rounds.every((round) => {
        let winner = getRoundWinner(round);
        if(winner === 'Player One'){
            p1pts +=1;
            return true;
        }else if(winner === 'Player Two'){
            p2pts +=1;
            return true;
        }else if(winner === 'Tie'){
            winner = null;
            p1pts +=1, p2pts += 1;
            return true;
        }else if(winner === null){
            winner = null;
            p1pts=0, p2pts = 0;
            return false;
        }
    });

    if(p1pts > p2pts){
        winner = 'Player One';
    }else if(p2pts > p1pts){
        winner = 'Player Two';
    }else if(p1pts === p2pts && p1pts !== 0 && p2pts !== 0){
        winner = 'Tie';
    }else{
        winner = null
    }

    return winner;
}

function setComputerMoves(){
    const setRandomMoveType = moveTypes[Math.floor(Math.random() * moveTypes.length)];
    playerTwoMoveOneType = setRandomMoveType;
    playerTwoMoveTwoType = setRandomMoveType;
    playerTwoMoveThreeType = setRandomMoveType;

    const setRandomMoveValues = (max) => Math.trunc(Math.random() * max) + 1;
    playerTwoMoveOneValue = setRandomMoveValues(100);
    playerTwoMoveTwoValue = setRandomMoveValues(100 - playerTwoMoveOneValue);
    playerTwoMoveThreeValue = Math.abs(Math.ceil(99 - (playerTwoMoveOneValue + playerTwoMoveTwoValue)));
}