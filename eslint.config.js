import { fixupPluginRules } from "@eslint/compat";
import eslintJS from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import eslintPluginTailwindCSS from "eslint-plugin-tailwindcss";
const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const baseESLintConfig = {
	name: "eslint",
	extends: [
		eslintJS.configs.recommended, // Sử dụng các quy tắc mặc định của ESLint
	],
	rules: {
		"no-await-in-loop": "error", // Cấm sử dụng await trong vòng lặp
		camelcase: "error", // Bắt buộc dùng camelCase cho biến
		"no-use-before-define": "error", // Cấm sử dụng biến trước khi khai báo
	},
};

const typescriptConfig = {
	name: "typescript",
	extends: [...typescriptEslint.configs.recommendedTypeChecked],
	languageOptions: {
		parser: tsParser, // Sử dụng trình phân tích cú pháp TypeScript
		parserOptions: {
			project: "./tsconfig.json", // Đọc cấu hình từ tsconfig.json
		},
		globals: {
			...globals.builtin, // Các biến toàn cục như console, window
		},
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": "error", // Bắt buộc khai báo kiểu trả về
		"@typescript-eslint/no-unused-vars": "error", // Cảnh báo biến không dùng
		"@typescript-eslint/no-misused-promises": [
			"error",
			{ checksVoidReturn: { attributes: false } },
		],
	},
};

const reactConfig = {
	name: "react",
	extends: [eslintPluginReact.configs.flat["jsx-runtime"]],
	plugins: {
		"react-hooks": patchedReactHooksPlugin,
		"react-refresh": eslintPluginReactRefresh,
	},
	rules: {
		"react/jsx-boolean-value": "error", // Bắt buộc chỉ định giá trị boolean
		"react-hooks/exhaustive-deps": "error", // Kiểm tra các dependency trong useEffect
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
	settings: {
		tailwindcss: {
			callees: ["clsx", "classnames"], // Hỗ trợ các thư viện merge class
		},
	},
};

const eslintConfig = typescriptEslint.config(
	baseESLintConfig, // Quy tắc chung
	typescriptConfig, // Hỗ trợ TypeScript
	eslintConfigPrettier,
	reactConfig
);

eslintConfig.map((config) => {
	config.files = ["src/**/*.ts", "src/**/*.tsx"];
});

export default eslintConfig;
