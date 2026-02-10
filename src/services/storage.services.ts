import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExerciseModel } from "../models/Exercise.model";
import { MuscleGroup } from "../models/MuscleGroup.model";
import { CATEGORY_KEY, EXERCISE_KEY } from "../utils/constants.utils";

export const StorageService = {
	async getCategories(): Promise<MuscleGroup[]> {
		try {
			const data = await AsyncStorage.getItem(CATEGORY_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.log("Error reading categories", error);
			return [];
		}
	},

	async saveCategories(categories: MuscleGroup[]): Promise<void> {
		try {
			await AsyncStorage.setItem(
				CATEGORY_KEY,
				JSON.stringify(categories),
			);
		} catch (error) {
			console.log("Error saving categories", error);
		}
	},

	async addCategory(category: MuscleGroup): Promise<MuscleGroup[]> {
		const categories = await this.getCategories();
		const updated = [...categories, category];
		await this.saveCategories(updated);
		return updated;
	},

	async clearCategories(): Promise<void> {
		await AsyncStorage.removeItem(CATEGORY_KEY);
	},

	async getExercises(): Promise<ExerciseModel[]> {
		try {
			const data = await AsyncStorage.getItem(EXERCISE_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.log("Error reading exercises", error);
			return [];
		}
	},

	async saveExercises(exercises: ExerciseModel[]): Promise<void> {
		try {
			await AsyncStorage.setItem(EXERCISE_KEY, JSON.stringify(exercises));
		} catch (error) {
			console.log("Error saving exercises", error);
		}
	},

	async addExercise(exercise: ExerciseModel): Promise<ExerciseModel[]> {
		const exercises = await this.getExercises();
		const updated = [...exercises, exercise];
		await this.saveExercises(updated);
		return updated;
	},

	async clearExercises(): Promise<void> {
		await AsyncStorage.removeItem(EXERCISE_KEY);
	},
};
