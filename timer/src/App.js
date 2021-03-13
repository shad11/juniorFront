import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { trackerOperations } from "./store/tracker";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import TrackerList from "./components/TrackerList";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('beforeunload', () => (dispatch(trackerOperations.saveToLS())));

    return () => window.removeEventListener('beforeunload', () => (dispatch(trackerOperations.saveToLS())));
  }, []);

  return <>
    <Header />
    <AddForm />
    <TrackerList />
  </>;
}

export default App;
