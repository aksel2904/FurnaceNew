import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import RoomScreen from './components/RoomScreen';
import GameScreen from './components/GameScreen';

const socket = io('http://localhost:3001');
// главная компонента
function App() {
  const [sessionId, setSessionId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [inGame, setInGame] = useState(false);
  useEffect(() => {
    socket.on('session created', (data) => {
      setSessionId(data.gameId);
      setInGame(true);
      alert(`Session created! Share this ID with your friends: ${data.gameId}`);
    });

    socket.on('session joined', (data) => {
      setInGame(true);
      setSessionId(data.gameId);
      alert(`Joined session: ${data.gameId}`);
    });

    socket.on('start game', () => {
      alert('The game is starting!');
    });

    socket.on('error', (data) => {
      alert(data.message);
    });

    return () => {
      socket.off('session created');
      socket.off('session joined');
      socket.off('start game');
      socket.off('error');
    };
  }, []);

  return (
      <div className="App">
        <main className="App-main">
          {!inGame ? (
              <RoomScreen
                  socket={socket}
                  setRoomId={setRoomId}
                  roomId={roomId}
                  handleCreateSession={() => socket.emit('create session')}
                  handleJoinSession={() => socket.emit('join session', roomId)}
              />
          ) : (
              <GameScreen sessionId={sessionId || roomId} socket={socket} />
          )}
        </main>
      </div>
  );
}

export default App;
