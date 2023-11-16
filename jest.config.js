// jest.config.js
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	moduleNameMapper: {
		// Handle module aliases (if you have them in your tsconfig.json)
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		// Handle CSS imports (assuming you're using CSS modules)
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		// Handle image imports
		"\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
	},
	transform: {
		// Use babel-jest to transpile tests in the 'src' folder
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	transformIgnorePatterns: ["/node_modules/"],
	globals: {
		"ts-jest": {
			tsconfig: "<rootDir>/tsconfig.jest.json",
		},
	},
}
