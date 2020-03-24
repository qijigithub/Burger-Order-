import React from 'react'
import classes from '../BuildControls/BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
// import BurgerIngredient from '../Burgeringredient/Burgeringredient';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Meat', type:'meat'},
    {label:'Cheese', type:'cheese'},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {/* <p>   cheese   
        <button add = {(event) => this.props.add(event,)}>  +  </button>
        <input
           value = {props.ingredients}
        />
        <button>  -  </button>
        </p> */}
        {controls.map((ctrl => (
            <BuildControl 
            disable =  {props.disable[ctrl.type]}
            key = {ctrl.label} 
            added =  {() => props.added(ctrl.type)}
            removed = {() => props.removed(ctrl.type)}
            label = {ctrl.label}/>
        )))}
        <button 
        className = {classes.OrderButton}
        disabled = {!props.disPrice}
        onClick = {props.purchHandler}
        >ORDER NOW</button>
    </div>
);
export default buildControls;