import { router } from "expo-router";
import React, { useState } from "react";
import {
	FlatList,
	Modal,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { ExerciseModel } from "../models/Exercise.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedExercise } from "../redux/reducers/Application.reducers";

export default function LogExerciseScreen() {
	const [search, setSearch] = useState("");
	const [activeCat, setActiveCat] = useState("All"); //stores id of active category
	const [isModalVisible, setIsModalVisible] = useState(false);

	const storedExerciseList = useAppSelector((state) => state.exerciseList);
	const storedCategoriesList = [
		...useAppSelector((state) => state.categoryList),
	];

	storedCategoriesList.unshift({ id: "All", name: "All" });

	const dispatch = useAppDispatch();

	const filteredExercises = storedExerciseList.filter((item) => {
		const matchesCategory =
			activeCat === "All" ||
			item.muscleGroup.some((cat) => cat.id === activeCat);

		const matchesSearch = item.name
			.toLowerCase()
			.includes(search.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const handleExerciseAdd = (exercise: ExerciseModel) => {
		dispatch(setSelectedExercise(exercise));
		router.push("/log-exercise");
	};

	return (
		<View className="flex-1 bg-secondary mt-8 px-4 py-0">
			{/* Search Bar */}
			<View className="mt-0 mb-6">
				<TextInput
					placeholder="Search exercise..."
					placeholderTextColor="#666"
					className="bg-[#1f1f20] text-white p-4 rounded-xl border border-[#444444]"
					value={search}
					onChangeText={setSearch}
				/>
			</View>

			{/* Category Row */}
			<View className="mb-6">
				<FlatList
					data={storedCategoriesList}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => setActiveCat(item.id)}
							className={`mr-3 px-5 py-2 rounded-full ${activeCat === item.id ? "bg-orange-500" : "bg-[#1c1c1e]"}`}>
							<Text
								className={`font-bold ${activeCat === item.id ? "text-white" : "text-gray-400"}`}>
								{item.name}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>

			{/* Exercise List */}
			<FlatList
				data={filteredExercises}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingBottom: 120 }}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text className="text-gray-500 text-center mt-10">
						No exercises found.
					</Text>
				}
				renderItem={({ item }) => (
					<View className="bg-[#28282a] px-4 py-2 mb-3 rounded-xl flex-row justify-between items-center">
						<View className="flex-1">
							<Text className="text-[#cecece] font-semibold text-lg">
								{item.name}
							</Text>

							<View className="flex items-center flex-row mt-2 flex-wrap">
								{item.muscleGroup.map((cat) => (
									<Text
										key={cat.id}
										className="text-gray-500 text-sm rounded-md px-2 py-1 mr-2 my-1 bg-[#202020] border-[1px] border-[#353535] flex items-center justify-center">
										{cat.name}
									</Text>
								))}
							</View>
						</View>
						<Pressable
							onPress={() => handleExerciseAdd(item)}
							className="w-[45px] h-max flex justify-center items-center active:bg-[#3f3f3f]">
							<Text className="text-orange-500 text-3xl font-bold">
								+
							</Text>
						</Pressable>
					</View>
				)}
			/>

			{/* --- Main Center Button --- */}
			<View className="absolute bottom-10 left-0 right-0 items-center">
				<TouchableOpacity
					onPress={() => setIsModalVisible(true)}
					activeOpacity={0.8}
					className="bg-orange-500 w-max px-8 py-4 rounded-full flex-row items-center shadow-2xl border-2 border-orange-400/20">
					<Text className="text-white font-black text-lg mr-2">
						CREATE NEW
					</Text>
					<Text className="text-white text-2xl font-bold">+</Text>
				</TouchableOpacity>
			</View>

			{/* --- Selection Modal (Bottom Sheet style) --- */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}>
				<Pressable
					className="flex-1 bg-black/70 justify-end"
					onPress={() => setIsModalVisible(false)}>
					<View className="bg-[#1c1c1e] p-6 rounded-t-[32px] border-t border-gray-800">
						{/* Drag Handle */}
						<View className="w-12 h-1.5 bg-gray-700 rounded-full self-center mb-8" />

						<Text className="text-white text-2xl font-bold mb-2 text-center">
							Add New Item
						</Text>
						<Text className="text-gray-500 text-center mb-8">
							Choose what you want to create
						</Text>

						{/* Option: Exercise */}
						<TouchableOpacity
							onPress={() => {
								router.push("/new-exercise");
								setIsModalVisible(false);
							}}
							className="bg-[#2c2c2e] p-5 rounded-2xl mb-4 flex-row items-center">
							<View className="bg-orange-500/20 p-3 rounded-xl mr-4">
								<Text className="text-2xl">🏋️‍♂️</Text>
							</View>
							<View>
								<Text className="text-white text-lg font-bold">
									New Exercise
								</Text>
								<Text className="text-gray-400 text-sm">
									Create a custom workout move
								</Text>
							</View>
						</TouchableOpacity>

						{/* Option: Category */}
						<TouchableOpacity
							onPress={() => {
								router.push("/new-category");
								setIsModalVisible(false);
							}}
							className="bg-[#2c2c2e] p-5 rounded-2xl mb-8 flex-row items-center">
							<View className="bg-blue-500/20 p-3 rounded-xl mr-4">
								<Text className="text-2xl">💪</Text>
							</View>
							<View>
								<Text className="text-white text-lg font-bold">
									Muscle Category
								</Text>
								<Text className="text-gray-400 text-sm">
									Add a new body part or group
								</Text>
							</View>
						</TouchableOpacity>

						{/* Cancel Button */}
						<TouchableOpacity
							onPress={() => setIsModalVisible(false)}
							className="mb-4">
							<Text className="text-gray-400 text-center font-bold text-lg">
								Dismiss
							</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
}
