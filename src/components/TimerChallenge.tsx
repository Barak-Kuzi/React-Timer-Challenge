import React, {useState, useRef, SetStateAction, Fragment} from "react";

import ResultModal from "./ResultModal"

export interface TimerChallengeProps {
    title: string,
    targetTime: number
}

export default function TimerChallenge({title, targetTime}: TimerChallengeProps): React.JSX.Element {
    const timerId: React.MutableRefObject<ReturnType<typeof setInterval> | undefined> = useRef();
    const dialog: React.MutableRefObject<{open: () => void }| undefined> = useRef();

    const [timeRemaining, setTimeRemaining]: [number, React.Dispatch<SetStateAction<number>>] =
        useState(targetTime * 1000);

    const timerIsActive: boolean = (timeRemaining > 0) && (timeRemaining < targetTime * 1000);

    if (timeRemaining <= 0) {
        clearInterval(timerId.current);
        // dialog.current?.open();
        if (dialog.current) {
            dialog.current.open();
        }
    }

    function handleReset(): void {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStartClick(): void {
        timerId.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStopClick(): void {
        // dialog.current?.open();
        if (dialog.current) {
            dialog.current.open();
        }
        clearInterval(timerId.current);
    }

    return (
        <Fragment>
            <ResultModal ref={dialog} targetTime={targetTime} onReset={handleReset} remainingTime={timeRemaining} />
            <section className="challenge">
                <h2>{title}</h2>
                {timeRemaining <= 0 ? "You Lost!" : ""}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStopClick : handleStartClick}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? "Time is running.." : "Timer inactive"}
                </p>
            </section>
        </Fragment>
    );
}