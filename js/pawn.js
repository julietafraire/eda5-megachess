export class Pawn {
 
    score = {
        p : 10,
        h: 30,
        b: 40,
        r: 60,
        q:70,
        k:100
    }

    movePawn(positionBoard){
        let  arrayMoves =[];
        arrayMoves.push(this.moveFrontPawn(positionBoard));
        arrayMoves.push(this.eatRightConnerPawn(positionBoard));
        arrayMoves.push (this.eatLeftConnerPawn(positionBoard));
        return arrayMoves;
    }

    moveFrontPawn(positionBoard){

        let indexTurnRow = 0;
        const {matrixBoard, actual_turn, act_position_row, act_position_col} = positionBoard;
        const nextMove = {
            canMove: false,
            initialPosition: false,
            score: 0,
            old_row: act_position_row,
            old_col: act_position_col,
            new_row: act_position_row,
            new_col: act_position_col
        }
               
        actual_turn == "white" ? indexTurnRow = -1 : indexTurnRow = 1;
        
        let actual_position = matrixBoard[(act_position_row)][act_position_col];
            
        if(matrixBoard[(act_position_row + indexTurnRow)][act_position_col]==' ') {
            if(matrixBoard[(act_position_row + indexTurnRow + indexTurnRow)][act_position_col]==' ' && (act_position_row==2  || act_position_row==3 || act_position_row==12 || act_position_row==13)) {
                nextMove.initialPosition= true;
                nextMove.new_row = (act_position_row + indexTurnRow + indexTurnRow);
            }else{               
                nextMove.new_row = (act_position_row + indexTurnRow);       
            }
            nextMove.score = this.score.p;
            nextMove.canMove= true;
            nextMove.new_col= act_position_col;            
        }else {          
            nextMove.score = 0;
            nextMove.canMove= false;
        }
        return nextMove;        
    }

    eatRightConnerPawn(positionBoard){
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

        let nextRowPosition = act_position_row + indexTurnRow;
        let nextColPosition = act_position_col+1;
    
        if(act_position_col<15){
            if(matrixBoard[nextRowPosition][nextColPosition] !=' ' && (isUpperCase(matrixBoard[act_position_row][act_position_col]) != isUpperCase(matrixBoard[nextRowPosition][nextColPosition]))) {
                nextMove.score = this.score[`${matrixBoard[nextRowPosition][nextColPosition].toLowerCase()}`] * 10;
                nextMove.canMove= true;
                nextMove.new_row = nextRowPosition;
                nextMove.new_col = nextColPosition;
            }else {
                nextMove.score = 0;
                nextMove.canMove= false;
            }
        }
        return nextMove; 
    }

    eatLeftConnerPawn(positionBoard){    
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

        let nextRowPosition = act_position_row + indexTurnRow;
        let nextColPosition = act_position_col-1;
    
        if(act_position_col>0){
            if(matrixBoard[nextRowPosition][nextColPosition] !=' ' && (isUpperCase(matrixBoard[act_position_row][act_position_col]) != isUpperCase(matrixBoard[nextRowPosition][nextColPosition]))) {       
                nextMove.score = this.score[`${matrixBoard[nextRowPosition][nextColPosition].toLowerCase()}`] * 10;
                nextMove.canMove= true;
                nextMove.new_row = nextRowPosition;
                nextMove.new_col = nextColPosition;

            }else {
                nextMove.score = 0;
                nextMove.canMove= false;
            }
        }
        return nextMove;      
    }   
}