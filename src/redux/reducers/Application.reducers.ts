import { ExerciseModel } from "@/src/models/Exercise.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationInteface {
	exerciseDate: string;
	selectedExercise: ExerciseModel;
}

const initialState: ApplicationInteface = {
	exerciseDate: new Date().toISOString(),
	selectedExercise: { id: "", name: "", muscleGroup: [] },
};

const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		setExerciseDate: (state, action: PayloadAction<string>) => {
			state.exerciseDate = action.payload;
		},
		setSelectedExercise: (state, action: PayloadAction<ExerciseModel>) => {
			state.selectedExercise = action.payload;
		},
	},
});

export const { setExerciseDate, setSelectedExercise } =
	applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
