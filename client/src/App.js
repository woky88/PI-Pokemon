import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Page404 from './components/404 page/Page404.jsx';
import PokemonCreate from './components/PokemonCreate/PokemonCreate.jsx';
import Details from './components/Details/Details.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path='/pokemons' component={PokemonCreate} />
          <Route exact path="/home/:id" component={Details} />
          <Route path='/public' />
          <Route exact strict path="*" component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
