import { ExerciseModel } from "./Exercise.model";
import { ExerciseSetModel } from "./ExerciseSet.model";

export interface ExerciseLogModel {
	id: string;
	exercise: ExerciseModel;
	date: string; // ISO date string
	sets: ExerciseSetModel[];
}
