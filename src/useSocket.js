import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io.connect(process.env.REACT_APP_SOCKET_URL, {
            transports: ['websocket', 'polling', 'flashsocket']
        });
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return socket;
};

export default useSocket;
