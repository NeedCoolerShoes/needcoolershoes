import { globSync } from "glob";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import terser from "@rollup/plugin-terser";

export default {
	input: globSync("app/assets/javascripts/*.*"),
	output: {
		format: "es",
		dir: "app/assets/builds",
    assetFileNames: "[name]-[hash].digested[extname]",
		chunkFileNames: "[name]-[hash].digested.js",
		manualChunks(id) {
			if (id.includes("node_modules/")) {
				const regex = /node_modules\/(?<name>[^\/]+)/
				const name = id.match(regex)?.groups?.name;
				if (name && name.length > 0) {
					return name;
				}
			}

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
		terser(),
	],
};