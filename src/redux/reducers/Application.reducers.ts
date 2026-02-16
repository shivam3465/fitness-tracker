import { ExerciseModel } from "@/src/models/Exercise.model";
import { ExerciseLogModel } from "@/src/models/ExerciseLog.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserActivity {
	date: string;
	exerciseLogged: boolean;
}
export enum AppModeModel {
	VIEW = "view",
	EDIT = "edit",
	NORMAL = "",
}
interface ApplicationInteface {
	exerciseDate: string;
	selectedExercise: ExerciseModel; //for logging exercise
	exerciseViewing: ExerciseLogModel;
	userActivity: UserActivity[];
	mode: AppModeModel;
}

const initialExerciseViewingState = {
	id: "",
	exercise: { id: "", name: "", muscleGroup: [] },
	date: "",
	sets: [],
};

const initialState: ApplicationInteface = {
	exerciseDate: new Date().toISOString(),
	selectedExercise: { id: "", name: "", muscleGroup: [] },
	exerciseViewing: initialExerciseViewingState,
	mode: AppModeModel.NORMAL,
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
		setExerciseViewing: (
			state,
			action: PayloadAction<ExerciseLogModel | null>,
		) => {
			if (action.payload) state.exerciseViewing = action.payload;
			else state.exerciseViewing = initialExerciseViewingState;
		},
		setMode: (state, action: PayloadAction<AppModeModel>) => {
			state.mode = action.payload;
		},
		setUserActivity: (state, action: PayloadAction<UserActivity[]>) => {
			state.userActivity = action.payload;
		},
	},
});

export const {
	setExerciseDate,
	setSelectedExercise,
	setExerciseViewing,
	setUserActivity,
	setMode,
} = applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
