module.exports = {
  devServer: {
    proxy: {
    	'/signIn': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/logOut': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	}
    }
  }
}
