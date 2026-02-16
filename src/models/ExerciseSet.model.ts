import { ExerciseInstrument } from "../types/ExerciseInstrument";

export interface ExerciseSetModel {
	id: string;
	repetitions: number;
	weight: string; // in kilograms
	restTime?: number; // in seconds
	performedWith: ExerciseInstrument;
}
