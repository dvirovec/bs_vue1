module.exports = {
    devServer: {
      proxy: {
        '^/erp': {
          target: 'http://localhost:8888',        
          changeOrigin: true,
        },
      },
    },
  };