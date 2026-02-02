import { ExerciseInstrument } from "../types/ExerciseInstrument";

export interface SetModel {
	id: string;
	repetitions: number;
	weight: number; // in kilograms
	restTime?: number; // in seconds
	performedWith: ExerciseInstrument;
}
