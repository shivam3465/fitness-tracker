import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MuscleGroup } from "../../models/MuscleGroup.model";

const initialState: MuscleGroup[] = [];

const categorySlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategories: (state, action: PayloadAction<MuscleGroup[]>) => {
			state.length = 0;
			state.push(...action.payload);
		},
	},
});

export const { setCategories } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
