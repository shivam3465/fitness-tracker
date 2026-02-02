import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, Text, View } from "react-native";
import { formatWorkoutDate } from "../utils/date.utils";

interface Props {
	date: Date;
	onPrev: () => void;
	onNext: () => void;
}

export default function DateHeader({ date, onPrev, onNext }: Props) {
	return (
		<View className="flex-row items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#111111] h-[41px]">
			<Pressable onPress={onPrev}>
				<AntDesign name="left" size={18} color="#f1f5f9" />
			</Pressable>

			<Text className="text-slate-100 text-base font-medium">
				{formatWorkoutDate(date)}
			</Text>

			<Pressable onPress={onNext}>
				<AntDesign name="right" size={18} color="#f1f5f9" />
			</Pressable>
		</View>
	);
}
