import { combineReducers, legacy_createStore } from "redux";
import taskReducer from "./taskPageReducer/taskPageReducer";
import projectReducer from "./projectPageReducer/projectPageReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reducer = combineReducers({
  taskPage: taskReducer,
  projectPage: projectReducer,
});
const store = legacy_createStore(reducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type InferActionsType<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
