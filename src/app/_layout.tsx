import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../../global.css";
import AddExerciseHeader from "../components/AddExerciseHeader";

export default function RootLayout() {
	return (
		<ThemeProvider value={DarkTheme || DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="add-exercise"
					options={{
						header: () => <AddExerciseHeader />,
					}}
				/>
				<Stack.Screen
					name="new-exercise"
					options={{ headerTitle: "New Exercise" }}
				/>
				<Stack.Screen
					name="new-category"
					options={{ headerTitle: "New Muscle Category" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
