import Toast from "react-native-toast-message";

const DEFAULT_TIME = 500;

export const showSuccess = (
	title: string,
	message?: string,
	visibilityTime?: number,
) =>
	Toast.show({
		type: "success",
		text1: title,
		text2: message,
		visibilityTime: visibilityTime || DEFAULT_TIME,
	});

export const showError = (
	title: string,
	message?: string,
	visibilityTime?: number,
) =>
	Toast.show({
		type: "error",
		text1: title,
		text2: message,
		visibilityTime: visibilityTime || DEFAULT_TIME,
	});
