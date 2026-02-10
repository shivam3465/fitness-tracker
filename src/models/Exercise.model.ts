import { ExerciseSetModel } from "./ExerciseSet.model";
import { MuscleGroup } from "./MuscleGroup.model";

export interface ExerciseModel {
	id: string;
	name: string;
	muscleGroup: MuscleGroup[];
}

export interface ExerciseListModel {
	id: string;
	name: string;
	sets: ExerciseSetModel[];
	muscleGroup: MuscleGroup[];
	date: Date;
}
