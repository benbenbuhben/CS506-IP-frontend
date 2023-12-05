import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameLinkDialog from './GameLinkDialog';
import StatusMessage from './StatusMessage';
import useSocket from './useSocket';
import { Button } from '@mui/material';

function Game() {
    const socket = useSocket();
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        current_player: null,
        game_id: null,
        game_status: "Not started",
        winning_line: null,
    });
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const joinGame = () => {
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/?game_id=${gameState.game_id}`;
    };    

    // useEffect for handling game state updates
    useEffect(() => {
        if (socket) {
            socket.on('game_state', data => {
                setGameState(data);
                if (playerSymbol !== data.player_symbol) {
                    setPlayerSymbol(data.player_symbol);
                }
            });

            return () => {
                socket.off('game_state'); // Clean up the event listener
            };
        }
    }, [socket, playerSymbol]);

    // Extract game_id from URL and join game
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const gameIdFromURL = queryParams.get('game_id');
        if (socket && gameIdFromURL) {
            socket.emit('join_game', { game_id: gameIdFromURL });
            setGameState(prevState => ({ ...prevState, game_id: gameIdFromURL }));
        }
    }, [socket]);

    const handleCellClick = (i) => {
        if (gameState.current_player === playerSymbol && gameState.board[i] === ' ') {
            socket.emit('make_move', { position: i, game_id: gameState.game_id });
        }
    };

    const createNewGame = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/new_game`, {
                method: 'POST',
            });
            const { game_id } = await response.json();
            setGameState({
                ...gameState,
                game_id,
            });
            handleOpenDialog();
        } catch (error) {
            console.error('Error creating new game:', error);
        }
    };

    const createNewGameWithAI = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/new_game`, {
                method: 'POST',
                body: JSON.stringify({ ai: true }),
            });
            const { game_id } = await response.json();
            setGameState({
                ...gameState,
                game_id,
            });
            window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/?game_id=${game_id}`;
        } catch (error) {
            console.error('Error creating new game:', error);
        }
    };


    const handlePlayAgain = () => {
        if (socket && gameState.game_id) {
            socket.emit('reset_game', { game_id: gameState.game_id });
        }
    };

    return (
        <div className="game-wrapper">
            <h1>Tic Tac Toe</h1>
            <div className='button-wrapper'>

            {gameState.game_id === null && <Button variant="contained" color="primary" onClick={createNewGame}>
                Play with a friend
            </Button>}
            {gameState.game_id === null && <Button variant="contained" color="secondary" onClick={createNewGameWithAI}>
                Play with AI
            </Button>}
            </div>
            <GameLinkDialog
                open={openDialog}
                gameId={gameState.game_id}
                onClose={handleCloseDialog}
                onJoinGame={joinGame}
            />
            <StatusMessage gameState={gameState} playerSymbol={playerSymbol} onPlayAgain={handlePlayAgain} />
            <Board gameState={gameState.board} onCellClick={handleCellClick} winningLine={gameState.winning_line} />
        </div>
    );
}

export default Game;
