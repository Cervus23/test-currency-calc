import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
import Header from './components/Header'
import './App.css';

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
      </div>
    </Provider>
  );
}

export default App;
