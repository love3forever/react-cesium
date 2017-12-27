import Cesium from 'cesium/Cesium'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {initCesiumStart,initCesiumConfig,initCesiumLayer,initCesiumComplete} from './actions/cesiumInit'
import 'cesium/Widgets/widgets.css'

class CesiumComponent extends Component {

    static propTypes = {
        initConfig:PropTypes.object
    }

    handleCesiumConfigUpdate = (viewer,option) => {
        viewer.options = option
    }

    init = () => {
        const {cesium,dispatch} = this.props
        dispatch(initCesiumStart())
        let config = dispatch(initCesiumConfig())
        console.log(config)
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
    const {cesium={}} = state
    return cesium
}

export default connect(mapStateToProps)(CesiumComponent)