/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				backgroundBase: "#121212",
				evevatedBase: "#1f1f1f",
				evevatedHighlight: "#2a2a2a",
			},
			fontFamily: {
				primary: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
