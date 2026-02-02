import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { formatWorkoutDate } from "../utils/date.utils";

interface Props {
	translateY: Animated.AnimatedInterpolation<number>;
}

export default function Header() {
	const [isConsistent, setIsConsistent] = useState(true);
	const [date, setDate] = useState(new Date());

	const onDateChange = (direction: number) => {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + direction);
		setDate(newDate);
	};

	return (
		<View>
			{/* Main header  */}
			<View className="flex-row items-center justify-between border-b-[1px] border-slate-800 p-4 bg-[#111111] h-[60px]">
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
					<Entypo
						name="dots-three-vertical"
						size={20}
						color="#f1f5f9"
					/>
				</View>
			</View>

			{/* Date header  */}
			<View className="flex-row items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#111111] h-[41px]">
				<Pressable onPress={() => onDateChange(-1)}>
					<AntDesign name="left" size={18} color="#f1f5f9" />
				</Pressable>

				<Text className="text-slate-100 text-base font-medium">
					{formatWorkoutDate(date)}
				</Text>

				<Pressable onPress={() => onDateChange(1)}>
					<AntDesign name="right" size={18} color="#f1f5f9" />
				</Pressable>
			</View>
		</View>
	);
}
