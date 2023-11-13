import React from 'react';
import { Button } from '@mui/material';

import './index.css';

function StatusMessage({ gameState, playerSymbol, onPlayAgain }) {
    let statusMessage;
    let showPlayAgain = false;

    if (gameState.winning_line) {
        // Display the winning message
        statusMessage = `${
            gameState.current_player === 'X' ? 'O' : 'X'
        } wins!`;
        showPlayAgain = true;
    } else if (gameState.game_status === 'Active') {
        // Show whose turn it is
        statusMessage =
            gameState.current_player === playerSymbol
                ? 'Your turn'
                : "Waiting for opponent's move...";
    } else if (gameState.game_status === 'Waiting for other player') {
        // Waiting message
        statusMessage = 'Waiting for another player to join...';
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
