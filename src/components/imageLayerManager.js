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

import {initLayerProviderAction,selectLayerProvider,removeLayerProvider,addLayer,removeLayer} from '../actions/layerContainer'

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
            open:false,
        }
    }

    initLayerContainer = () => {
        let providerContainer = []
        let ArcGisMapServerImageryProvider = new Map()
        ArcGisMapServerImageryProvider.set('id',0)
        ArcGisMapServerImageryProvider.set('name','ArcGIS World Street Maps')
        const arggisProvider = new Cesium.ArcGisMapServerImageryProvider({
            url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        })
        ArcGisMapServerImageryProvider.set('provider',arggisProvider)
        ArcGisMapServerImageryProvider.set('selected',false)
        ArcGisMapServerImageryProvider.set('thumbnail','Widgets/Images/ImageryProviders/esriWorldImagery.png')
        providerContainer.push(ArcGisMapServerImageryProvider)

        let BingMapsImageryProvider = new Map()
        BingMapsImageryProvider.set('id',1)
        BingMapsImageryProvider.set('name','Bing Maps Road')
        const bingProvider = new Cesium.BingMapsImageryProvider({
            url : 'https://dev.virtualearth.net',
            mapStyle: Cesium.BingMapsStyle.ROAD
        })
        BingMapsImageryProvider.set('provider',bingProvider)
        BingMapsImageryProvider.set('selected',false)
        BingMapsImageryProvider.set('thumbnail','Widgets/Images/ImageryProviders/bingRoads.png')
        providerContainer.push(BingMapsImageryProvider)

        let BlueMarbleProvider = new Map()
        BlueMarbleProvider.set('id',2)
        BlueMarbleProvider.set('selected',false)
        const blueMarbleUrl = 'http://192.168.2.157:5000/tiles/L16'
        const blueMarble = new Cesium.createTileMapServiceImageryProvider({
            url:blueMarbleUrl
        })
        BlueMarbleProvider.set('provider',blueMarble)
        BlueMarbleProvider.set('name','Blue Marble')
        BlueMarbleProvider.set('thumbnail','Widgets/Images/ImageryProviders/bingRoads.png')
        providerContainer.push(BlueMarbleProvider)

        let TerrainProvider = new Map()
        TerrainProvider.set('id',3)
        TerrainProvider.set('selected',false)
        const terrainUrl = 'http://192.168.2.157/terrain_tile'
        const terrain = new Cesium.CesiumTerrainProvider({
            url:terrainUrl
        })
        TerrainProvider.set('provider',terrain)
        TerrainProvider.set('thumbnail','Widgets/Images/ImageryProviders/bingRoads.png')
        TerrainProvider.set('name','Terrain')
        providerContainer.push(TerrainProvider)

        return providerContainer
    }

    initLayerSelector = (providers) => {
        let selectors = []
        for (let index = 0; index < providers.length; index++) {
            const element = providers[index];
            const selector = (
                <ListItem 
                    primaryText = {element.get('name')} 
                    leftIcon = 
                        {
                            <Avatar style={style.avatar} 
                                size={60} 
                                src = {element.get('thumbnail')}
                            />
                        }
                    key = {element.get('id')}
                    onClick = {this.selectLayerProviderById(element.get('id'))}
                >   
                </ListItem>
            )
            selectors.push(selector)
        }
        return selectors
    }

    selectLayerProviderById = id => () => {
        const viewer = this.state.viewer
        const {layerProviders} = this.props
        const targetProvider = layerProviders.filter(provider=>provider.get('id')===id)
        targetProvider.forEach(provider => {
            if (!provider.get('selected')) {
                const layer = viewer.imageryLayers.addImageryProvider(provider.get('provider'))
                const {dispatch} = this.props
                dispatch(selectLayerProvider(id))
                const layerMap = new Map()
                layerMap.set('id',id)
                layerMap.set('layer',layer)
                dispatch(addLayer(layerMap))
            }
            else{
                const {dispatch,layers} = this.props
                dispatch(removeLayerProvider(id))
                layers.forEach(layer=>{
                    if (layer.get('id')===id) {
                        viewer.imageryLayers.remove(layer.get('layer'),false)
                        dispatch(removeLayer(id)) 
                    }
                })
                
            }
        });
    }

    componentDidMount() {
        const {dispatch,layerProviders} = this.props
        if (!layerProviders.length) {
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
                        {this.props.layerProviders.length && this.initLayerSelector(this.props.layerProviders)}
                    </List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {layerProviders=[],layers=new Set()} = state.imageLayer
    return {
        layerProviders,
        layers
    }
}

export default connect(mapStateToProps)(ImageLayerManager)