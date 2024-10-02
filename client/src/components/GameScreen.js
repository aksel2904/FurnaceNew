import React from 'react';
import { useState, useEffect } from 'react';
import '../App.css';
import {CardsGrid} from './CardsAuctionRender'
// компонента управляющая рендерингом игры
function GameScreen({ sessionId, socket }) {
    const [playerCards, setPlayerCards] = useState([]);
    const [upsideDownState, setUpsideDownState] = useState([]);
    useEffect(() => {
        socket.on('update player cards', (cards, states) => {
            setPlayerCards(cards);
            setUpsideDownState(states);
        });

        return () => {
            socket.off('update player cards');
        };
    }, []);

    return (
        <>
            <p id="game-id-created">Game ID: {sessionId}</p>
            <div className="hand">
                <CardsGrid cards={playerCards} states={upsideDownState} />
            </div>

        </>
    );
}

export default GameScreen;
