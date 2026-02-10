import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch } from "../redux/hooks";
import { logExercise } from "../redux/reducers/ExerciseLogs.reducers";

function LogExerciseHeader() {
	const dispatch = useAppDispatch();

	return (
		<SafeAreaView
			style={{
				backgroundColor: "#090909",
			}}>
			<View className="h-14 flex-row items-center px-3">
				{/* BACK BUTTON */}
				<Pressable
					onPress={() => router.back()}
					className="h-10 w-10 items-center justify-center"
					hitSlop={8}>
					<AntDesign name="arrow-left" size={22} color="#f1f5f9" />
				</Pressable>

				{/* TITLE */}
				<Text className="flex-1 text-center text-[17px] font-semibold text-slate-100">
					Log Exercise
				</Text>

				{/* RIGHT SPACER (for perfect centering) */}
				<Pressable
					onPress={() => dispatch(logExercise(true))}
					className="mr-2 h-10 w-10 items-center justify-center active:bg-[#151515] rounded-lg">
					<Feather name="check" size={24} color="#f97316" />
				</Pressable>
			</View>
		</SafeAreaView>
	);
}

export default LogExerciseHeader;
