import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ExerciseModel } from "../models/Exercise.model";
import { ExerciseLogModel } from "../models/ExerciseLog.model";
import { ExerciseSetModel } from "../models/ExerciseSet.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	logExercise,
	setExerciseLogs,
} from "../redux/reducers/ExerciseLogs.reducers";
import { StorageService } from "../services/storage.services";
import { showError, showSuccess } from "../services/toast.services";
import { ExerciseInstrument } from "../types/ExerciseInstrument";
import { formatWorkoutDate } from "../utils/date.utils";

export default function LogExerciseScreen() {
	const storedDate = useAppSelector(
		(state) => state.applicationContext.exerciseDate,
	);
	const [selectedExercise, setSelectedExercise] = useState(
		useAppSelector((state) => state.applicationContext.selectedExercise),
	);
	const logExerciseEvent = useAppSelector(
		(state) => state.exerciseLogsList.submissionEvent,
	);
	const exerciseLogsList = useAppSelector(
		(state) => state.exerciseLogsList.exerciseListData,
	);
	const exerciseOptionsList = useAppSelector((state) => state.exerciseList);

	const [date, setDate] = useState<Date>(() =>
		storedDate ? new Date(storedDate) : new Date(),
	);
	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [exercisePickerOpen, setExercisePickerOpen] = useState(false);

	const [sets, setSets] = useState<ExerciseSetModel[]>([]);
	const [openSetId, setOpenSetId] = useState<string | null>(null);

	const dispatch = useAppDispatch();

	const exerciseOptionsItems = Object.values(exerciseOptionsList).map(
		(exercise) => ({
			label:
				exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1),
			value: exercise.id,
		}),
	);

	const instrumentItems = Object.values(ExerciseInstrument).map(
		(instrument) => ({
			label: instrument.charAt(0).toUpperCase() + instrument.slice(1),
			value: instrument,
		}),
	);

	const instrumentItemMap = new Map<string, ExerciseInstrument>();
	const exerciseListMap = new Map<string, ExerciseModel>();

	Object.values(ExerciseInstrument).forEach((instrument) => {
		instrumentItemMap.set(instrument, instrument);
	});

	Object.values(exerciseOptionsList).forEach((exercise) => {
		exerciseListMap.set(exercise.id, exercise);
	});

	const addSet = () => {
		setSets((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				repetitions: 0,
				weight: 0,
				restTime: 0,
				performedWith: ExerciseInstrument.BARBELL,
			},
		]);
	};

	const removeSet = (id: string) => {
		setSets((prev) => prev.filter((s) => s.id !== id));
	};

	const updateSet = <K extends keyof ExerciseSetModel>(
		id: string,
		key: K,
		value: ExerciseSetModel[K],
	) => {
		setSets((prev) =>
			prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
		);
	};

	const validateExerciseData = (data: ExerciseLogModel): boolean => {
		// 1. Exercise name
		if (!data.exercise) {
			showError("Select one Exercise", "", 800);
			return false;
		}

		// 3. Sets
		if (!data.sets || data.sets.length === 0) {
			showError("Add at least one set", "", 800);
			return false;
		}

		// 4. Validate each set
		for (let i = 0; i < data.sets.length; i++) {
			const set = data.sets[i];

			// repetitions
			if (!set.repetitions || set.repetitions <= 0) {
				showError(`Invalid repetitions in set ${i + 1}`, "", 800);
				return false;
			}

			// performedWith
			if (
				!Object.values(ExerciseInstrument).includes(set.performedWith)
			) {
				showError(`Invalid instrument in set ${i + 1}`, "", 800);
				return false;
			}

			// weight
			if (
				set.performedWith !== ExerciseInstrument.BODYWEIGHT &&
				(!set.weight || set.weight <= 0)
			) {
				showError(`Invalid weight in set ${i + 1}`, "", 800);
				return false;
			}
		}

		return true;
	};

	const saveExerciseDataToStorage = async () => {
		const exerciseData: ExerciseLogModel = {
			id: new Date().getTime().toString(),
			exercise: selectedExercise,
			date: date.toISOString(),
			sets,
		};
		const isValid = validateExerciseData(exerciseData);

		if (!isValid) {
			return;
		}

		// Data valid — save to storage
		await StorageService.addExerciseLogs(exerciseData);
		dispatch(setExerciseLogs([...exerciseLogsList, exerciseData]));
		showSuccess("Exercise logged !", "", 800);
		dispatch(logExercise(false));

		//navigate to previous screen
		setTimeout(() => {
			router.back();
		}, 800);
	};

	//receives submission event from header to save exercise data
	useEffect(() => {
		if (logExerciseEvent) {
			saveExerciseDataToStorage();
		}
		dispatch(logExercise(false));
	}, [logExerciseEvent]);

	return (
		<KeyboardAwareScrollView
			className="flex-1 bg-secondary px-4"
			enableOnAndroid
			keyboardShouldPersistTaps="handled">
			{/* Date */}
			<View className="mb-4">
				<Text className="text-gray-400 mb-1 mt-3">Day</Text>
				<TouchableOpacity
					onPress={() => setDatePickerOpen(!datePickerOpen)}
					className="bg-[#262627] px-4 py-3 rounded-lg border border-[#3a4049]">
					<Text className="text-white">
						{formatWorkoutDate(date)}
					</Text>
				</TouchableOpacity>

				{datePickerOpen && (
					<DateTimePickerAndroid
						value={date}
						mode="date"
						themeVariant="dark"
						display={Platform.OS === "ios" ? "spinner" : "calendar"}
						onChange={(_, selectedDate) => {
							setDatePickerOpen(false);
							if (selectedDate) setDate(selectedDate);
						}}
					/>
				)}
			</View>

			{/* Exercise */}
			<View className="mb-4">
				<Text className="text-gray-400 mb-1 mt-3">Exercise</Text>
				{
					<DropDownPicker
						open={exercisePickerOpen}
						value={selectedExercise.id}
						items={exerciseOptionsItems}
						setOpen={(open) => {
							return setExercisePickerOpen(!exercisePickerOpen);
						}}
						setValue={(cb) => {
							const foundExercise = exerciseListMap.get(
								cb(selectedExercise.id),
							);
							if (foundExercise) {
								return setSelectedExercise(foundExercise);
							}
							return null;
						}}
						listMode="SCROLLVIEW"
						style={{
							backgroundColor: "#262627",
							borderColor: "#3a4049",
						}}
						dropDownContainerStyle={{
							backgroundColor: "#1c1c1e",
							borderColor: "#3a4049",
						}}
						textStyle={{ color: "#fff" }}
						zIndex={3000}
						zIndexInverse={1000}
						ArrowDownIconComponent={() => (
							<AntDesign name="down" size={14} color="white" />
						)}
						ArrowUpIconComponent={() => (
							<AntDesign name="up" size={14} color="white" />
						)}
					/>
				}
			</View>

			{/* Sets */}
			<View className="mb-14">
				<Text className="text-white text-lg font-semibold mb-3">
					Sets
				</Text>

				{sets.map((set, index) => (
					<View
						key={set.id}
						className="bg-[#1c1c1e] border border-[#2e2f31] rounded-xl mb-4">
						{/* Header */}
						<View className="flex-row justify-between items-center px-4 pt-4">
							<Text className="text-gray-400">
								Set {index + 1}
							</Text>
							<TouchableOpacity onPress={() => removeSet(set.id)}>
								<AntDesign
									name="close"
									size={14}
									color="#f97316"
								/>
							</TouchableOpacity>
						</View>

						<View className="p-4">
							{/* Instrument Dropdown */}
							<View className="mb-4 z-50">
								<Text className="text-gray-400 mb-2">
									Performed With
								</Text>
								<DropDownPicker
									open={openSetId === set.id}
									value={set.performedWith}
									items={instrumentItems}
									setOpen={(open) => {
										return setOpenSetId(
											!openSetId ? set.id : null,
										);
									}}
									setValue={(cb) =>
										updateSet(
											set.id,
											"performedWith",
											cb(set.performedWith),
										)
									}
									listMode="SCROLLVIEW"
									style={{
										backgroundColor: "#262627",
										borderColor: "#3a4049",
									}}
									dropDownContainerStyle={{
										backgroundColor: "#1c1c1e",
										borderColor: "#3a4049",
									}}
									textStyle={{ color: "#fff" }}
									zIndex={3000}
									zIndexInverse={1000}
									ArrowDownIconComponent={() => (
										<AntDesign
											name="down"
											size={14}
											color="white"
										/>
									)}
									ArrowUpIconComponent={() => (
										<AntDesign
											name="up"
											size={14}
											color="white"
										/>
									)}
								/>
							</View>

							{/* Inputs */}
							<View className="flex-row justify-between mt-2">
								<View className="w-[30%]">
									<Text className="text-gray-400 mb-2 text-center">
										Reps
									</Text>
									<TextInput
										keyboardType="number-pad"
										value={String(set.repetitions)}
										onChangeText={(v) =>
											updateSet(
												set.id,
												"repetitions",
												Number(v) || 0,
											)
										}
										className="bg-[#262627] text-white px-3 py-2 rounded-lg text-center"
									/>
								</View>

								<View className="w-[30%]">
									<Text className="text-gray-400 mb-2 text-center">
										Weight
									</Text>

									<View className="flex-row items-center bg-[#262627] rounded-lg px-3">
										<TextInput
											keyboardType="decimal-pad"
											value={String(set.weight)}
											onChangeText={(v) =>
												updateSet(
													set.id,
													"weight",
													Number(v) || 0,
												)
											}
											className="flex-1 text-white py-2 text-center"
										/>
										<Text className="text-gray-400  text-[14px]">
											kg
										</Text>
									</View>
								</View>

								<View className="w-[30%]">
									<Text className="text-gray-400 mb-2 text-center">
										Rest
									</Text>

									<View className="flex-row items-center bg-[#262627] rounded-lg px-3">
										<TextInput
											keyboardType="number-pad"
											value={String(set.restTime ?? "")}
											onChangeText={(v) =>
												updateSet(
													set.id,
													"restTime",
													Number(v) || 0,
												)
											}
											className="flex-1 text-white py-2 text-center"
										/>
										<Text className="text-gray-400 text-[14px]">
											min
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				))}

				{/* Add Set */}
				<TouchableOpacity
					onPress={addSet}
					className="border border-dashed border-orange-500 py-3 rounded-xl items-center">
					<Text className="text-orange-500 font-semibold">
						+ Add Set
					</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAwareScrollView>
	);
}
