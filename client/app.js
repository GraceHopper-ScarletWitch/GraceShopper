import React from 'react'

import MenuBar from './components/MenuBar'
import Routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'

const App = () => {
  return (
    <div>
      <CssBaseline>
        <MenuBar />
        <Routes />
      </CssBaseline>
    </div>
  )
}

export default App
