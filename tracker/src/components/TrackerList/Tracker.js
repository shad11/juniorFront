import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "../../store/tracker";
import { formatPeriod } from "../../utils/date";
import PLAY_CIRCLE from "../../assets/play_circle.svg";
import PAUSE_CIRCLE from "../../assets/pause_circle.svg";
import REMOVE_CIRCLE from "../../assets/remove_circle.svg";

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
    };

    const stop = useCallback(() => {
        clearTimeout(timer.current);
        dispatch(trackerOperations.changeIsActive(id, false));
        setIsActive(false);
    }, []);

    const start = () => {
        periodChange(period);
        dispatch(trackerOperations.changeIsActive(id, true));
        setIsActive(true);
    };

    const removeTracker = useCallback(trackerId => {
        dispatch(trackerOperations.removeTracker(trackerId));
    }, []);

    return (
        <div className={`tracker ${isActive ? 'active' : ''}`}>
            <div className='tracker__name'>
                {name}
            </div>
            <div className='tracker__period'>
                <div className='tracker__time'>{formatPeriod(period)}</div>
                <button className='tracker__btn'
                    onClick={() => { isActive ? stop() : start() }}
                >
                    {isActive
                        ? <img src={PAUSE_CIRCLE} alt='' />
                        : <img src={PLAY_CIRCLE} alt='' />
                    }
                </button>
                <button className='tracker__btn'
                    onClick={() => {removeTracker(id)}}
                >
                    <img src={REMOVE_CIRCLE} alt='' />
                </button>
            </div>
        </div>
    )
};

export default Tracker;