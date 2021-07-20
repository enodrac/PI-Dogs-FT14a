import './App.css';
import {Route} from 'react-router-dom';
import Create from './components/create/Create';
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Detail from './components/detail/Detail';
import Nav from './components/nav/Nav';
import Login from './components/login/Login';
import Favorites from './components/favorites/Favorites';

function App() {
    return (
        <div className="App">
            <Route path={['/home']}>
                <Nav />
            </Route>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/create">
                <Create />
            </Route>
            <Route path="/detail/:breeId">
                <Detail />
            </Route>
            <Route path="/favorites">
                <Favorites />
            </Route>
        </div>
    );
}

export default App;
