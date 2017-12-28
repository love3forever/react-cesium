import React, { Component } from 'react'
import {connect} from 'react-redux'
import {initCesiumStart, initCesiumConfig, initCesiumLayer, initCesiumComplete} from '../actions/cesiumInit'

import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

class CesiumComponent extends Component {
    init = () => {
        const {cesium,dispatch} = this.props
        dispatch(initCesiumStart())
        let config = dispatch(initCesiumConfig())
        let viewer = new Cesium.Viewer('cesium',config.config)
        dispatch(initCesiumComplete(viewer))
    }

    componentDidMount() {
        this.init()
    } 

    render() {
        return (
            <div id="cesium">
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        cesium = {}
    } = state
    return cesium
}

export default connect(mapStateToProps)(CesiumComponent)