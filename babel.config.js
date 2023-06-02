module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      ["@babel/plugin-proposal-decorators", { version: "legacy" }],
      [
        "module-resolver",
        {
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.jsx",
            ".android.jsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx"
          ],
          alias: {
            "@db": "./db",
            "@src": "./src",
            "@app": "./app",
            "@utils": "./utils",
            "@hooks": "./hooks",
            "@assets": "./assets",
            "@locales": "./locales",
            "@typings": "./typings",
            "@services": "./services",
            "@constants": "./constants",
            "@components": "./components"
          }
        }
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false
        }
      ]
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"]
      }
    }
  }
}
