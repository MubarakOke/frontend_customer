import * as type from "../actionCreators/types";

const INITIAL_STATE = null;

export const PublishedPostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.fetchPublishedPost:
      return {...action.payload};
    case type.signoutType:
      return null;
    default:
      return state;
  }
};

export const ActivePostReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case type.setActivePost:
        return action.payload;
      case type.signoutType:
        return null;
      default:
        return state;
    }
  };