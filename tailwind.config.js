/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#121313",
				secondary: "#111111",
				active: "#eeeeee",
				inActive: "#737373",
			},
		},
	},
	plugins: [],
};
