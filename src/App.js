import './App.css';
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage";
import WishList from "./components/WishList";

function App() {
  return (
      <div className="App">
          <Route exact path='/' component={MainPage}/>
          <Route path='/mainPage' component={MainPage}/>
          <Route path='/wishList' component={WishList}/>
      </div>
  );
}

export default App;
