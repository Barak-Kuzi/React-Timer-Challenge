import React from "react";

import Player from "./Player";
import TimerChallenge from "./TimerChallenge";

export default function AppContainer(): React.JSX.Element {
    return (
        <div id="content">
            <header>
                <h1>The <em>Almost</em> Final Countdown</h1>
                <p>Stop the timer once you estimate that time is (almost) up</p>
            </header>
            <Player />
            <div id="challenges">
                <TimerChallenge title={"EASY"} targetTime={1}/>
                <TimerChallenge title={"NOT EASY"} targetTime={5}/>
                <TimerChallenge title={"GETTING TOUGH"} targetTime={10}/>
                <TimerChallenge title={"PROS ONLY"} targetTime={15}/>
            </div>
        </div>
    );
}