import React, { useEffect, useState, useRef  } from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "../../store/tracker";

const Tracker = ({ id, name, period: initialPeriod, active}) => {
    const [period, setPeriod] = useState(initialPeriod);
    const [isActive, setIsActive] = useState(active);
    const timer = useRef(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isActive) {
            periodChange(period);
        }

        return () => clearTimeout(timer.current);
    }, []);

    const periodChange = (oldPeriod) => {
        timer.current = setTimeout(() => {
            periodChange(oldPeriod + 1000);
            dispatch(trackerOperations.changePeriod(id, oldPeriod + 1000));
        }, 1000);

        setPeriod(oldPeriod);
    }

    const stop = () => {
        clearTimeout(timer.current);
        dispatch(trackerOperations.changeIsActive(id, false));
        setIsActive(false);
    };

    const start = () => {
        periodChange(period);
        dispatch(trackerOperations.changeIsActive(id, true));
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

export default Tracker;