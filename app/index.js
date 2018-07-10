import React from 'react';
import { render } from 'react-dom';
import Game from './components/Game';
import './app.global.css';

render(
   <Game/>
  ,
  document.getElementById('root')
);