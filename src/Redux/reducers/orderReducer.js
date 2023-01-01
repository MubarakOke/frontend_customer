import * as type from "../actionCreators/types";
import _ from 'lodash'


export const InitiatedAndRunningOrderReducer= (state=null, action)=>{
    switch(action.type){
        case type.createorderType:
            return {[`order${action.payload.id}`]:{...action.payload}, ...state};
        case type.deleteorderType:
            return _.omit(state, `order${action.payload}`)
        case type.fetchInitiatedAndRunningOrderType:
            return {..._.mapKeys(action.payload, order=>`order${order.id}`)}
        case type.signoutType:
            return null;
        default:
            return state;
    }
};

export const CompletedOrderReducer= (state=null, action)=>{
    switch(action.type){
        case (type.fetchCompletedOrderType):
            return {..._.mapKeys(action.payload, order=>`order${order.id}`)}
        case type.signoutType:
            return null;
        default:
            return state;
    }
}

export const ActiveOrderReducer= (state=null, action)=>{
    switch(action.type){
        case type.activeOrder:
            return action.payload
        case type.signoutType:
            return null;
        default:
            return state;
    }
};
