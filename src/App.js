import './App.css';
import { Redirect } from 'react-router';
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage";

function App() {
  return (
      <div className="App">
          <Route path='/' render={() => <Redirect to="/mainPage"/>}/>
          <Route path='/mainPage' render={() => <MainPage/>}/>
      </div>
  );
}

export default App;
