import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List,ListItem} from 'material-ui/List'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'

import Cesium from 'cesium/Cesium'

import {initLayerProviderAction} from '../actions/layerContainer'

const style = {
    avatar:{
        borderRadius:0
    }
}

const bingKey = 'AnFQp5vgNIyQ1nLbp463VCuKs18gxbdjVaVNb2pdqiSpidyxLJzM-XmnM2qJ6Xqm'



class ImageLayerManager extends Component {
    constructor(props){
        super(props)
        this.state = {
            viewer:props.viewer,
            open:false
        }
    }

    static propTypes = {
        layerProviders: PropTypes.object,
    }

    initLayerContainer = () => {
        let container = {
            'ArcGIS World Street Maps':new Cesium.ArcGisMapServerImageryProvider({
                url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            }),
            'Bing Maps Road':new Cesium.BingMapsImageryProvider({
                url : 'https://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.ROAD
            })
        }
        return container
    }


    componentDidMount() {
        console.log(this.state.viewer)
        const {dispatch,layerProviders} = this.props
        if (!layerProviders) {
            let container = this.initLayerContainer()
            dispatch(initLayerProviderAction(container))
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    selectImageLayer = (type) => {
        switch (type) {
            case 'BMA':
                return () => {
                    let provider = new Cesium.BingMapsImageryProvider({
                        url : 'https://dev.virtualearth.net',
                        mapStyle : Cesium.BingMapsStyle.AERIAL,
                        key:bingKey
                    })                    
                    this.state.viewer.imageryLayers.addImageryProvider(provider)
                }
            case 'BMAL':
                return () => {
                    let provider = new Cesium.BingMapsImageryProvider({
                        url : 'https://dev.virtualearth.net',
                        mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS,
                        key:bingKey
                    })
                    this.state.viewer.imageryLayers.addImageryProvider(provider)
                }
            default:
                break;
        }
    }
    
    

    render() {
         const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];


        return (
            <div>
                <MenuItem onClick={this.handleOpen}>影像图层</MenuItem>
                <Dialog
                    title="影像图层管理"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <Subheader>可选图层</Subheader>
                    <List>
                        <ListItem 
                            primaryText = "BingMaps 影像" 
                            leftIcon = {<Avatar style={style.avatar} size={60} src = "Widgets/Images/ImageryProviders/bingAerial.png"/>}
                            onClick={this.selectImageLayer("BMA")}
                        />
                        <ListItem 
                            primaryText="BingMaps影像(含标注)" 
                            leftIcon={<Avatar style={style.avatar} size={60} src = "Widgets/Images/ImageryProviders/bingAerialLabels.png"/>}
                            onClick={this.selectImageLayer('BMAL')}/>
                        <ListItem primaryText="Bing Maps Roads" leftIcon={<ContentSend/>} />
                        <ListItem primaryText="Mapbox Satellite" leftIcon={<ContentDrafts/>} />
                    </List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {layerProviders} = state
    return {
        layerProviders
    }
}

export default connect(mapStateToProps)(ImageLayerManager)