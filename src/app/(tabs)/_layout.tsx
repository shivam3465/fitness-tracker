import CustomTabBar from "@/src/components/CustomTabBar";
import Header from "@/src/components/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs, router } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY_HEADER_HEIGHT = 60;

export default function TabLayout() {
	const scrollY = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	const translateY = scrollY.interpolate({
		inputRange: [0, PRIMARY_HEADER_HEIGHT],
		outputRange: [0, -PRIMARY_HEADER_HEIGHT],
		extrapolate: "clamp",
	});

	return (
		<View className="flex-1 ">
			{/* FAKE STATUS BAR BACKGROUND */}
			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: insets.top,
					backgroundColor: "#090909", // APP COLOR
					zIndex: 100,
				}}
			/>

			{/* HEADER STACK */}
			<Animated.View
				style={{
					position: "absolute",
					top: insets.top,
					left: 0,
					right: 0,
					transform: [{ translateY }],
					zIndex: 50,
				}}>
				<Header />
			</Animated.View>

			<Tabs
				screenOptions={{ headerShown: false }}
				tabBar={(props) => <CustomTabBar {...props} />}>
				<Tabs.Screen name="index" />
				<Tabs.Screen name="progress" />
			</Tabs>

			{/* FLOATING CENTER ADD BUTTON */}
			<View className="absolute bottom-[48px] left-0 right-0 items-center z-50">
				<Pressable
					onPress={() => router.push("/list-exercise")}
					className="h-[56px] w-[56px] rounded-full bg-orange-500 items-center justify-center shadow-xl">
					<AntDesign name="plus" size={36} color="white" />
				</Pressable>
			</View>
		</View>
	);
}
