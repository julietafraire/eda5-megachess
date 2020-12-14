export class Board{

    startBoard(data){
        let {board_id, username, actual_turn, move_left, opponent_username, turn_token, board} = data;
        let arrayPieces_board;
        if(document.getElementById(`${board_id}`) == null){
            const div = document.createElement('div');
            div.classList.add("col-6");
            div.id= `${board_id}`;    
            document.getElementById("contenedor-jugadas").appendChild(div);        
        }
        arrayPieces_board = this.stringToArrayBoard(board);

        if(document.getElementById(`${board_id}`) != null){      
            let boardContainer = document.getElementById(`${board_id}`);
            let board = `<div class="mt-3 mb-3">
            <p style="margin-bottom:0px;"><b>Actual Turn</b>: ${actual_turn}</p>
            <p style="margin-bottom:0px;"><b>Move Left</b>: ${move_left}</p>          
            <p style="margin-bottom:0px;"><b>Opponent Username</b>: ${opponent_username}</p>
            <p style="margin-bottom:0px;"><b>Turn Token</b>: ${turn_token}</p>
            </div>
            <div class="board">`;
    
            let counterPiece = 0;
    
            for(let j=0; j<16; j++){
                if(j % 2 == 0){
                    board += `<div class="line-board">` ; 
                    for(let i=0; i<16; i++){
                        if(i % 2 == 0) board += `<div class="black-square square">${arrayPieces_board[counterPiece]}</div>`;
                        else board += `<div class="white-square square">${arrayPieces_board[counterPiece]}</div>`;  
                        counterPiece++;
                    }                   
                    board +=`</div>`;
                }else{
                    board += `<div class="line-board">` ; 
                    for(let i=0; i<16; i++){
                        if(i % 2 == 0) board += `<div class="white-square square">${arrayPieces_board[counterPiece]}</div>`;
                        else board += `<div class="black-square square">${arrayPieces_board[counterPiece]}</div>`;  
                        counterPiece++;
                    }                   
                    board +=`</div>`;
                }             
            }      
            board += `</div>`;
            boardContainer.innerHTML = board; 
        }
    }

    gameOverBoard(data){
        let {board_id, black_username, black_score, white_score, white_username} = data;

        if(document.getElementById(`${board_id}`) == null){
            const div = document.createElement('div');
            div.classList.add("col-6");
            div.id= `${board_id}`;    
            document.getElementById("contenedor-jugadas").appendChild(div);        
        }

        if(document.getElementById(`${board_id}`) != null){      
            let boardContainer = document.getElementById(`${board_id}`);
            let board = `<div class="mt-3 mb-3">
            <p style="text-align: center;"><b>GAME OVER</b></p>
            <hr>
            <p style="margin-bottom:0px;"><b>BLACK USER</b></p>
            <p style="margin-bottom:0px;"><b>User</b>: ${black_username}</p>
            <p style="margin-bottom:0px;"><b>Score</b>: ${black_score}</p>
            <hr>
            <p style="margin-bottom:0px;"><b>WHITE USER</b></p>
            <p style="margin-bottom:0px;"><b>User</b>: ${white_username}</p>
            <p style="margin-bottom:0px;"><b>Score</b>: ${white_score}</p>
            </div>`;
            boardContainer.innerHTML = board; 
        }    
    }
    
    stringToArrayBoard (board){
        const pieces_board1 = board;
        let arrayPieces_board= [];
    
        for (let i = 0; i < pieces_board1.length; i++) {
            arrayPieces_board.push(pieces_board1.charAt(i));
        }

        return arrayPieces_board;
    }

    createMatrixBoard(arrayboard){
        let counter = 0;   
        let matrixPieces = [];

        for(let i=0; i<16; i++) {
            matrixPieces[i] = [];
            for(let j=0; j<16; j++) {
                matrixPieces[i][j] = arrayboard[counter];
                counter++;
            }
        }
        
        return matrixPieces;
    }
}