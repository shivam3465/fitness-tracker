import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function AddExerciseHeader() {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				paddingTop: insets.top,
				backgroundColor: "#111111",
				borderBottomWidth: 1,
				borderBottomColor: "#1f2937",
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
					Add Exercise
				</Text>

				{/* RIGHT SPACER (for perfect centering) */}
				<View className="h-10 w-10" />
			</View>
		</View>
	);
}

export default AddExerciseHeader;
