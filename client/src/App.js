import './App.css';
import {Switch, Route} from 'react-router-dom'
import Main from './components/Main';
import Create from './components/Create';
import ShowOne from './components/ShowOne';
import EditOne from './components/EditOne';

function App() {
  return (
    <div className="App">
      <Switch>
        
        <Route path={'/pets/create'}>
          <Create />
        </Route>
        
        <Route path={'/pets/:id/edit'}>
          <EditOne />
        </Route>
        
        <Route path={'/pets/:id'}>
          <ShowOne />
        </Route>

        <Route path={'/'}>
          <Main />
        </Route>


      </Switch>
    </div>
  );
}

export default App;
