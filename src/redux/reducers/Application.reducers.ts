import { ExerciseModel } from "@/src/models/Exercise.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserActivity {
	date: string;
	exerciseLogged: boolean;
}
interface ApplicationInteface {
	exerciseDate: string;
	selectedExercise: ExerciseModel;
	userActivity: UserActivity[];
}

const initialState: ApplicationInteface = {
	exerciseDate: new Date().toISOString(),
	selectedExercise: { id: "", name: "", muscleGroup: [] },
	userActivity: [], //for tracking user activity like streaks or rest days
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
		setUserActivity: (state, action: PayloadAction<UserActivity[]>) => {
			state.userActivity = action.payload;
		},
	},
});

export const { setExerciseDate, setSelectedExercise } =
	applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
