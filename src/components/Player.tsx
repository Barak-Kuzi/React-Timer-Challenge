import React, {useState, useRef, SetStateAction} from "react";

export default function Player(): React.JSX.Element {
    const [name, setName]: [string, React.Dispatch<SetStateAction<string>>]
        = useState("");

    const playerName: React.MutableRefObject<HTMLInputElement | null>
        = useRef(null);

    function handleClick(): void {
        if (playerName.current) {
            setName(playerName.current.value);
            playerName.current.value = '';
        }
    }

    return (
        <section id="player">
            <h2>Welcome {name !== "" ? name : 'unknown entry'}</h2>
            <p>
                <input type="text" ref={playerName} />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}