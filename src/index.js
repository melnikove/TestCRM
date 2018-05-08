import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';

import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import Header from './Header';
import Person from './Person/Person';
import Deal from './Deal/Deal';
import Home from './Home/Home';

import reducer from './reducers';

const history=createHistory();

const middleware=routerMiddleware(history);
 
const store=createStore(reducer,
                        composeWithDevTools(applyMiddleware(middleware)));


ReactDOM.render(<MuiThemeProvider>
	            	<Provider store={store}>
						<ConnectedRouter history={history}>
							<div>
								<Route exact path="/" render={(props)=>(
									<div>
										<Header/>
										<Home/>
									</div>)}/>
								<Route exact path="/deal" render={(props)=>(
									<div>
										<Header/>
										<Deal/>
									</div>)}/>
								<Route exact path="/person" render={(props)=>(
									<div>
										<Header/>
										<Person fromRoute={true}/>
									</div>)}/>
							</div>
	            		</ConnectedRouter>
	            	</Provider>
	            </MuiThemeProvider>   , 
	            document.getElementById('root'));
/*ReactDOM.render(<MuiThemeProvider>
	                <div>
	             		<Header/>
	             		<Home/>
	             	</div>
	            </MuiThemeProvider>, 
	            document.getElementById('root'));
*/
registerServiceWorker();

//const location = history.location;

/*history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  console.log(`The last navigation action was ${action}`)
});*/

//location.push("/person", {some:"person"});
