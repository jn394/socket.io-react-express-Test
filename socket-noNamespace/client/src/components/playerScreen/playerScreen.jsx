import React from "react";
import "./playerScreen.css";
import CardList from "../cardlist";
import Controls from '../controls';

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function PlayerScreen(props) {
    return (
        <div className="container playerScreen">
            <h1>THIS IS THE PLAYERS SCREEN!!!!!!!!!!!!!</h1>
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
            />
        </div>
    );
}

export default PlayerScreen;