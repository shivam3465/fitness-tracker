import { MuscleGroup } from "../types/MuscleGroup";
import { SetModel } from "./SetModel";

export interface ExerciseModel {
	id: string;
	name: string;
	muscleGroup: MuscleGroup[];
}

export interface ExerciseListModel {
	id: string;
	name: string;
	sets: SetModel[];
	muscleGroup: MuscleGroup[];
}
