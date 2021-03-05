import React from "react";
import { useSelector } from "react-redux";
import { trackerSelectors } from "../../store/tracker";
import Tracker from "./Tracker";

const TrackerList = () => {
    const data = useSelector(trackerSelectors.getTrackers);

    return (<>
        {data.map(tracker => <Tracker
            key={tracker.id}
            name={tracker.name}
            ss={tracker.ss}
            isRun={tracker.isRun}
        />)}
    </>);
}

export default TrackerList;