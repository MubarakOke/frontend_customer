import { combineReducers } from "redux";
import AccountReducer from "./accountReducer"
import {InitiatedAndRunningOrderReducer, CompletedOrderReducer, ActiveOrderReducer} from "./orderReducer";
import SpinnerReducer from "./spinnerReducer";
import ErrorReducer from "./errorReducer";
import {PublishedPostReducer, ActivePostReducer} from "./postReducer"


export default combineReducers({
  publishedPost: PublishedPostReducer,
  activePost: ActivePostReducer, 
  auth: AccountReducer,
  initiatedAndRunningOrder: InitiatedAndRunningOrderReducer,
  completedOrder: CompletedOrderReducer,
  spinner: SpinnerReducer,
  error: ErrorReducer,
  activeOrder: ActiveOrderReducer
});
