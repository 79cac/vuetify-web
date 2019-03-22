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
    	},
    	'/changePW': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/logInfo': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/listAll': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/searchById': {
    		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/load': {
     		target: 'http://192.168.233.150',
    		changeOrigin: true   		
    	},
    	'/showDetails': {
     		target: 'http://192.168.233.150',
    		changeOrigin: true      		
    	},
    	'/searchByName': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true     		
    	}
    }
  }
}
