import Header from "@/src/components/Header";
import { useRef } from "react";
import { Animated, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const PRIMARY_HEADER_HEIGHT = 60;
const SECONDARY_HEADER_HEIGHT = 41;
const TOTAL_HEADER_HEIGHT = PRIMARY_HEADER_HEIGHT + SECONDARY_HEADER_HEIGHT;

export default function HomeScreen() {
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
					backgroundColor: "#111111", // APP COLOR
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

			{/* CONTENT */}
			<Animated.ScrollView
				contentContainerStyle={{
					paddingTop: insets.top + TOTAL_HEADER_HEIGHT,
				}}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: true },
				)}>
				{/* {Array.from({ length: 30 }).map((_, i) => (
					<View
						key={i}
						className="h-20 bg-[#1f1f1f] border-b border-[#373737]"
					/>
				))} */}
			</Animated.ScrollView>

			<SafeAreaView edges={["bottom"]} />
		</View>
	);
}
