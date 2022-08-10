import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import Page404 from './components/404 page/Page404.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact strict path="/" component={LandingPage} />
          <Route exact strict path="/home" component={Home} />
          <Route exact strict path="*" component={Page404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
