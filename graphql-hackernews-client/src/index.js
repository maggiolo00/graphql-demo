import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import 'semantic-ui-css/semantic.min.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import ApolloClient, {createNetworkInterface, addTypename} from 'apollo-client';
import {browserHistory} from 'react-router';
import userReducer from './reducers/userReducers';

let history = browserHistory;

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/graphql'),
  queryTransformer: addTypename,
})


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

const store = createStore(
  combineReducers({
    currentUser: userReducer,
    apollo: client.reducer(),
  }),
  {currentUser: currentUser}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);


store.subscribe(()=> {
  localStorage.setItem("currentUser", JSON.stringify(store.getState().currentUser));
})
const AppContainer = () => (
  <MuiThemeProvider>
    <App history={ history} store={ store } client={client}/>
  </MuiThemeProvider>
)
ReactDOM.render(
  <AppContainer/>,
  document.getElementById('root')
);
