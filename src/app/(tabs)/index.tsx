import EmptyExerciseView from "@/src/components/EmptyExerciseView";
import { ExerciseLogModel } from "@/src/models/ExerciseLog.model";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
	AppModeModel,
	setExerciseViewing,
	setMode,
} from "@/src/redux/reducers/Application.reducers";
import { setExerciseLogs } from "@/src/redux/reducers/ExerciseLogs.reducers";
import { StorageService } from "@/src/services/storage.services";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu";

export default function HomeScreen() {
	const date = useAppSelector(
		(state) => state.applicationContext.exerciseDate,
	);
	const exerciseData = useAppSelector(
		(state) => state.exerciseLogsList.exerciseListData,
	);
	const dispatch = useAppDispatch();

	const [exerciseLogs, setExerciseLog] = useState(exerciseData);

	const instrumentIcons: { [key: string]: any } = {
		barbell: require("@/assets/instruments/barbell.png"),
		dumbbell: require("@/assets/instruments/dumbbell.png"),
		machine: require("@/assets/instruments/machine.png"),
		bodyweight: require("@/assets/instruments/bodyweight.png"),
		kettlebell: require("@/assets/instruments/kettlebell.png"),
		cable: require("@/assets/instruments/cable.png"),
		ball: require("@/assets/instruments/ball.png"),
	};
	const instrumentLabels: { [key: string]: string } = {
		barbell: "Barbell",
		dumbbell: "Dumbell",
		machine: "Machine",
		bodyweight: "Body Weight",
		kettlebell: "Kettle-bell",
		cable: "Cable Machine",
		ball: "Ball",
	};

	const filterExerciseLogs = (date: string) => {
		const filteredLogs = exerciseData.filter(
			(val) => new Date(val.date).getDate() === new Date(date).getDate(),
		);
		setExerciseLog(filteredLogs);
	};

	const handleExerciseDelete = (id: string) => {
		const updatedExerciseLogs = exerciseData.filter((ex) => ex.id !== id);
		StorageService.saveExercisesLogs(updatedExerciseLogs);
		dispatch(setExerciseLogs(updatedExerciseLogs));
	};

	const handleExerciseEdit = (exercise: ExerciseLogModel) => {
		dispatch(setExerciseViewing(exercise));
		dispatch(setMode(AppModeModel.EDIT));

		router.push({
			pathname: "/log-exercise",
		});
	};

	useEffect(() => {
		dispatch(setExerciseViewing(null));
		dispatch(setMode(AppModeModel.NORMAL));
		filterExerciseLogs(date);
	}, [date, exerciseData]);

	const renderItem = ({ item }: { item: ExerciseLogModel }) => {
		const { exercise, sets } = item;
		const instrumentName = sets[0]?.performedWith;

		const iconSource =
			instrumentIcons[instrumentName] || instrumentIcons.dumbbell;

		return (
			<TouchableOpacity
				onPress={() => {
					dispatch(setMode(AppModeModel.VIEW));
					dispatch(setExerciseViewing(item));
					router.navigate("/log-exercise");
				}}
				key={date}
				className="bg-black/20 mb-4 relative rounded-xl border border-[#252525]">
				<View className="flex items-center justify-between flex-row mb-2 border-b-[1px] border-[#2a2a2a] mx-2">
					<Text className="text-white text-lg font-semibold pl-2">
						{exercise.name}
					</Text>

					<View className="flex flex-row items-center justify-center">
						{/* Sets Count */}
						<View className="flex items-center justify-center flex-row">
							<Text className="text-gray-500 text-[13px] mr-2">
								Sets:{" "}
							</Text>
							<View className="flex items-center justify-center flex-row rounded-md bg-orange-400 w-[26px] h-[26px] ">
								<Text className="text-white font-bold">
									{sets.length}
								</Text>
							</View>
						</View>
						{/* POPUP MENU*/}
						<Menu>
							<MenuTrigger
								style={{ padding: 16, paddingRight: 10 }}>
								<Entypo
									name="dots-three-vertical"
									size={14}
									color="#f1f5f9"
								/>
							</MenuTrigger>

							<MenuOptions
								customStyles={{
									optionsContainer: {
										backgroundColor: "#161616",
										borderRadius: 8,
										width: 150,
										borderWidth: 0.5,
										borderColor: "#2b2b2b",
										marginTop: 35,
										marginLeft: -16,
									},
								}}>
								<MenuOption
									onSelect={() => {
										handleExerciseEdit(item);
									}}>
									{/* Styling ke liye View ka use karein */}
									<View className="px-4 py-2 border-b border-[#272727]">
										<Text className="text-white">Edit</Text>
									</View>
								</MenuOption>

								<MenuOption
									onSelect={() =>
										handleExerciseDelete(item.id)
									}>
									<View className="px-4 py-2">
										<Text className="text-red-500 font-medium">
											Delete
										</Text>
									</View>
								</MenuOption>
							</MenuOptions>
						</Menu>
					</View>
				</View>

				<View className="flex items-start justify-between flex-row py-4">
					{/* Muscle Groups */}
					<View className="flex-row flex-wrap pl-3 w-[75%]">
						{exercise.muscleGroup.map((group, i) => {
							if (i < 5) {
								return (
									<View
										key={group.id} // <--- Ye key zaroori hai
										className="bg-[#2a2a2a] px-3 py-1 rounded-full mr-2 mb-2">
										<Text className="text-gray-300 text-xs">
											{group.name}
										</Text>
									</View>
								);
							}

							if (i === 5) {
								return (
									<View key="more-text">
										<Text className="text-orange-400 text-[13px]">
											+{exercise.muscleGroup.length - 5}{" "}
											more
										</Text>
									</View>
								);
							}

							return null;
						})}
					</View>

					{/* Performed with */}
					<View className="pr-4 flex items-center justify-center flex-col w-[25%]">
						<Image
							source={iconSource}
							style={{ resizeMode: "contain" }}
							className="object-center w-[40px] h-[40px] border-[0px] border-orange-400 rounded-md"
						/>
						<Text className="text-gray-500 text-sm mt-2">
							{instrumentLabels[sets[0]?.performedWith]}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View className="flex-1 px-3 pt-[160px] bg-secondary">
			{exerciseLogs.length === 0 ? (
				<EmptyExerciseView
					titleMessage="No exercise logs found"
					secondaryMessage="Log your first activity to begin building streak"
				/>
			) : (
				<FlatList
					data={exerciseLogs}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
}
