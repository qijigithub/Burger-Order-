import React , {Component} from 'react';
import Auxiliary from '../auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout  extends Component {
state = {
    showSideDrawer : false  
}
sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer:false})
}
sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer:true})
}
toggleSideDrawerHandler = () => {

    this.setState((prevState) =>{ return {showSideDrawer: !prevState.showSideDrawer}})
}
render () {
    return (
        <Auxiliary>
        <Toolbar switched= {this.toggleSideDrawerHandler } />
        <SideDrawer open = {this.state.showSideDrawer} closed ={this.sideDrawerCloseHandler}/>
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <main className = {classes.Content}>
            {this.props.children}
        </main>
    </Auxiliary>
    ) }
}

export default Layout; 