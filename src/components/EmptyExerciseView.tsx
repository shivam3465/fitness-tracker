import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface EmptyExerciseProp {
	titleMessage: string;
	secondaryMessage: string;
}

export default function EmptyExerciseView({
	titleMessage,
	secondaryMessage,
}: EmptyExerciseProp) {
	return (
		<View className="flex-1 items-center justify-center flex-col">
			<Image
				source={require("@/assets/empty_exercise_log_image.png")}
				className="object-contain w-[200px] h-[250px]"></Image>

			<View className="flex items-center justify-center flex-col w-[100%]">
				<Text className="color-[#adadad] text-[24px] pt-8">
					{titleMessage}
				</Text>
				<Text className="color-[#757575] text-[14px] my-2">
					{secondaryMessage}
				</Text>
			</View>
			<TouchableOpacity
				className="mb-4 mt-8 py-2 px-4 bg-[#f974169f] rounded-md w-[200px]"
				onPress={() => router.push("/log-exercise")}>
				<Text className="text-white text-center">Log Exercise</Text>
			</TouchableOpacity>
		</View>
	);
}
