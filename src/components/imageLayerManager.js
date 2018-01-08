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
            layerProviders:props.layerProviders
        }
    }

    static propTypes = {
        layerProviders: PropTypes.array,
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

        return providerContainer
    }

    initLayerSelector = (providers) => {
        console.log('init image provider')
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
        const {layerProviders} = this.state
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

            console.log(viewer.imageryLayers.length)
        });
    }

    componentDidMount() {
        const {dispatch,layerProviders} = this.props
        if (!layerProviders.length) {
            let container = this.initLayerContainer()
            dispatch(initLayerProviderAction(container))
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps!=this.props) {
            console.log(nextProps)
            this.setState({
                layerProviders:nextProps.layerProviders
            })
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
                        {this.state.layerProviders && this.initLayerSelector(this.state.layerProviders)}
                    </List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {layerProviders=[],selectedProviders=[],layers=new Set()} = state
    return {
        layerProviders,
        selectedProviders,
        layers
    }
}

export default connect(mapStateToProps)(ImageLayerManager)