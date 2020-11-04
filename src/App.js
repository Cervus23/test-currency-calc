import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
import Navigation from './components/Navigation/index'
import './App.css';

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
      </div>
    </Provider>
  );
}

export default App;
