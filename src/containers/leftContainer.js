import React, { Component } from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import TopCard from '../components/cards'
import Snackbar from 'material-ui/Snackbar'
import ReactEcharts from 'echarts-for-react'

import Cesium from 'cesium/Cesium'

import {addEntityToCesium} from '../actions/cesiumInit'

const style = {
    div: {
        height: '100%'
    },
    paper: {
        display: 'inline-block',
        float: 'left',
        height: '100%'
    },
    menu: {
        width: '100%'
    },
    menulist: {
        width: '100%',
        padding: 0
    },
    item: {
        width: '100%',
        minHeight: 40,
        height: 40
    },
    icon: {
        width: '100%',
        padding: 0
    }
}

const option = {
    title: {
        text: '饼图程序调用高亮示例',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: [
                '50%', '60%'
            ],
            data: [
                {
                    value: 335,
                    name: '直接访问'
                }, {
                    value: 310,
                    name: '邮件营销'
                }, {
                    value: 234,
                    name: '联盟广告'
                }, {
                    value: 135,
                    name: '视频广告'
                }, {
                    value: 1548,
                    name: '搜索引擎'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}

const pointEntity = {
    position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
    point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW
    }
}

class LeftContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen:false,
            dialogOpen:false,
            cardOpen:false,
            snackbarOpen:false
        }
    }

    componentDidMount() {
        const {cesium} = this.props
        console.log(cesium)
    }
    

    handleDrawerToggle = () => this.setState({drawerOpen:!this.state.drawerOpen})

    handleOpen = () => {
        this.setState({dialogOpen: true});
    };

    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    handleCardToggle = () => this.setState({cardOpen:!this.state.cardOpen})

    handleClick = () => {
        this.setState({
            snackbarOpen: true,
        });
        // const {cesium,dispatch} = this.props
        // console.log(cesium)
        // dispatch(addEntityToCesium(cesium))
        const {cesium} = this.props
        cesium.instance.entities.add(pointEntity)
    };

    handleRequestClose = () => {
        this.setState({
        snackbarOpen: false,
        });
    };

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
            <div style={style.div}>
                <div style={style.div}>
                    <Paper id="left-menu" style={style.paper}>
                        <Menu autoWidth={false} style={style.menu} menuItemStyle={style.menulist}>
                            <MenuItem style={style.item} innerDivStyle={style.menulist} onClick={this.handleDrawerToggle}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist} onClick={this.handleOpen}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist} onClick={this.handleCardToggle}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist} onClick={this.handleClick}><RemoveRedEye style={style.icon}/></MenuItem>
                        </Menu>
                    </Paper>
                </div>
                {
                    this.state.cardOpen && <TopCard></TopCard> 
                }
                <Drawer open={this.state.drawerOpen}>
                    <AppBar title="AppBar" iconElementRight={<IconButton onClick={this.handleDrawerToggle}><NavigationClose /></IconButton>}/>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
                <Dialog
                    title="Dialog With Actions"
                    modal={false}
                    actions={actions}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                    >
                    <ReactEcharts
                        option={option}
                        style={{height: '300px', width: '100%'}}
                    />
                </Dialog>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message="Event added to your calendar"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        cesium: state.cesium
    }
}


export default connect(mapStateToProps)(LeftContainer);