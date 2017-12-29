import React from 'react'
import {render} from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import BaseViewer  from './components/base'

import './style/index.css'

render(
    <MuiThemeProvider>
        <BaseViewer></BaseViewer>
    </MuiThemeProvider>,
    document.getElementById('root')
) 