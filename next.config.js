module.exports = {
    reactStrictMode: false,
    eslint: {
        dirs: ['pages', 'components', 'util'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    }
};
