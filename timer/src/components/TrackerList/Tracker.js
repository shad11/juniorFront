import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "../../store/tracker";
import { formatPeriod } from "../../utils/date";

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

    const periodChange = useCallback((oldPeriod) => {
        timer.current = setTimeout(() => {
            periodChange(oldPeriod + 1000);
            dispatch(trackerOperations.changePeriod(id, oldPeriod + 1000));
        }, 1000);

        setPeriod(oldPeriod);
    }, []);

    const stop = useCallback(() => {
        clearTimeout(timer.current);
        dispatch(trackerOperations.changeIsActive(id, false));
        setIsActive(false);
    }, []);

    const start = useCallback(() => {
        periodChange(period);
        dispatch(trackerOperations.changeIsActive(id, true));
        setIsActive(true);
    }, []);

    const removeTracker = useCallback(trackerId => {
        dispatch(trackerOperations.removeTracker(trackerId));
    }, []);

    return (
        <div>
            <span>{name}   </span>
            <span>{formatPeriod(period)}</span>
            <button onClick={() => { isActive ? stop() : start() }}>{isActive ? 'Stop' : 'Start'}</button>
            <button onClick={() => {removeTracker(id)}}>Remove</button>
        </div>
    )
};

export default Tracker;