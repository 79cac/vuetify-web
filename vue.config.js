module.exports = {
  devServer: {
    proxy: {
    	'/signIn': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/logout': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	}
    }
  }
}
