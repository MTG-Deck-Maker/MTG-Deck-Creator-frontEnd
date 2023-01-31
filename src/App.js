import React from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import DeckCreator from './DeckCreator';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



class App extends React.Component {
  
  
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<DeckCreator />}
            >
            </Route>
            <Route
              exact path="/about"
              element={<About />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;