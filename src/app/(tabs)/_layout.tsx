import CustomTabBar from "@/src/components/CustomTabBar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs, router } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabLayout() {
	return (
		<>
			<Tabs
				screenOptions={{ headerShown: false }}
				tabBar={(props) => <CustomTabBar {...props} />}>
				<Tabs.Screen name="index" />
				<Tabs.Screen name="progress" />
			</Tabs>

			{/* FLOATING CENTER ADD BUTTON */}
			<View className="absolute bottom-[48px] left-0 right-0 items-center z-50">
				<Pressable
					onPress={() => router.push("/add-exercise")}
					className="h-[56px] w-[56px] rounded-full bg-orange-500 items-center justify-center shadow-xl">
					<AntDesign name="plus" size={36} color="white" />
				</Pressable>
			</View>
		</>
	);
}
