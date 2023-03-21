import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route path="/game" render={ (props) => <Game { ...props } /> } />
      <Route path="/settings" render={ (props) => <Settings { ...props } /> } />
      <Route path="/feedback" render={ (props) => <Feedback { ...props } /> } />
      <Route path="/ranking" render={ (props) => <Ranking { ...props } /> } />
    </Switch>
  );
}
