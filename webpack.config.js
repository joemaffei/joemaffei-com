module.exports = {
  resolve: {
    fallback: {
      https: require.resolve("node:https"),
    },
  },
};
