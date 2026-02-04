import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StorageService } from "../services/storage.services";
import { MuscleGroup } from "../types/MuscleGroup";

export default function NewCategoryScreen() {
	const [categoryName, setCategoryName] = useState("");
	const [categoryList, setCategoryList] = useState<MuscleGroup[]>([]);
	const [storedCategories, setStoredCategories] = useState<MuscleGroup[]>([]);

	const filterCategory = (categoryName: string) => {
		categoryName = categoryName.trim();
		setCategoryName(categoryName);

		if (categoryName.trim() === "") {
			setCategoryList(storedCategories);
			return;
		}

		const filteredCategories = categoryList.filter((item) =>
			item.name.toLowerCase().includes(categoryName.toLowerCase()),
		);
		setCategoryList(filteredCategories);
	};

	const createCategory = async () => {
		if (!categoryName.trim()) return;

		const newCategory: MuscleGroup = {
			id: Date.now().toString(),
			name: categoryName.trim(),
		};

		const updated = await StorageService.addCategory(newCategory);

		setCategoryList(updated);
		setCategoryList(updated);
		setCategoryName("");
	};

	const deleteCategory = async (id: string) => {
		const updated = categoryList.filter((item) => item.id !== id);
		await StorageService.saveCategories(updated);
		setCategoryList(updated);
	};

	useEffect(() => {
		const load = async () => {
			const storedCategories = await StorageService.getCategories();
			setCategoryList(storedCategories);
			setStoredCategories(storedCategories);
		};
		load();
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-secondary px-4 relative">
			<View className="mb-6">
				<Text className="text-white text-lg mb-3">
					New Muscle Category
				</Text>
				<TextInput
					placeholder="Category Name"
					placeholderTextColor="#666"
					className="bg-[#262627] text-white p-4 rounded-xl border border-[#3a4049]"
					value={categoryName}
					onChangeText={filterCategory}
				/>
			</View>

			<View className="mb-6">
				<Text className="text-[#898989] text-lg">
					Existing Muscle Category
				</Text>
			</View>

			<View className="flex-1 items-center justify-center w-full h-full">
				<FlatList
					className="flex-1 h-full w-full"
					data={categoryList}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={
						<View className="flex-1 items-center justify-center">
							<Text className="text-gray-500 text-center mb-12 text-lg">
								No existing Muscle Category found
							</Text>
						</View>
					}
					renderItem={({ item }) => (
						<View className="bg-[#1c1c1e] px-4 py-2 mb-3 rounded-lg flex-row justify-between items-center w-full border-[1px] border-[#2e2f31]">
							<View className="w-full flex flex-row items-center justify-between">
								<Text className="text-[#cecece] font-semibold text-lg">
									{item.name}
								</Text>

								<TouchableOpacity
									onPress={() => deleteCategory(item.id)}>
									<MaterialIcons
										name="delete"
										size={22}
										color={"#f97316"}
									/>
								</TouchableOpacity>
							</View>
						</View>
					)}></FlatList>
			</View>

			<View className="mb-8 bg-secondary w-full">
				<TouchableOpacity
					disabled={!categoryName.trim()}
					className={` p-4 rounded-xl w-full ${categoryName ? "bg-orange-500" : "bg-[#3a4049]"} `}
					onPress={createCategory}>
					<Text
						className={`${categoryName ? "text-white" : "text-gray-500"} text-center font-semibold text-lg`}>
						Create New Category
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
