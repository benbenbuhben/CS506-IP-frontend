import React from 'react';
import { Button } from '@mui/material';

import './index.css';

function StatusMessage({ gameState, playerSymbol, onPlayAgain, isAI }) {
    let statusMessage;
    let showPlayAgain = false;

    if (gameState.winning_line) {
        // Display the winning message
        statusMessage = `${gameState.winnerPlayer} wins!`;
        showPlayAgain = true;
    } else if (gameState.draw) {
        // Display the draw message
        statusMessage = 'Draw!';
        showPlayAgain = true;
    } else if (gameState.game_status === 'Active') {
        // If it's an AI game and it's the beginning of the game, it's always the human's turn
        if (isAI && !gameState.moves.length) {
            statusMessage = 'Your turn';
        } else {
            // Show whose turn it is
            statusMessage =
                gameState.current_player === playerSymbol
                    ? 'Your turn'
                    : "Waiting for opponent's move...";
        }
    } else if (gameState.game_status === 'Waiting for other player' && !isAI) {
        // Waiting message for multiplayer games
        statusMessage = 'Waiting for another player to join...';
    } else if (isAI) {
        // Initial message for AI games
        statusMessage = 'Your turn';
    }

    return (
        <div className="status-message">
            {statusMessage}
            {showPlayAgain && (
                <Button
                    color="primary"
                    onClick={onPlayAgain}
                    style={{ textTransform: 'none', marginLeft: 8, padding: 0 }}
                >
                    Play again?
                </Button>
            )}
        </div>
    );
}

export default StatusMessage;
