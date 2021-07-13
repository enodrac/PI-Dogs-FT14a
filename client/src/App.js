import './App.css';
import {Route} from 'react-router-dom';
import Create from './components/create/Create';
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Detail from './components/detail/Detail';

function App() {
    return (
        <div className="App">
            <Route exact path="/">
                <Landing />
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
        </div>
    );
}

export default App;
