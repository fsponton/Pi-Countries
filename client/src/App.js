import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route } from "react-router-dom";
import Main from './components/Main';
import Nav from './components/Nav'
import CountryDetail from './components/CountryDetail'
import ActivityForm from './components/ActivityForm';
import Paging from './components/Paging'
import ActivityFormMultiple from './components/ActivityFormMultiple'

function App() {
  return (
    <div className="container APP" >
      <h1>App Country Finder</h1>
      <div className='row top'>
        <div className='left col-12 col-sm-12 col-md-3 col-lg-3'>
          <Route exact path="/" component={Nav} />
        </div >
        <div className='right col-12 col-sm-12 col-md-9 col-lg-9'>
          <Route exact path="/" component={Main} />
          <Route exact path="/" component={Paging} />
        </div>
      </div >
      <Route exact path="/countries/:id" component={CountryDetail} />
      <Route exact path="/addActivity" component={ActivityForm} />
      <Route exact path="/createMultipleActivity" component={ActivityFormMultiple} />
    </div >
  );
}



export default App;
