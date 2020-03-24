import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient'

const burger = (props) => {
    let TransIngredients = Object.keys(props.ingredients)
    .map((igkey) => {
        return  [...Array(props.ingredients[igkey])].map(
            (_,i) => {
                return <BurgerIngredient key = {igkey + i} type = {igkey}/>;
            });
    })
    .reduce((arr, el)=> {
        return arr.concat(el)
    },[]);
    if (TransIngredients.length === 0) {
        TransIngredients = <p>Please start adding ingredients!</p>;
    }
    console.log(TransIngredients);

    

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = 'bread-top' />
            {TransIngredients}
            <BurgerIngredient type = 'bread-bottom' />
        </div>
    )
}
export default burger;