import React from 'react'
import App from './App'
import ReactDOM from 'react-dom'
import reducer from './reducers/Reducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from  'redux-devtools-extension'
import './index.css'

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
