import { ExerciseLogModel } from "@/src/models/ExerciseLog.model";
import { useAppSelector } from "@/src/redux/hooks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const date = useAppSelector(
		(state) => state.applicationContext.exerciseDate,
	);

	//stored in device storage
	const exerciseData = useAppSelector(
		(state) => state.exerciseLogsList.exerciseListData,
	);

	//used for displaying exercise data
	const [exerciseLogs, setExerciseLogs] = useState(exerciseData);

	const filterExerciseLogs = (date: string) => {
		const filteredLogs = exerciseData.filter(
			(val) => new Date(val.date).getDate() === new Date(date).getDate(),
		);
		setExerciseLogs(filteredLogs);
	};

	useEffect(() => {
		filterExerciseLogs(date);
	}, [date]);

	const renderItem = ({ item }: { item: ExerciseLogModel }) => {
		const { exercise, sets, date } = item;

		return (
			<View className="bg-[#1e1e1e] rounded-xl p-4 mb-4 relative">
				<View>
					{/* Exercise Name */}
					<Text className="text-white text-lg font-semibold">
						{exercise.name}
					</Text>
				</View>

				{/* Date */}
				<Text className="text-gray-400 text-sm mt-1">
					{new Date(date).toDateString()}
				</Text>

				{/* Muscle Groups */}
				<View className="flex-row flex-wrap mt-2">
					{exercise.muscleGroup.map((group) => (
						<View
							key={group.id}
							className="bg-[#2a2a2a] px-3 py-1 rounded-full mr-2 mb-2">
							<Text className="text-gray-300 text-xs">
								{group.name}
							</Text>
						</View>
					))}
				</View>

				{/* Sets Count */}
				<Text className="text-gray-300 mt-2">
					Total Sets:{" "}
					<Text className="text-white font-medium">
						{sets.length}
					</Text>
				</Text>

				{/* OPTIONAL: Detailed sets view */}
				{/*
				<View className="mt-3">
					{sets.map((set, index) => (
						<Text
							key={set.id}
							className="text-gray-400 text-sm"
						>
							Set {index + 1}: {set.repetitions} reps ×{" "}
							{set.weight} kg
						</Text>
					))}
				</View>
				*/}
			</View>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-black px-4 pt-[120px]">
			<FlatList
				data={exerciseLogs}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>

			<TouchableOpacity
				className="mb-4 py-2 px-4 border-2 border-orange-500 rounded-md"
				onPress={() => router.push("/log-exercise")}>
				<Text className="text-white text-center">Log Exercise</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
