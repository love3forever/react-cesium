import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'

const style = {
    div: {
        height:'100%'
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
        height:40
    },
    icon: {
        width: '100%',
        padding: 0
    }
}

const LeftMenu = () => (
    <div style={style.div}>
        <Paper id="left-menu" style={style.paper}>
            <Menu autoWidth={false} style={style.menu} menuItemStyle={style.menulist}>
                <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
                <MenuItem style={style.item} innerDivStyle={style.menulist}><RemoveRedEye style={style.icon}/></MenuItem>
            </Menu>
        </Paper>
    </div>
)

export default LeftMenu