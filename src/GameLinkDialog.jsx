import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const GameLinkDialog = ({ open, gameId, onClose, onJoinGame }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share Game Link</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Share this link with a friend to start playing:
                    <br />
                    <a href={`${process.env.REACT_APP_FRONTEND_URL}/?game_id=${gameId}`}>
                        {`${process.env.REACT_APP_FRONTEND_URL}/?game_id=${gameId}`}
                    </a>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_FRONTEND_URL}/?game_id=${gameId}`)}>
                    Copy Link
                </Button>
                <Button onClick={onJoinGame} color="primary">
                    Join Game
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameLinkDialog;
