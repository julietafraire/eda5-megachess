import {Board} from './board.js';
import {Pawn} from './pawn.js';
import {Queen} from './queen.js';
import {Rook} from './rook.js';

const auth_token =  'a2e469cc-b276-4244-acdb-71d2958de131' ;
const url = `ws://megachess.herokuapp.com/service?authtoken=${auth_token}`;
const ws = new WebSocket(url);
document.querySelector('#sendChallege').addEventListener('click', challengeUser);

ws.onopen = () => {
    console.log("WebSocket connetion is open now.");
};   

ws.onerror = function(error) {
    console.log('WebSocket Error: ' + error);
};

ws.onmessage = (e) => {
    let importantData = JSON.parse(e.data);
    let {event, data} = importantData

    switch (event) {
        case 'update_user_list':
            const onlineUsers = data.users_list;
            updateUserList(onlineUsers);
            break;

        case 'ask_challenge':          
            askChallenge(data);
            break;  

        case 'your_turn':
            console.log(event);
            startBoard(data);
            break;  

        case 'gameover':
            let board1 = new Board();
            board1.gameOverBoard(data);
            break; 
      
        default:
          console.log(event);
          break;
    }
}



function updateUserList(onlineUsers){
    let text = '<select id="user-options" class="custom-select w-50">' ;
    onlineUsers.forEach(element => {
        if(element == "fraire") text += `<option value="${element}">myself</option>`;
        else text += `<option value="${element}">${element}</option>`;
    });
    text += `</select>`;
    document.getElementById("userlist").innerHTML = text;
}


function challengeUser(){
    const e = document.getElementById("user-options");
    const selectedUser = e.options[e.selectedIndex].value;
    let messageRival = {
        action: 'challenge',
        data: {           
            username: selectedUser,
            message: 'Hello, Would you like to play a chess match against me?' 
        }
    } 
    ws.send(JSON.stringify(messageRival));   
}


function askChallenge(data){
    const div = document.createElement('div');
    const {username, board_id} =  data;
    div.innerHTML = `<div id="${username}-notification" class="card w-100 mt-2 mb-2 card-new-challenge">
      <div class="card-body">
        <p class="card-text mb-0">Hey, <b>${username}</b> wants to challenge you </p>
      </div>
    </div>`;
    document.getElementById("notification-container").appendChild(div); 
    acceptChallenge(username,board_id);
}

function acceptChallenge(username,board_id){
    let acceptedMessage = {
        action: 'accept_challenge',
        data: {           
            board_id: board_id,
        }
    } 
    document.getElementById(`${username}-notification`).remove();
    ws.send(JSON.stringify(acceptedMessage));  
}

function startBoard(data){
    let {board_id, actual_turn, turn_token, board} = data;
    let board1 = new Board();
    board1.startBoard(data);

    let arrayPieces_board = board1.stringToArrayBoard(board);
    let matrix_board = board1.createMatrixBoard(arrayPieces_board);
    
    movePiece(board_id, turn_token, actual_turn, matrix_board);
}


function movePiece(board_id, turn_token, actual_turn,matrix_board){
    let indexTurnRow = 0;
    let allBestMoves = [];
    let currentTurn = actual_turn == "white" ? true : false;
    const isUpperCase = (string) => /^[A-Z]*$/.test(string);

    for(let i = (actual_turn == "white" ? 0: 15); (actual_turn == "white" ? i<=15: i>=0); (actual_turn == "white" ? i++ : i--)){             
        for(let j=0; j<=15; j++){
            if(isUpperCase(matrix_board[i][j])== currentTurn){              
                if(matrix_board[i][j].toLowerCase() == 'p'){

                    let pieceData = {
                        matrixBoard: matrix_board,
                        actual_turn: actual_turn,
                        act_position_row: i,
                        act_position_col: j         
                    }
    
                    let pieceMove = [];  

                    let pawn = new Pawn();
                    pieceMove = pawn.movePawn(pieceData);  
                    
                    let bestMove = bestMovePiece(pieceMove);

                    if(Object.keys(bestMove).length != 0){
                        allBestMoves.push(bestMove);
                    }
                }else if (matrix_board[i][j].toLowerCase() == 'q'){
                    let pieceData = {
                        matrixBoard: matrix_board,
                        actual_turn: actual_turn,
                        act_position_row: i,
                        act_position_col: j         
                    }
    
                    let pieceMove = [];  

                    let queen = new Queen();
                    pieceMove = queen.moveQueen(pieceData);  
                    
                    let bestMove = bestMovePiece(pieceMove);

                    if(Object.keys(bestMove).length != 0){
                        allBestMoves.push(bestMove);
                    }

                }else if (matrix_board[i][j].toLowerCase() == 'r'){
                    let pieceData = {
                        matrixBoard: matrix_board,
                        actual_turn: actual_turn,
                        act_position_row: i,
                        act_position_col: j         
                    }

                    let pieceMove = [];  

                    let rook = new Rook();
                    pieceMove = rook.moveRook(pieceData);  
                    
                    let bestMove = bestMovePiece(pieceMove);

                    if(Object.keys(bestMove).length != 0){
                        allBestMoves.push(bestMove);
                    }
                }  
            }           
        }        
    }

    let theBestMove = bestMoveAllPieces(allBestMoves);
    
    let {new_col, new_row, old_col, old_row} = theBestMove;
    
    let messagek =  {
        action: 'move', 
        data: {
            board_id: board_id,
            turn_token: turn_token,
            from_row: old_row,
            from_col: old_col,
            to_row: new_row,
            to_col: new_col
        }
    }

    ws.send(JSON.stringify(messagek));   
}

// Para encontrar el mejor movimiento de la pieza
function bestMovePiece(pieceMove){
    let bestScore = 0;
    let bestMove = {};

    if(pieceMove.length > 0){
        pieceMove.forEach(move => {
            if(move.canMove==true && move.score>0 && move.score>bestScore){
                bestScore = move.score;
                bestMove = move;
            }
        });
    }

    return bestMove;
}

// Para encontrar el mejor movimiento de todas las piezas (RANDOM)
function bestMoveAllPieces (allBestMoves){
    let random = Math.floor(Math.random() * (allBestMoves.length - 0)) + 0;  
    return allBestMoves[random];
}
