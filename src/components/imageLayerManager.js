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
import {selectedImagerysChanged} from '../actions/layerContainer'

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
            open:false,
        }
    }

    initLayerSelector = (providers) => {
        console.log('image init')
        let selectors = []
        for (let index = 0; index < providers.length; index++) {
            const element = providers[index];
            const selector = (
                <ListItem 
                    primaryText = {element.name} 
                    leftIcon = 
                        {
                            <Avatar style={style.avatar} 
                                size={60} 
                                src = {element.thumbnail}
                            />
                        }
                    key = {element.id}
                    onClick = {this.selectLayerProviderById(element.id)}
                >   
                </ListItem>
            )
            selectors.push(selector)
        }
        return selectors
    }

    selectLayerProviderById = id => () => {
        let selectedImagery = this.props.imagerySelected
        if (selectedImagery.indexOf(id)===-1) {
            selectedImagery.push(id)
        }else{
            selectedImagery = selectedImagery.filter(i=>i!==id)
        }

        const {dispatch} = this.props
        dispatch(selectedImagerysChanged(selectedImagery))
    }

    componentDidMount() {
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
                        {this.props.imageryProvidersList.length && this.initLayerSelector(this.props.imageryProvidersList)}
                    </List>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {imagerySelected=[]} = state.imageLayer
    return {
        imagerySelected,
    }
}

export default connect(mapStateToProps)(ImageLayerManager)