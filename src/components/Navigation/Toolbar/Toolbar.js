import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NaviagtionItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) => (
    <header className = {classes.Toolbar}>
        <DrawerToggle clicked = {props.switched}/>
        {/* <div onClick = {props.switched}>MENU</div> */}
        {/* <div>LOGO</div> */}
        <div className = {classes.Logo}>
        <Logo/>
        </div>
        <nav className ={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);
export default toolbar;