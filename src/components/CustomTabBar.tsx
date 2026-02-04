import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

export default function CustomTabBar({ state, navigation }: any) {
	const currentRoute = state.routes[state.index].name;

	const isActive = (routeName: string) => {
		return currentRoute === routeName;
	};

	return (
		<View className="h-[80px] flex-row bg-primary items-center justify-around px-4 border-t-[1px] border-slate-800">
			{/* HOME */}
			<Pressable
				onPress={() => navigation.navigate("index")}
				className="items-center justify-center">
				<AntDesign
					name="home"
					size={24}
					color={isActive("index") ? "#eeeeee" : "#4b4b4b"}
				/>
				<Text
					className={`text-white mt-1 text-xs ${isActive("index") ? "font-bold color-active" : "font-normal color-inActive"}`}>
					Home
				</Text>
			</Pressable>

			{/* GAP (for center FAB space) */}
			<View className="w-[60px]" />

			{/* PROGRESS */}
			<Pressable
				onPress={() => navigation.navigate("progress")}
				className="items-center justify-center">
				<Ionicons
					name="stats-chart"
					size={24}
					color={isActive("progress") ? "#eeeeee" : "#4b4b4b"}
				/>
				<Text
					className={`text-white mt-1 text-xs ${isActive("progress") ? "font-bold color-active" : "font-normal color-inActive"}`}>
					Progress
				</Text>
			</Pressable>
		</View>
	);
}
