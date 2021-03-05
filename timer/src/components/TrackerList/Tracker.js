import React, { useEffect, useState, useRef  } from "react";

const Tracker = ({ name, ss, isRun}) => {
    const [timer, setTimer] = useState(null);
    const currSS = useRef(ss);

    useEffect(() => {
        if (isRun) {
            currSS.current += 1000;

            const newTimer = setInterval(() => {
                currSS.current += 1000;
            }, 1000);

            setTimer(newTimer);
        }
    }, []);

    const stop = () => {
        clearInterval(timer);
        setTimer(null);
        isRun = false;
    };

    const start = () => {
        currSS.current += 1000;
        isRun = true;

        const newTimer = setInterval(() => {
            currSS.current += 1000;
        }, 1000);

        setTimer(newTimer);
    }

    return (
        <div>
            <span>{name}</span>
            <span ref={currSS}>{currSS.current}</span>
            <button onClick={() => { isRun ? stop() : start() }}>{isRun ? 'Stop' : 'Start'}</button>
        </div>
    )
};

export default Tracker;