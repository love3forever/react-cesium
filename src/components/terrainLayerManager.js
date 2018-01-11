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

import {selectedTerrainsChanged} from '../actions/terrainContainer'
 
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
            open: false
        }
    }

    initTerrainSelector = (providers) => {
        console.log('terrain init')
        let selectors = []
        for (let index = 0; index < providers.length; index++) {
            const element = providers[index];
            const selector = (
                <ListItem
                    primaryText={element.name}
                    leftIcon=
                    {<Avatar style={style.avatar}
                        size={60}
                        src={element.thumbnail}
                    />}
                    key={element.id}
                    onClick={this.selectTerrainProviderById(element.id)}>
                </ListItem>
            )
            selectors.push(selector)
        }
        return selectors
    }

    selectTerrainProviderById = id => () => {
        let selectedTerrain = this.props.terrainSelected
        if (selectedTerrain.indexOf(id)===-1) {
            selectedTerrain.push(id)
        }else{
            selectedTerrain = selectedTerrain.filter(i=>i!==id)
        }

        const {dispatch} = this.props
        dispatch(selectedTerrainsChanged(selectedTerrain))
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
                        {this.props.terrainProviderList.length && this.initTerrainSelector(this.props.terrainProviderList)}
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
        terrainSelected = [],
    } = state.terrainLayer
    return {terrainSelected}
}

export default connect(mapStateToProps)(TerrainLayerManager)