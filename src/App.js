import './App.css';
import { Redirect } from 'react-router';
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage";
import WishList from "./components/WishList";

function App() {
  return (
      <div className="App">
          <Route path='/' render={() => <Redirect to="/mainPage"/>}/>
          <Route path='/mainPage' render={() => <MainPage/>}/>
          <Route path='/wishList' render={() => <WishList/>}/>
      </div>
  );
}

export default App;
