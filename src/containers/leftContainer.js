import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'

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

class LeftContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {open:false}
    }

    handleToggle = () => this.setState({open:!this.state.open})

    render() {
        return (
            <div style={style.div}>
                <div style={style.div}>
                    <Paper id="left-menu" style={style.paper}>
                        <Menu autoWidth={false} style={style.menu} menuItemStyle={style.menulist}>
                            <MenuItem style={style.item} innerDivStyle={style.menulist} onClick={this.handleToggle}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                            <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                        </Menu>
                    </Paper>
                </div>
                <Drawer open={this.state.open}>
                    <AppBar title="AppBar" iconElementRight={<IconButton onClick={this.handleToggle}><NavigationClose /></IconButton>}/>
                    <MenuItem>Menu Item</MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default LeftContainer;