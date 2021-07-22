import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/Reducer'
import { BrowserRouter as Router } from 'react-router-dom'

import { composeWithDevTools } from  'redux-devtools-extension'

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)
