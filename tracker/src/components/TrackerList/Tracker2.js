import React, { useEffect, useState, useRef  } from "react";

const Tracker2 = ({ id, name, period: initialPeriod, active}) => {
    const [period, setPeriod] = useState(initialPeriod);
    const [isActive, setIsActive] = useState(active);
    const prevFuncToLS = useRef();
    const timer = useRef(0);

    useEffect(() => {
        if (isActive) {
            periodChange(period);
        }

        return () => clearTimeout(timer.current);
    }, []);

    useEffect(() => {
        window.removeEventListener('beforeunload', prevFuncToLS.current);
        prevFuncToLS.current = () => trackerToLS(period, isActive);

        window.addEventListener('beforeunload', prevFuncToLS.current);

        return () => {
            window.removeEventListener('beforeunload', prevFuncToLS.current);
        }
    }, [period, isActive]);

    const trackerToLS = (periodNew, activeNew) => {
        const arr = JSON.parse(localStorage.getItem('trackers'));
        const elem = {id, name, ss: periodNew, active: activeNew };

        if (arr) {
            const newArr = [...arr, elem];
            localStorage.setItem('trackers', JSON.stringify(newArr));
        } else {
            localStorage.setItem('trackers', JSON.stringify([elem]));
        }
    };

    const periodChange = (oldPeriod) => {
        timer.current = setTimeout(() => {
            periodChange(oldPeriod + 1000);
        }, 1000);

        setPeriod(oldPeriod);
    };

    const stop = () => {
        clearTimeout(timer.current);
        setIsActive(false);
    };

    const start = () => {
        periodChange(period);
        setIsActive(true);
    }

    return (
        <div>
            <span>{name}</span>
            <span>{period}</span>
            <button onClick={() => { isActive ? stop() : start() }}>{isActive ? 'Stop' : 'Start'}</button>
        </div>
    )
};

export default Tracker2;