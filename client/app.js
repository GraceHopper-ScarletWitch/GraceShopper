import React from 'react'

import NavBar from './components/NavBar'
import Routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'

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
