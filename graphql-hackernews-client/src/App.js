import React, {Component, PropTypes} from 'react';
import {Router, Route} from 'react-router'
import {ApolloProvider} from 'react-apollo'
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import Post from './components/Post';
import './App.css';
import  injectTapEventPlugin  from "react-tap-event-plugin";

injectTapEventPlugin();

class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    client: PropTypes.object.isRequired
  }

  render() {
    const {history, client, store} = this.props

    return (
      <ApolloProvider store={store} client={client}>
        <div>
          <Router history={history}>
            <Route component={MainLayout}>
              <Route path="/" component={Home}/>
              <Route path="/posts/:postId" component={Post}/>
            </Route>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
