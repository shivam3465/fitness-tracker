import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddExerciseScreen() {
	return (
		<View className="flex-1 bg-black px-4 pt-10">
			<Text className="text-xl text-white font-semibold mb-4">
				Add Exercise
			</Text>

			<Pressable
				onPress={() => router.back()}
				className="mt-6 bg-slate-800 p-3 rounded-md">
				<Text className="text-white text-center">Go Back</Text>
			</Pressable>
		</View>
	);
}
