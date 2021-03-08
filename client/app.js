import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import NavBar from './components/NavBar'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <CssBaseline>
        <NavBar />
        <Routes />
      </CssBaseline>
    </div>
  )
}

export default App
