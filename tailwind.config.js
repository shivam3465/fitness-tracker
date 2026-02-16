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
				primary: "#0b0b0b",
				secondary: "#1c1c1e",
				active: "#eeeeee",
				inActive: "#737373",
			},
		},
	},
	plugins: [],
};
