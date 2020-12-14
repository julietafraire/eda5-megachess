import { Pawn } from '../js/pawn.js';
import { Board } from '../js/board.js';
const board1 = "rrhhbbqqkkbbhhrrrrhhbbqqkkbb hrr                     pp    pp p      p       p    p p      p p  pp pp  pppp p ppqqqq   q qq  Q qQQQQQ  QhQQQQ Q  PPP  q  P   P  P   PP    P P PP     PP P      P      P    P           P        RRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR";

const board = new Board();
let arrayBoard1 = board.stringToArrayBoard(board1);

let selected_piece;
let result;
// Traduccior board a arreglo


describe('Testing Pawn moves', ()=> {
    const pawnMoves = new Pawn();

    test('Test de peon blanco: Avanzar 2 casillas en posición inicial', () => {
       
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 11,
            act_position_col: 8          
        }

        result = pawnMoves.moveFrontPawn(selected_piece);
        expect(result.initialPosition ).toBe(false);
    });

    // Testing to Black pieces
    test('Test de peon negro: avanzar peon', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'black',
            act_position_row: 4, 
            act_position_col: 5
        };

        result = pawnMoves.moveFrontPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon negro: comer a la derecha', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'black',
            act_position_row: 6, 
            act_position_col: 12
        };
        result = pawnMoves.eatRightConnerPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon negro: comer a la izquierda', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'black',
            act_position_row: 6, 
            act_position_col: 14
        };
        result = pawnMoves.eatLeftConnerPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon negro: no poder mover', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'black',
            act_position_row: 3, 
            act_position_col: 5
        };

        result = pawnMoves.moveFrontPawn(selected_piece);
        expect(result.canMove ).toBe(false);
    });

   
    // // Testing to White pieces
    test('Test de peon blanco: avanzar peon', () => {

        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'white',
            act_position_row: 10, 
            act_position_col: 5
        };

        result = pawnMoves.moveFrontPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon blanco: comer a la derecha', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'white',
            act_position_row: 10, 
            act_position_col: 5
        };

        result = pawnMoves.eatRightConnerPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon blaco: comer a la izquierda', () => {
        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'white',
            act_position_row: 9, 
            act_position_col: 9
        };

        result = pawnMoves.eatLeftConnerPawn(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Test de peon blanco: no poder mover', () => {

        selected_piece = { 
            matrixBoard: board.createMatrixBoard(arrayBoard1), 
            actual_turn: 'white',
            act_position_row: 11, 
            act_position_col: 5
        };

        result = pawnMoves.moveFrontPawn(selected_piece);
        expect(result.canMove ).toBe(false);
    });

    
  

    
});