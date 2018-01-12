import React, { Component } from 'react'
import {connect} from 'react-redux'
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import Paper from 'material-ui/Paper'
import LeftMenu from '../components/leftMenu'
import Left from './leftContainer'

import {initImageryProviders,initTerrainProviders} from '../cesiumCommon/initProviders'
import {addImageryProvider,removeImageryProvider} from '../actions/layerContainer'
import {addTerrainProvider,removeTerrainProvider} from '../actions/terrainContainer'

import {getAllStationInfo} from '../actions/apis'

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

const bingKey = 'AnFQp5vgNIyQ1nLbp463VCuKs18gxbdjVaVNb2pdqiSpidyxLJzM-XmnM2qJ6Xqm'

const bing = new Cesium.BingMapsImageryProvider({url: 'https://dev.virtualearth.net', key: bingKey, mapStyle: Cesium.BingMapsStyle.AERIAL});

const initConfig = {
    animation: false,
    timeline: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    infoBox: true,
    selectionIndicator: true,
    clock: null,
}

class BaseComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            viewerLoaded:false
        }
    }

    componentDidMount(){
        // 初始化viewer对象
        let viewer = new Cesium.Viewer('cesium',initConfig)
        this.viewer = viewer
        this.setState({
            viewerLoaded:true
        })
        // 初始化providers
        let imageryProviders = initImageryProviders()
        let imageryProvidersList = imageryProviders.map(provider=>{
            let {id,name,thumbnail} = provider
            return {id,name,thumbnail}    
        })
        this.imageryProviders = imageryProviders
        this.imageryProvidersList = imageryProvidersList

        let terrainProviders = initTerrainProviders()
        let terrainProviderList = terrainProviders.map(provider=>{
            let {id,name,thumbnail} = provider
            return {id,name,thumbnail}
        })
        this.terrainProviderList = terrainProviderList
        this.terrainProviders = terrainProviders

        this.selectedImagerys = {}
        this.selectedTerrains = {}

        this.defaultTerrain = new Cesium.EllipsoidTerrainProvider()

        getAllStationInfo()
            .then((response)=>{
                console.log(response)
                let stationData = response.data.result
                stationData.forEach(station=>{
                    let stationEntity = {
                        id: station.STCD,
                        name: station.NM,
                        position : Cesium.Cartesian3.fromDegrees(station.LGTD, station.LTTD),
                        point : {
                            pixelSize : 5,
                            scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 300000)
                        }
                    }
                    this.viewer.entities.add(stationEntity)
                })
            })
            .catch(err=>{
                console.log(err)
            })
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps')
        this.handleImagerySelectedChange(nextProps)
        this.handleTerrainSelectedChange(nextProps)
    }
    
    // 影像图层添加或移除
    handleImagerySelectedChange = (props) => {
        const {dispatch, imagerySelected} = props
        this.imageryProviders.forEach(
            provider => {
                if (imagerySelected.indexOf(provider.id)===-1 && provider.selected) {
                    console.log('remove layer provider:',provider.id)
                    this.viewer.imageryLayers.remove(this.selectedImagerys[provider.id],false)
                    provider.selected = false
                    dispatch(removeImageryProvider(provider.name))
                }

                if (imagerySelected.indexOf(provider.id)!==-1 && !provider.selected) {
                    let targetLayer = this.selectedImagerys[provider.id]
                    if (targetLayer) {
                        this.viewer.imageryLayers.add(targetLayer)
                    }else{
                        targetLayer = this.viewer.imageryLayers.addImageryProvider(provider.provider)
                        this.selectedImagerys[provider.id] = targetLayer
                        console.log('add layer provider:',provider.id)
                    }
                    provider.selected = true
                    dispatch(addImageryProvider(provider.name))
                }
            }
        )
    }

    handleTerrainSelectedChange = (props) => {
        const {terrainSelected,dispatch} = props
        this.terrainProviders.forEach(
            provider => {
                if (terrainSelected.indexOf(provider.id)===-1 && provider.selected) {
                    console.log('remove terrain provider:',provider.id)
                    this.viewer.terrainProvider = this.defaultTerrain
                    provider.selected = false
                    dispatch(removeTerrainProvider(provider.name))
                }

                if (terrainSelected.indexOf(provider.id)!==-1 && !provider.selected) {
                    console.log('add terrain provider')
                    let targetLayer = this.selectedImagerys[provider.id]
                    this.viewer.terrainProvider = provider.provider
                    provider.selected = true
                    dispatch(addTerrainProvider(provider.name))
                }
            }
        )
    }
    
    
    render() {
        return (
            <div id="cesium-container">
                <Paper style={style.leftPaper}>
                    {
                        this.state.viewerLoaded &&
                        <Left
                            imageryProvidersList={this.imageryProvidersList}
                            terrainProviderList={this.terrainProviderList}>
                        </Left>
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

const mapStateToProps = (state, ownProps) => {
    const {imagerySelected=[]} = state.imageLayer
    const {terrainSelected=[]} = state.terrainLayer
    return {
        imagerySelected,
        terrainSelected
    }
}


export default connect(mapStateToProps)(BaseComponent)