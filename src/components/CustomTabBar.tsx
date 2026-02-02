import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

export default function CustomTabBar({ state, navigation }: any) {
	return (
		<View className=" h-[80px] flex-row bg-[#111111] items-center justify-around px-4">
			{/* HOME */}
			<Pressable
				onPress={() => navigation.navigate("index")}
				className="items-center justify-center">
				<AntDesign name="home" size={24} color="white" />
				<Text className="text-white mt-1 text-xs">Home</Text>
			</Pressable>

			{/* GAP (for center FAB space) */}
			<View className="w-[60px]" />

			{/* PROGRESS */}
			<Pressable
				onPress={() => navigation.navigate("progress")}
				className="items-center justify-center">
				<Ionicons name="stats-chart" size={24} color="white" />
				<Text className="text-white mt-1 text-xs">Progress</Text>
			</Pressable>
		</View>
	);
}
