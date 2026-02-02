import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../../global.css";

export default function RootLayout() {
	return (
		<ThemeProvider value={DarkTheme || DefaultTheme}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
