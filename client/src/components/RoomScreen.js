import React from 'react';
import '../App.css';
// компонента для рендеринга начального экрана для разбияения по комнатам
function RoomScreen({ socket, roomId, setRoomId, handleCreateSession, handleJoinSession }) {
    return (
        <>
            <header  className="App-header">
                <h1>Furnace</h1>
            </header>
            <p>Create new Game</p>
            <button onClick={handleCreateSession}>New Game</button>

            <p>Or Enter Game ID to join:</p>
            <div className="input-container">
                <input
                    id="input-game-id"
                    type="text"
                    placeholder="Game ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                />
                <button onClick={handleJoinSession}>Join Game</button>
            </div>
        </>
    );
}

export default RoomScreen;