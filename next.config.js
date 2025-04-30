// next.config.js
module.exports = {
    trailingSlash: true,
    exportPathMap: async function () {
      return {
        '/': { page: '/' },
      };
    },
  };