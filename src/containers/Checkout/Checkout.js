 import React, { Component } from 'react';
 import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
/**
 * tiny checkout summary, what about to buy and price, also could rebuild the burger,
 *  a button to cancel checkout and go back to the burgerbuilder, 
 * a button to continue
*/
 class Checkout extends Component {
     state = {
         ingredients: {
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
         }
     }
     checkoutCancelledHandler = () => {
        this.props.history.goBack();
     }
     checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
     }
    render () {
        return (
            <div>
                <CheckoutSummary ingredients = {this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                />
            </div>
        );
    }
 }
 export default Checkout;