import React from 'react'
import { Provider } from 'react-redux'
import ContactForm from './forms/ContactForm/ContactForm'
import store from './store/store'

const App = () => {
  return (
   <Provider store={store}>
    <ContactForm />
   </Provider>
  )
}

export default App