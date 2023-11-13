import React from 'react';
import './index.css';

function Board({ gameState, onCellClick, winningLine }) {
    const getWinningClass = (i) => {
        if (!winningLine) return "";

        // Check if the current cell is part of the winning line
        if (!winningLine.includes(i)) return "";

        // Horizontal lines: indices 0-2, 3-5, 6-8
        if (winningLine.every(index => [0, 1, 2].includes(index))) return "horizontal-win";
        if (winningLine.every(index => [3, 4, 5].includes(index))) return "horizontal-win middle-row";
        if (winningLine.every(index => [6, 7, 8].includes(index))) return "horizontal-win bottom-row";

        // Vertical lines: indices 0, 3, 6 etc.
        if (winningLine.every(index => [0, 3, 6].includes(index))) return "vertical-win";
        if (winningLine.every(index => [1, 4, 7].includes(index))) return "vertical-win middle-col";
        if (winningLine.every(index => [2, 5, 8].includes(index))) return "vertical-win right-col";

        // Diagonal lines
        if (winningLine.every(index => [0, 4, 8].includes(index))) return "diagonal-win";
        if (winningLine.every(index => [2, 4, 6].includes(index))) return "diagonal-win reverse";

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
            </div>
            <div className="row">
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
            </div>
            <div className="row">
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
            </div>
        </div>
    );
}

export default Board;
