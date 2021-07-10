import './App.css';
import {Route} from 'react-router-dom';
import Dog from './components/Dog';
import Home from './components/Home';
import Index from './components/Index';
import Detail from './components/Detail';

function App() {
    return (
        <div className="App">
            <Route exact path="/">
                <Index />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/dogs">
                <Dog />
            </Route>
            <Route path="/detail/:breeId">
                <Detail />
            </Route>
        </div>
    );
}

export default App;
