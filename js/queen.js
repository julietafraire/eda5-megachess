export class Queen {

    score = {
        p : 10,
        h: 30,
        b: 40,
        r: 60,
        q:70,
        k:100
    }

    moveQueen(positionBoard){
        let  arrayMoves =[];
        arrayMoves.push(this.moveFrontQueen(positionBoard));
        arrayMoves.push(this.moveLeftQueen(positionBoard));
        arrayMoves.push(this.moveRightQueen(positionBoard));
        arrayMoves.push(this.moveBackQueen(positionBoard));
       
        return arrayMoves;
    }

    moveFrontQueen(positionBoard){
        let indexTurnRow = 0;
        const {matrixBoard, actual_turn, act_position_row, act_position_col} = positionBoard;
        const isUpperCase = (string) => /^[A-Z]*$/.test(string);
        const nextMove = {
            canMove: false,
            score: 0,
            old_row: act_position_row,
            old_col: act_position_col,
            new_row: act_position_row,
            new_col: act_position_col
        }
               
        actual_turn == "white" ? indexTurnRow = -1 : indexTurnRow = 1;

        let start = act_position_row+indexTurnRow;
        let team = isUpperCase(matrixBoard[act_position_row][act_position_col]);

        
        for(let i = start; (actual_turn == "white" ? i>=0 : i<=15); (actual_turn == "white" ? i-- : i++)){
            let actualTeamPosition = isUpperCase(matrixBoard[i][act_position_col]);
            
            if(matrixBoard[i][act_position_col] != ' ' && (actualTeamPosition == team)){
                if((i-indexTurnRow) == act_position_row){
                    nextMove.canMove= false;
                    nextMove.score= 0;
                }else{
                    nextMove.canMove= true;
                    nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                    nextMove.new_row = (i-indexTurnRow);
                }
                break;
            }else if (matrixBoard[i][act_position_col] != ' ' && (actualTeamPosition != team)){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[i][act_position_col].toLowerCase()}`]*10;
                nextMove.new_row = i;
                break;
            }else if (i == (actual_turn == "white" ? 0 : 15)){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                nextMove.new_row = i;
                break;
            }
        }

        return nextMove;
    }

    moveLeftQueen(positionBoard){
        let indexTurnRow = 0;
        const {matrixBoard, actual_turn, act_position_row, act_position_col} = positionBoard;
        const isUpperCase = (string) => /^[A-Z]*$/.test(string);
        const nextMove = {
            canMove: false,
            score: 0,
            old_row: act_position_row,
            old_col: act_position_col,
            new_row: act_position_row,
            new_col: act_position_col
        }
               
        actual_turn == "white" ? indexTurnRow = -1 : indexTurnRow = 1;

        let start = act_position_col-1;
        let team = isUpperCase(matrixBoard[act_position_row][act_position_col]);

        if(act_position_col >0){
            for(let i = start; i>= 0; i--){
                
                let actualTeamPosition = isUpperCase(matrixBoard[act_position_row][i]);
                
                if(matrixBoard[act_position_row][i] != ' ' && (actualTeamPosition == team)){
                    if((i+1) == act_position_col){
                        nextMove.canMove= false;
                        nextMove.score= 0;
                    }else{
                        nextMove.canMove= true;
                        nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                        nextMove.new_col = (i+1);
                    }
                    break;
                }else if (matrixBoard[act_position_row][i] != ' ' && (actualTeamPosition != team)){
                    nextMove.canMove= true;
                    nextMove.score= this.score[`${matrixBoard[act_position_row][i].toLowerCase()}`]*10;
                    nextMove.new_col = i;
                    break;
                }else if (i == 0){              
                    nextMove.canMove= true;
                    nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                    nextMove.new_col = i;
                    break;
                }
            }
        }
        return nextMove;   
    }

    moveRightQueen(positionBoard){
        let indexTurnRow = 0;
        const {matrixBoard, actual_turn, act_position_row, act_position_col} = positionBoard;
        const isUpperCase = (string) => /^[A-Z]*$/.test(string);
        const nextMove = {
            canMove: false,
            score: 0,
            old_row: act_position_row,
            old_col: act_position_col,
            new_row: act_position_row,
            new_col: act_position_col
        }
               
        actual_turn == "white" ? indexTurnRow = -1 : indexTurnRow = 1;

        let start = act_position_col+1;
        let team = isUpperCase(matrixBoard[act_position_row][act_position_col]);

        if(act_position_col< 15){
        for(let i = start; i<= 15; i++){
            let actualTeamPosition = isUpperCase(matrixBoard[act_position_row][i]);
            
            if(matrixBoard[act_position_row][i] != ' ' && (actualTeamPosition == team)){
                if((i-1) == act_position_col){
                    nextMove.canMove= false;
                    nextMove.score= 0;
                }else{
                    nextMove.canMove= true;
                    nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                    nextMove.new_col = (i-1);
                }
                break;
            }else if (matrixBoard[act_position_row][i] != ' ' && (actualTeamPosition != team)){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[act_position_row][i].toLowerCase()}`]*10;
                nextMove.new_col = i;
                break;
            }else if (i == 15){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                nextMove.new_col = i;
                break;
            }
        }
        } 

        return nextMove;
        
    }

    moveBackQueen(positionBoard){
        let indexTurnRow = 0;
        const {matrixBoard, actual_turn, act_position_row, act_position_col} = positionBoard;
        const isUpperCase = (string) => /^[A-Z]*$/.test(string);
        const nextMove = {
            canMove: false,
            score: 0,
            old_row: act_position_row,
            old_col: act_position_col,
            new_row: act_position_row,
            new_col: act_position_col
        }
               
        actual_turn == "white" ? indexTurnRow = -1 : indexTurnRow = 1;
    
        let start = act_position_row-indexTurnRow;
        let team = isUpperCase(matrixBoard[act_position_row][act_position_col]);

        
        for(let i = start; (actual_turn == "white" ? i<=15: i>=0); (actual_turn == "white" ? i++ : i--)){
            
            let actualTeamPosition = isUpperCase(matrixBoard[i][act_position_col]);
            
            if(matrixBoard[i][act_position_col] != ' ' && (actualTeamPosition == team)){
                if((i+indexTurnRow) == act_position_row){
                    nextMove.canMove= false;
                    nextMove.score= 0;
                }else{
                    nextMove.canMove= true;
                    nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                    nextMove.new_row = (i+indexTurnRow);
                }
                break;
            }else if (matrixBoard[i][act_position_col] != ' ' && (actualTeamPosition != team)){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[i][act_position_col].toLowerCase()}`]*10;
                nextMove.new_row = i;
                break;
            }else if (i == (actual_turn == "white" ? 15 : 0)){
                nextMove.canMove= true;
                nextMove.score= this.score[`${matrixBoard[act_position_row][act_position_col].toLowerCase()}`];
                nextMove.new_row = i;
                break;
            }
        }
        return nextMove;
    }
}