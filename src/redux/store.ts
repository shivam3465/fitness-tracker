import { configureStore } from "@reduxjs/toolkit";
import { applicationReducer } from "./reducers/Application.reducers";
import { categoryReducer } from "./reducers/Category.reducers";
import { exerciseReducer } from "./reducers/Exercise.reducers";
import { exerciseLogsReducer } from "./reducers/ExerciseLogs.reducers";

const store = configureStore({
	reducer: {
		exerciseList: exerciseReducer,
		exerciseLogsList: exerciseLogsReducer,
		categoryList: categoryReducer,
		applicationContext: applicationReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
