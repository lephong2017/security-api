
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './redux/index';
import { Provider } from 'react-redux';
import  'babel-polyfill';
import thunk from 'redux-thunk';
const store = createStore(
    appReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
ReactDOM.render(
    <Provider store={store}>
        <App />    
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
