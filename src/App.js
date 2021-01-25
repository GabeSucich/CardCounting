import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"

import 'semantic-ui-css/semantic.min.css'

import "./ApplicationStyle.css"

import { Button, Grid } from "semantic-ui-react"

import { GameProvider } from "./GlobalStates/GameState"
import { QuestionProvider } from "./GlobalStates/QuestionState"
import Game from "./Game"

function App() {


  return (
    <Router>
      <GameProvider>
        <QuestionProvider>
          <div className="background overflow">


            <Game numDecks={4} numPlayers={2} />
          </div>
        </QuestionProvider>
      </GameProvider>
    </Router>
  );
}

export default App;
