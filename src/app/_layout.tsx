import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "react-native-popup-menu";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import { Provider } from "react-redux";
import "../../global.css";
import LogExerciseHeader from "../components/LogExerciseHeader";
import store from "../redux/store";

export default function RootLayout() {
	const toastConfig = {
		success: (props: any) => (
			<BaseToast
				{...props}
				style={{
					backgroundColor: "#2f2f2f",
					borderColor: "#287225",
					borderLeftColor: "#287225",
					borderWidth: 1,
				}}
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
				text1Style={{
					color: "#ffffff",
					fontSize: 14,
					fontWeight: "600",
				}}
				text2Style={{
					color: "#9ca3af",
					fontSize: 12,
				}}
			/>
		),

		error: (props: any) => (
			<ErrorToast
				{...props}
				style={{
					backgroundColor: "#2f2f2f",
					borderLeftColor: "#ef4444",
				}}
				text1Style={{
					color: "#ffffff",
					fontSize: 14,
					fontWeight: "600",
				}}
				text2Style={{
					color: "#9ca3af",
					fontSize: 12,
				}}
			/>
		),
	};
	return (
		<>
			<MenuProvider>
				<Provider store={store}>
					<ThemeProvider value={DarkTheme || DefaultTheme}>
						<Stack
							screenOptions={{
								headerShown: false,
								animation: "ios_from_right",
								animationDuration: 350,
								contentStyle: {
									backgroundColor: "#1c1c1e",
								},
							}}>
							<Stack.Screen
								name="index"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="(tabs)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="list-exercise"
								options={{
									headerShown: true,
									headerTitle: "Exercise List",
								}}
							/>
							<Stack.Screen
								name="log-exercise"
								options={{
									headerShown: true,
									headerTitle: "Log Exercise",
									header: () => {
										return <LogExerciseHeader />;
									},
								}}
							/>
							<Stack.Screen
								name="new-exercise"
								options={{
									headerTitle: "New Exercise",
									headerShown: true,
								}}
							/>
							<Stack.Screen
								name="new-category"
								options={{
									headerTitle: "New Muscle Category",
									headerShown: true,
								}}
							/>
						</Stack>
						<StatusBar style="auto" />
					</ThemeProvider>
				</Provider>
			</MenuProvider>

			{/* Toast container for rendering toast */}
			<Toast config={toastConfig} position="bottom" bottomOffset={30} />
		</>
	);
}
