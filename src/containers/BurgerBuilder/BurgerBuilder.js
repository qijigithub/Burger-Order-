import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary/auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const INGREDIENT_PRICES= {
    salad: 0.5,
    bacon: 0.7,
    meat: 1.3, 
    cheese: 0.4
};
class BurgerBuilder  extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        disablePrice: false,
        purchasing: false,
        loading:false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get ('https://react-my-burger-2c1e7.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data})
        }).catch(error =>{
            this.setState({error: true})
        });
    }
    purchHandler = ()=> {
        this.setState({purchasing: true})
    }
    disablePriceHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => { return ingredients[igKey];})
        .reduce ((sum,el)=> {return sum+el;},0);
        // const diablePrice = this.state.totalPrice;
        // const newdisablePrice =  diablePrice<= 4
        this.setState({disablePrice: sum > 0});
    }


    addIngredientHandler=(type)=> {
        // update ingredient number
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount +1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        // update total price
        const typeprice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice + typeprice;
        this.setState({totalPrice: updatePrice,ingredients: updateIngredients})
        this.disablePriceHandler(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
        const updateCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        
        const typePrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice - typePrice;
        this.setState({ingredients:updateIngredients,totalPrice:updatePrice})
        this.disablePriceHandler(updateIngredients)
        } 
    }
    purchaseCancelHandler= () => {
        this.setState ({purchasing: false})
    }

    purchaseContinueHandler = ()=>{
        // alert('You continue')
        // this.setState( {loading:true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name:'Ji testname1',
        //         address: {
        //             street : 'Teststreet 1',
        //             zipCode: '41234',
        //             country: 'Cermany'
        //         },
        //         email:'test@test.com',
        //         deliveryMethod:'fastest'
        //     }
        // }
        // axios.post('/orders.json',order)
        // .then(response =>{
        //     this.setState({loading:false, purchasing: false});
        // })
        // .catch(error => this.setState({loading:false}));
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search: '?'+ queryString
         });
    }

    render () {
        const disableInfo = {...this.state.ingredients,purchasing: false };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        let burger = this.state.error? <p>Ingredients can't be loaded</p>:<Spinner />;
        if (this.state.ingredients) {
         burger = (
            <Auxiliary>
        <Burger ingredients = {this.state.ingredients}/>
            <BuildControls 
                price = {this.state.totalPrice}
                added = {this.addIngredientHandler}
                removed = {this.removeIngredientHandler}
                disable = {disableInfo}
                disPrice = {this.state.disablePrice}
                orderHandler = {this.disablePriceHandler} // invisiable order now button, when no ingredient added
                purchHandler = {this.purchHandler} // purchasing from false to ture
            />
            </Auxiliary>
            ); 

            orderSummary = <OrderSummary
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}
            />
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Auxiliary>
                <Modal show = {this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);