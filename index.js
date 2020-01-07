// import Redux from 'redux'  //ES6 import method

//for this practice we will run this app as a simple node.js application for which we have to use the require syntax.
const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// {
//     type: BUY_CAKE,
//     info: 'First redux action'
// }
//? Action actually is an object which has to have a type property and other infomation or what actions should be done along with it.
//? Usually we use an Action creator to generate an Action object, as follow:

function buyCakeAction() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCreamAction() {
    return {
        type: BUY_ICECREAM

    }
}

//? Reducer specify how the app's state changes in responses to actions sent to the store
//(previousState,action)=> newState

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return ({
                ...state,
                numOfCakes: state.numOfCakes - 1
            })// in reality, there coulde be many properties, so we have to copy them into the new state by using spread operator.
        case BUY_ICECREAM:
            return ({
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            })
        default:
            return state
    }
}

//? Redux Store 
//? Responsibilities:
//1. Hold application state
//2. Allows access to state via `getState()`
//3. Allows state to be updated via `store.dispatch(action)`
//4. Registers listeners via `subscribe`(listener)
//5. Handles unregistering of listeners via the function returned by `subscribe`(listener)

const store = createStore(reducer)
console.log("Initial state:", store.getState())
//When we create the store we initialize the state and print it

const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()))
//!We add a listener. It will notice the update and execute something.
//!Figure out what happened by peeling the onion:
//The JS App dispatch(emit) an action to the reducer;
//The Reducer findout what cases to be executed acrroding Action's type, and return the new state accrodingly
//Then the listener findout the state was changed and will print out the updated state.

store.dispatch(buyCakeAction())
store.dispatch(buyIceCreamAction())
store.dispatch(buyCakeAction())

unsubscribe() 