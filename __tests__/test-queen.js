import { Queen } from '../js/queen.js';
import { Board } from '../js/board.js';
const whiteBoard = "rrhhbbqqkkbbh rrrrhhbbqqkkbb  rr                     pp    pp p      p            p p      p Q  pp pp  pppp p ppqqqQ   q qq    qQQ Q Q QhQQQQQ   PPP  q  P   P  P   PP    P P PP     PP P      P      P    P           P        RRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR";

const blackBoard = "rrhhbbqqkkbbh rrrrhhbbqqkkbb  rr                     p    Qpp p      p            p p      p Q  pp pp  pppq p ppq qQ  qq qq    qqQ Q Q QhQQQQQ   PPP     P   P      PPq     P P  P     PP P      P      P    P           P        RRHHBBQQKKBBH RRRRHHBBQQKKBBH RR";

const board = new Board();
let arrayBoard1 = board.stringToArrayBoard(whiteBoard);
let arrayBoard2 = board.stringToArrayBoard(blackBoard);

let selected_piece;
let result;

describe('Testing Queen moves', ()=> {
    const queenMoves = new Queen();


    // TESTING WHITE QUEENS
    test('Testing white queen: Avanzar hacia delante para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 8,
            act_position_col: 5          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(100);
    });

    test('Testing white queen: No poder avanzar hacia delante porque tiene una pieza del mismo team adelante', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 8,
            act_position_col: 3          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.canMove ).toBe(false);
    });

    test('Testing white queen: Avanzar hacia delante una pieza antes que la de mi team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 8,
            act_position_col: 13          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(70);
    });

    test('Testing white queen: Avanzar hacia delante y no encontrar nada para comer', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 5,
            act_position_col: 13          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(70);
    });

    test('Testing white queen: Avanzar hacia la izquierda para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 5,
            act_position_col: 13          
        };

        result = queenMoves.moveLeftQueen(selected_piece);
        expect(result.score ).toBe(100);
    });

    test('Testing white queen: Avanzar hacia la derecha una pieza antes que la de mi team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard1),
            actual_turn: 'white',
            act_position_row: 8,
            act_position_col: 3          
        };

        result = queenMoves.moveRightQueen(selected_piece);
        expect(result.score ).toBe(70);
    });

    // TESTING BLACK QUEENS
    test('Testing black queen: Avanzar hacia delante para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard2),
            actual_turn: 'black',
            act_position_row: 8,
            act_position_col: 0          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(600);
    });

    test('Testing black queen: No poder avanzar hacia delante porque tiene una pieza del mismo team adelante', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard2),
            actual_turn: 'black',
            act_position_row: 6,
            act_position_col: 10          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.canMove ).toBe(false);
    });

    test('Testing black queen: Avanzar hacia delante una pieza antes que la de mi team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard2),
            actual_turn: 'black',
            act_position_row: 7,
            act_position_col: 6          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(70);
    });

    test('Testing black queen: Avanzar hacia delante y no encontrar nada para comer', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard2),
            actual_turn: 'black',
            act_position_row: 7,
            act_position_col: 15          
        };

        result = queenMoves.moveFrontQueen(selected_piece);
        expect(result.score ).toBe(70);
    });

    test('Testing black queen: Avanzar hacia atras para comer una pieza del otro team', () => {
        selected_piece = {
            matrixBoard: board.createMatrixBoard(arrayBoard2),
            actual_turn: 'black',
            act_position_row: 6,
            act_position_col: 10          
        };

        result = queenMoves.moveBackQueen(selected_piece);
        expect(result.score ).toBe(700);
    });
    
});