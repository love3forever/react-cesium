import React, { Component } from 'react'
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import Paper from 'material-ui/Paper'
import LeftMenu from './leftMenu'
import Left from '../containers/leftContainer'


const style = {
    leftPaper: {
        display: 'inline-block',
        float: 'left',
        width: '3%',
        height: '100%'
    },
    rightPaper: {
        display: 'inline-block',
        float: 'left',
        height: '100%',
        width: '97%'
    }
}

class BaseComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            viewerLoaded:false
        }
    }

    componentDidMount(){
        let viewer = new Cesium.Viewer('cesium')
        this.setState({
            viewer,
            viewerLoaded:true
        })
    }
    
    render() {
        return (
            <div id="cesium-container">
                <Paper style={style.leftPaper}>
                    {
                        this.state.viewerLoaded &&
                        <Left viewer={this.state.viewer}></Left>
                    }
                </Paper>
                <Paper style={style.rightPaper}>
                    <div id="cesium">
                    </div>
                </Paper>
            </div>
        );
    }
}

export default BaseComponent;