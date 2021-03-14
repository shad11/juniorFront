import React from "react";
import { useSelector } from "react-redux";
import { trackerSelectors } from "../../store/tracker";
import Tracker from "./Tracker";
import './Tracker.scss'

const TrackerList = () => {
    const data = useSelector(trackerSelectors.getTrackers);

    return (
        <div className='tracker-list'>
            {data.map(tracker => <Tracker
                key={tracker.id}
                {...tracker}
            />)}
        </div>
    );
}

export default TrackerList;