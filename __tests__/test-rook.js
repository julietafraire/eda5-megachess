import { Board } from '../js/board.js';
import { Rook } from '../js/rook.js';
const rookPlayBoard = "rrhhbbqqkkbbh rrrrhhbbqqkkbb  r                      pp    pp p      p            p p      p Q rpp pp  pppp p ppqqqQ   q qq      Q Q Q QhQQQQQ   PPP  q  P   P      PP    P P PP     PP P      P      P    P           P        RRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR";

const board = new Board();
let arrayBoard1 = board.stringToArrayBoard(rookPlayBoard);

let selected_piece;
let result;

describe('Testing Rook moves', ()=> {
    const rookMoves = new Rook();

    // TESTING WHITE ROOKS
    test('Testing white rook: Avanzar hacia delante para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 14,
            act_position_col: 0          
        };

        result = rookMoves.moveFrontRook(selected_piece);
        expect(result.score ).toBe(700);
    });

    test('Testing white rook: Avanzar hacia la derecha y no poder avanzar por que tengo una pieza de mi team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 14,
            act_position_col: 15          
        };

        result = rookMoves.moveRightRook(selected_piece);
        expect(result.canMove ).toBe(false);
    });


    // TESTING BLACKS ROOKS
    test('Testing black rook: Avanzar hacia atras , un lugar antes que la otra pieza de mi team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'black',
            act_position_row: 5,
            act_position_col: 15          
        };

        result = rookMoves.moveBackRook(selected_piece);
        expect(result.canMove ).toBe(true);
    });

    test('Testing black rook: Avanzar hacia la izquierda para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'black',
            act_position_row: 5,
            act_position_col: 15          
        };

        result = rookMoves.moveLeftRook(selected_piece);
        expect(result.score ).toBe(700);
    });

});