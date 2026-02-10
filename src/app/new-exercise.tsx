import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { ExerciseModel } from "../models/Exercise.model";
import { MuscleGroup } from "../models/MuscleGroup.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setExercises } from "../redux/reducers/Exercise.reducers";
import { StorageService } from "../services/storage.services";

export default function NewExerciseScreen() {
	const [ExerciseName, setExerciseName] = useState("");

	const storedExerciseList = useAppSelector((state) => state.exerciseList);
	const storedCategoriesList = useAppSelector((state) => state.categoryList);

	//filtered exercise list for display
	const [ExerciseList, setExerciseList] =
		useState<ExerciseModel[]>(storedExerciseList);

	//for displaying available categories to select from
	const [availableCategories, setAvailableCategories] =
		useState<MuscleGroup[]>(storedCategoriesList);

	//stores selected categories for the new exercise
	const [categoryInputList, setCategoryInputList] = useState<MuscleGroup[]>(
		[],
	);

	const dispatch = useAppDispatch();

	const filterExercise = (ExerciseName: string) => {
		setExerciseName(ExerciseName);
		ExerciseName = ExerciseName.trim();

		if (ExerciseName.trim() === "") {
			setExerciseList(storedExerciseList);
			return;
		}

		const filteredExercises = ExerciseList.filter((item) =>
			item.name.toLowerCase().includes(ExerciseName.toLowerCase()),
		);
		setExerciseList(filteredExercises);
	};

	const createNewExercise = async () => {
		if (!ExerciseName.trim()) return;

		const newExercise: ExerciseModel = {
			id: Date.now().toString(),
			name: ExerciseName.trim(),
			muscleGroup: categoryInputList || [],
		};

		const updated = await StorageService.addExercise(newExercise);
		dispatch(setExercises(updated));

		setExerciseList(updated);
		setExerciseName("");
		setCategoryInputList([]);
	};

	const deleteExercise = async (id: string) => {
		const updated = ExerciseList.filter((item) => item.id !== id);
		await StorageService.saveExercises(updated);
		dispatch(setExercises(updated));
		setExerciseList(updated);
	};

	const handleCategorySelection = (id: string) => {
		const category = availableCategories.find((cat) => cat.id === id);
		if (!category) return;

		const isSelected = categoryInputList.some((cat) => cat.id === id);

		if (isSelected) {
			setCategoryInputList(
				categoryInputList.filter((cat) => cat.id !== id),
			);
		} else {
			setCategoryInputList([...categoryInputList, category]);
		}
	};

	const isValidExercise = () => {
		return ExerciseName.trim() !== "" && categoryInputList.length > 0;
	};

	useEffect(() => {
		setAvailableCategories(storedCategoriesList);
	}, [storedCategoriesList]);

	return (
		<View className="flex-1 bg-secondary px-4 mt-8">
			<FlatList
				data={ExerciseList}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 120 }}
				ListEmptyComponent={
					<View className="items-center justify-center mt-12">
						<Text className="text-gray-500 text-center text-lg">
							No existing Exercise found
						</Text>
					</View>
				}
				ListHeaderComponent={
					<>
						<Text className="text-white mb-2 text-[16px]">
							Exercise Name
						</Text>

						<View className="mt-4 mb-6">
							<TextInput
								placeholder="Type Exercise Name"
								placeholderTextColor="#666"
								className="bg-[#262627] text-white p-4 rounded-xl border border-[#3a4049]"
								value={ExerciseName}
								onChangeText={filterExercise}
							/>
						</View>

						<View className="my-4">
							<Text className="text-white mb-2 text-[16px]">
								Muscle Group Involved
							</Text>

							<View className="flex flex-wrap flex-row">
								{availableCategories.length > 0 &&
									availableCategories.map((cat) => {
										const isSelected =
											categoryInputList.includes(cat);

										return (
											<TouchableOpacity
												key={cat.id}
												onPress={() =>
													handleCategorySelection(
														cat.id,
													)
												}
												className={`border-[1px] border-[#5b5b5b] rounded-[8px] my-2 mr-3 px-4 py-2 ${
													isSelected
														? "bg-orange-500"
														: "bg-[#1c1c1e]"
												}`}>
												<Text
													className={
														isSelected
															? "text-white"
															: "text-[#cecece]"
													}>
													{cat.name}
												</Text>
											</TouchableOpacity>
										);
									})}

								<TouchableOpacity
									onPress={() =>
										router.navigate("/new-category")
									}
									className="border-[1px]  rounded-[8px] my-2 mr-3 px-4 py-2 border-orange-500 ">
									<Text className="text-white">Add +</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View className="mb-6 mt-4">
							<Text className="text-white text-[16px]">
								Existing Exercise
							</Text>
						</View>
					</>
				}
				renderItem={({ item }) => (
					<View className="bg-[#161616] px-4 py-3 mb-3 rounded-lg flex-row items-center w-full border border-[#2e2f31]">
						<View className="flex-1">
							<Text className="text-[#cecece] font-semibold text-lg">
								{item.name}
							</Text>

							<View className="flex items-center flex-row mt-2 flex-wrap">
								{item.muscleGroup.map((cat) => (
									<Text
										key={cat.id}
										className="text-gray-500 text-sm rounded-md px-2 py-1 mr-2 my-1 bg-[#292929] flex items-center justify-center">
										{cat.name}
									</Text>
								))}
							</View>
						</View>

						<TouchableOpacity
							onPress={() => deleteExercise(item.id)}
							className="ml-2 min-w-[36] items-center justify-center">
							<MaterialIcons
								name="delete"
								size={22}
								color="#f97316"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>

			{/* Create Button  */}
			<View className="mb-8 bg-secondary w-full">
				<TouchableOpacity
					disabled={!isValidExercise()}
					className={` p-4 rounded-xl w-full ${isValidExercise() ? "bg-orange-500" : "bg-[#3a4049]"} `}
					onPress={createNewExercise}>
					<Text
						className={`${isValidExercise() ? "text-white" : "text-gray-500"} text-center font-semibold text-lg`}>
						Create New Exercise
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
