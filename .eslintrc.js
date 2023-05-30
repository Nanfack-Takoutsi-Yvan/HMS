/* eslint-disable no-undef */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "react-native/react-native": true,
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react",
        "prettier",
        "react-native",
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
              "semi": false,
              "endOfLine": "auto",
              "singleQuote": false,
              "arrowParens": "avoid",
              "trailingComma": "none"
            }
          ],
        "camelcase": "off",
        "no-shadow": "off",
        "react/prop-types": 0,
        "global-require": "off",
        "import/extensions": "off",
        "no-use-before-define": "off",
        "react/react-in-jsx-scope": "off",
        "react/no-unescaped-entities": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "@typescript-eslint/no-shadow": ["error"],
        "import/no-extraneous-dependencies": "off",
        "react/no-unstable-nested-components": "off"
    }
}
