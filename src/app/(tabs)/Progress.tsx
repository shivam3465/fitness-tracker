import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgressScreen() {
	return (
		<SafeAreaView className="flex-1 bg-secondary pt-[110px]">
			<View className="flex-1 items-center justify-center">
				<Text className="text-white text-lg">Progress Screen</Text>
			</View>
		</SafeAreaView>
	);
}
