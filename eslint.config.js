// eslint.config.js
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

// Shared Rules (có thể tái sử dụng)
const commonRules = {
	"no-await-in-loop": "error",
	camelcase: "error",
	"no-use-before-define": "error",
};

// Shared Settings
const commonSettings = {
	tailwindcss: {
		callees: ["clsx", "classnames"],
	},
};

const eslintConfig = typescriptEslint.config(
	{
		name: "base",
		plugins: {
			tailwindcss: eslintPluginTailwindCSS,
		},
		extends: [eslintJS.configs.recommended],
		languageOptions: {
			globals: {
				...globals.builtin,
			},
		},
		rules: commonRules,
	},
	{
		name: "typescript",
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		extends: [...typescriptEslint.configs.recommendedTypeChecked],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
		},
	},
	{
		name: "react",
		extends: [eslintPluginReact.configs.flat["jsx-runtime"]],
		plugins: {
			"react-hooks": patchedReactHooksPlugin,
			"react-refresh": eslintPluginReactRefresh,
		},
		settings: commonSettings,
		rules: {
			"react/jsx-boolean-value": "error",
			"react-hooks/exhaustive-deps": "error",
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		},
	},
	eslintConfigPrettier
);

// Apply files filter
eslintConfig.forEach((config) => {
	config.files = ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx"];
});

export default eslintConfig;
