import { globSync } from "glob";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import { minify } from "rollup-plugin-esbuild-minify";

export default {
	input: globSync("app/assets/javascripts/*.*"),
	output: {
		format: "es",
		dir: "app/assets/builds",
    assetFileNames: "[name]-[hash].digested[extname]",
		chunkFileNames: "[name]-[hash].digested.js",
		manualChunks(id) {
			if (id.includes("node_modules/three/")) return "three";
			if (id.includes("node_modules/ajv/")) return "ajv";

			return null;
		},
	},
	plugins: [
		url({
			include: ["**/*.svg", "**/*.png", "**/*.jp(e)?g", "**/*.gif", "**/*.webp", "**/*.css"],
			limit: 0,
			publicPath: "/assets/",
			fileName: "[name]-[hash].digested[extname]"
		}),
		json(),
		commonjs(),
		nodeResolve({browser: true}),
		minify(),
	],
};