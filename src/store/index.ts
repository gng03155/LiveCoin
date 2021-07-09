import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { coinReducer } from "./reducer";

export const store = createStore(coinReducer, applyMiddleware(thunk));

export type ReducerType = ReturnType<typeof coinReducer>;
