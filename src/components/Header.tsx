import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Animated, Text, View } from "react-native";

interface Props {
	translateY: Animated.AnimatedInterpolation<number>;
}

export default function Header() {
	const [isConsistent, setIsConsistent] = useState(true);

	return (
		<View className="flex-row items-center justify-between p-4 bg-[#111111] h-[60px]">
			<View>
				<Text className="text-lg text-slate-100 font-semibold">
					FitnessTracker
				</Text>
			</View>

			<View className="flex justify-between items-center flex-row gap-2">
				<View className="flex-row items-center justify-center">
					{isConsistent ? (
						<>
							<AntDesign
								name="thunderbolt"
								size={16}
								color="#f97316"
							/>
							<Text className="text-sm text-orange-500 ml-1">
								3 days streak
							</Text>
						</>
					) : (
						<>
							<MaterialCommunityIcons
								name="trophy-broken"
								size={16}
								color="#d74f4f"
							/>
							<Text className="text-sm text-[#d74f4f] ml-1">
								2 days off
							</Text>
						</>
					)}
				</View>
				<Entypo name="dots-three-vertical" size={20} color="#f1f5f9" />
			</View>
		</View>
	);
}
