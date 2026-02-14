import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { useAppDispatch } from "../redux/hooks";
import { setCategories } from "../redux/reducers/Category.reducers";
import { setExercises } from "../redux/reducers/Exercise.reducers";
import { setExerciseLogs } from "../redux/reducers/ExerciseLogs.reducers";
import { StorageService } from "../services/storage.services";

export default function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const load = async () => {
			dispatch(setCategories(await StorageService.getCategories()));
			dispatch(setExercises(await StorageService.getExercises()));
			dispatch(setExerciseLogs(await StorageService.getExercisesLogs()));
		};
		load();

		const timer = setTimeout(() => {
			router.replace("/(tabs)");
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-black">
			{/* App Entry Point */}
			<View className="flex items-center justify-center h-full">
				<Text className="text-white text-[46px] font-bold mb-8">
					Fitness Tracker
				</Text>
				<Text className="text-orange-500 text-lg italic">
					Welcome to Fitness Tracker
				</Text>
			</View>
		</SafeAreaView>
	);
}
