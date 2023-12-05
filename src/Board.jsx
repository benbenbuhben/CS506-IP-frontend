import React from 'react';
import './index.css';

function Board({ gameState, onCellClick, winningLine }) {
    const getWinningClass = (i) => {
        if (!winningLine) return "";

        // Check if the current cell is part of the winning line
        if (!winningLine.includes(i)) return "";

        // Horizontal lines: indices 0-2, 3-5, 6-8
        if (winningLine.every(index => [0, 1, 2, 3, 4].includes(index))) return "horizontal-win";
        if (winningLine.every(index => [5, 6, 7, 8, 9].includes(index))) return "horizontal-win middle-up-row";
        if (winningLine.every(index => [10, 11, 12, 13, 14].includes(index))) return "horizontal-win middle-row";
        if (winningLine.every(index => [15, 16, 17, 18, 19].includes(index))) return "horizontal-win middle-bottom-row";
        if (winningLine.every(index => [20, 21, 22, 23, 24].includes(index))) return "horizontal-win bottom-row";

        // Vertical lines: indices 0, 3, 6 etc.
        if (winningLine.every(index => [0, 5, 10, 15, 20].includes(index))) return "vertical-win";
        if (winningLine.every(index => [1, 6, 11, 16, 21].includes(index))) return "vertical-win middle-left-col";
        if (winningLine.every(index => [2, 7, 12, 17, 22].includes(index))) return "vertical-win middle-col";
        if (winningLine.every(index => [3, 8, 13, 18, 23].includes(index))) return "vertical-win middle-right-col";
        if (winningLine.every(index => [4, 9, 14, 19, 24].includes(index))) return "vertical-win right-col";

        // Diagonal lines
        if (winningLine.every(index => [0, 6, 12, 18, 24].includes(index))) return "diagonal-win";
        if (winningLine.every(index => [4, 8, 12, 16, 20].includes(index))) return "diagonal-win reverse";

        return "";
    };

    const renderCell = (i) => {
        let className = `cell ${getWinningClass(i)}`;
        return (
            <button className={className} onClick={() => onCellClick(i)}>
                {gameState[i]}
            </button>
        );
    };

    return (
        <div className="board">
            <div className="row">
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
                {renderCell(3)}
                {renderCell(4)}
            </div>
            <div className="row">
                {renderCell(5)}
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
                {renderCell(9)}
            </div>
            <div className="row">
                {renderCell(10)}
                {renderCell(11)}
                {renderCell(12)}
                {renderCell(13)}
                {renderCell(14)}
            </div>
            <div className="row">
                {renderCell(15)}
                {renderCell(16)}
                {renderCell(17)}
                {renderCell(18)}
                {renderCell(19)}
            </div>
            <div className="row">
                {renderCell(20)}
                {renderCell(21)}
                {renderCell(22)}
                {renderCell(23)}
                {renderCell(24)}
            </div>
        </div>
    );
}

export default Board;
