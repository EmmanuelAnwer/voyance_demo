import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'

import App from './App.tsx'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store}>
    <App />
  </Provider>,
)
