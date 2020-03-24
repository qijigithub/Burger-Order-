import classes from './Burgeringredient.css'
import React, {Component} from 'react'
// import Auxiliary from '../../../hoc/auxiliary'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render () {
        let ingredient = null;

    switch (this.props.type) {
        case('bread-bottom') :
            ingredient = <div className = {classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className = {classes.BreadTop} > 
                     <div className = {classes.Seeds1} > </div>
                     <div className = {classes.Seeds2} > </div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className = {classes.Meat}></div>;
            break;
        case ('salad'):
                ingredient = <div className ={classes.Salad}></div>;
                break;
        case ('bacon'):
                ingredient = <div className = {classes.Bacon}></div>;
                break;
        case ('cheese'):
                ingredient = <div className = {classes.Cheese}></div>;
                break;
        default:
                ingredient = null;
    }
    return ingredient;
    }

};
    // <Auxiliary>
    //     <div className = {classes.BreadTop} > I am the bread top</div>
    //     <div className ={classes.Salad}> I am the salad</div>
    //     <div className = {classes.Bacon}> I am the bacon</div>
    //     <div className = {classes.Cheese}> I am the Cheese</div>
    //     <div className = {classes.Meat}> I am the meat</div>
    //     <div className = {classes.BreadBottom}>I am the BreadBottom</div>
    // </Auxiliary>

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
