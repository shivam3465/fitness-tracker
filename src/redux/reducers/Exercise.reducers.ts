import { ExerciseModel } from "@/src/models/Exercise.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ExerciseModel[] = [];

const exerciseSlice = createSlice({
	name: "exercises",
	initialState,
	reducers: {
		setExercises: (state, action: PayloadAction<ExerciseModel[]>) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const { setExercises } = exerciseSlice.actions;

export const exerciseReducer = exerciseSlice.reducer;
