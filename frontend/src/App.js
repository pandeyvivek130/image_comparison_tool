import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import {useDispatch} from 'react-redux';
import { restart } from './actions/restartActions.js';

function App() {
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(restart());
};
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">Image Comparison Tool</Link>
          </div>
          <div>
          <button className="primary" onClick={submitHandler}>Restart</button>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
