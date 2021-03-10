import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "./store/tracker";
import AddForm from "./components/AddForm";
import TrackerList from "./components/TrackerList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trackerOperations.getTrackers());
    window.addEventListener('beforeunload', () => (dispatch(trackerOperations.saveToLS())));
    

    return () => window.removeEventListener('beforeunload', () => (dispatch(trackerOperations.saveToLS())));
  }, []);

  return <>
    <AddForm />
    <TrackerList />
  </>;
}

export default App;