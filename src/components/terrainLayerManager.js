import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'

import Cesium from 'cesium/Cesium'

import {initTerrainContainer,addTerrainLayer,removeTerrainLayer} from '../actions/terrainContainer'
 
const style = {
    avatar: {
        borderRadius: 0
    }
}

const bingKey = 'AnFQp5vgNIyQ1nLbp463VCuKs18gxbdjVaVNb2pdqiSpidyxLJzM-XmnM2qJ6Xqm'

class TerrainLayerManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewer: props.viewer,
            open: false
        }
    }

    initTerrainContainer = () => {
        let providerContainer = []

        let TerrainProvider = new Map()
        TerrainProvider.set('id', 0)
        TerrainProvider.set('selected', false)
        const terrainUrl = 'http://192.168.2.157/t'
        const terrain = new Cesium.CesiumTerrainProvider({url: terrainUrl})
        TerrainProvider.set('provider', terrain)
        TerrainProvider.set('thumbnail', 'Widgets/Images/ImageryProviders/bingRoads.png')
        TerrainProvider.set('name', 'Terrain')
        providerContainer.push(TerrainProvider)

        return providerContainer
    }

    initTerrainSelector = (providers) => {
        let selectors = []
        for (let index = 0; index < providers.length; index++) {
            const element = providers[index];
            const selector = (
                <ListItem
                    primaryText={element.get('name')}
                    leftIcon=
                    {<Avatar style={style.avatar}
                        size={60}
                        src={element.get('thumbnail')}
                    />}
                    key={element.get('id')}
                    onClick={this.selectTerrainProviderById(element.get('id'))}>
                </ListItem>
            )
            selectors.push(selector)
        }
        return selectors
    }

    selectTerrainProviderById = id => () => {
        const viewer = this.state.viewer
        const {terrainProviders,dispatch} = this.props
        const targetProvider = terrainProviders.filter(provider => provider.get('id') === id)
        targetProvider.forEach(provider => {
            if (!provider.get('selected')) {
                viewer.terrainProvider = provider.get('provider')
                dispatch(addTerrainLayer(id))
            } else {
                viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider()
                dispatch(removeTerrainLayer(id))
            }
        });
    }

    componentDidMount() {
        const {dispatch, terrainProviders} = this.props
        if (!terrainProviders.length) {
            let container = this.initTerrainContainer()
            dispatch(initTerrainContainer(container))
        }
    }

    componentWillUpdate(nextProps, nextState) {
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    render() {
        const actions = [
            < FlatButton 
                label = "Cancel" 
                primary = {true}
                onClick = {this.handleClose}
            />, 
            <FlatButton 
                label = "Submit" 
                primary = {true}
                keyboardFocused = {true}
                onClick = {this.handleClose} 
            />
        ];

        return (
            <div>
                <MenuItem onClick={this.handleOpen}>地形图层</MenuItem>
                <Dialog
                    title="地形图层管理"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <Subheader>可选图层</Subheader>
                    <List>
                        {this.props.terrainProviders.length && this.initTerrainSelector(this.props.terrainProviders)}
                    </List>
                    <Subheader>自定义图层</Subheader>
                    <List></List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        terrainProviders = [],
        terrainLayers = new Set()
    } = state.terrainLayer
    return {terrainProviders, terrainLayers}
}

export default connect(mapStateToProps)(TerrainLayerManager)