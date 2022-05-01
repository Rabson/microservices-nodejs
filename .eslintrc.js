module.exports = {
    env: {
        jest: true,
    },
    ignorePatterns: [
        'node_modules',
    ],
    extends: ['airbnb-base'],
    parser: 'babel-eslint',
    rules: {
        'global-require': 0,
        indent: ['error', 4],
        camelcase: 'off',
        'comma-dangle': 0,
        'no-underscore-dangle': 'off',
        // 'camelcase': 0,
        // 'no-underscore-dangle': 0,
        // 'no-return-assign': 0,
    }
};
