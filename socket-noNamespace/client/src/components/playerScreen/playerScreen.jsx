import React from "react";
import "./playerScreen.css";
import CardList from "../cardlist";
import Controls from '../controls';
import GameMessage from '../gamemessage';

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function PlayerScreen(props) {
    return (
        <div className="container playerScreen">
            <h1>THIS IS THE PLAYERS SCREEN!!!!!!!!!!!!!</h1>

            {props.gameMsg ? (
                <GameMessage msg={props.gameMsg} resetClicked={props.resetGame} />
            ) : (
                    false
                )}

            <CardList
                cardDisplay="Player:"
                cardTotal={props.playerTotal}
                cardTotalAlt={props.playerTotalAlt}
                cards={props.playerCards}
            />
            <Controls
                bet={props.bet}
                chips={props.chips}
                isPlaying={props.isPlaying}
                makeBet={props.makeBet}
                dealClicked={props.dealClicked}
                hitClicked={props.hitClicked}
                stayClicked={props.stayClicked}
                clearBet={props.clearBet}
                playerID={props.playerID}
            />
        </div>
    );
}

export default PlayerScreen;