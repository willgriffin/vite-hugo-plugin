"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("./utils");
function hugoPlugin({ hugoOutDir, appDir, ignoreHTMLFiles = [] }) {
    const hugoConfig = (0, utils_1.getHugoConfig)(appDir);
    const ignoreBuildPaths = [];
    // Ignore default content language as hugo build it into out dir instead of language dir.
    if (hugoConfig.defaultContentLanguage) {
        ignoreBuildPaths.push((0, path_1.resolve)(hugoOutDir, hugoConfig.defaultContentLanguage));
    }
    const hugo = {
        name: 'vite-plugin-hugo',
        config: () => ({
            root: hugoOutDir,
            resolve: {
                // Resolve aliases
                alias: {
                    // Resolving path in imports.
                    js: (0, path_1.resolve)(appDir, 'assets', 'js'),
                    '/assets': (0, path_1.resolve)(appDir, 'assets'),
                    '/plugins': (0, path_1.resolve)(hugoOutDir, 'plugins'),
                }
            },
            build: {
                // Build vite into the same directory as hugo
                outDir: hugoOutDir,
                // Vite will build app on top of the files generated by hugo build.
                emptyOutDir: false,
                rollupOptions: {
                    // Routing
                    input: (0, utils_1.getHtmlPages)(hugoOutDir, [...ignoreBuildPaths, ...ignoreHTMLFiles])
                }
            }
        })
    };
    return hugo;
}
exports.default = hugoPlugin;
