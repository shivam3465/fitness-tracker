import { ExerciseLogModel } from "@/src/models/ExerciseLog.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
	exerciseListData: ExerciseLogModel[];
	submissionEvent: boolean;
} = {
	exerciseListData: [],
	submissionEvent: false,
};

const exerciseLogsSlice = createSlice({
	name: "exercises-logs",
	initialState,
	reducers: {
		setExerciseLogs: (state, action: PayloadAction<ExerciseLogModel[]>) => {
			return { ...state, exerciseListData: action.payload };
		},
		logExercise: (state, action: PayloadAction<boolean>) => {
			return { ...state, submissionEvent: action.payload };
		},
	},
});

export const { setExerciseLogs, logExercise } = exerciseLogsSlice.actions;

export const exerciseLogsReducer = exerciseLogsSlice.reducer;
