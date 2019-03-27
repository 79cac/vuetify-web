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
    	},
    	'/getFlowList': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/getTaskList': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/addTask': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/getProgress': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/publish': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/getReleaseInfo': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/loadTask': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
    	'/getDevicesInfo': {
      		target: 'http://192.168.233.150',
    		changeOrigin: true
    	},
        '/xml': {
            target: 'http://192.168.233.150',
            changeOrigin: true
        },
        '/finishRelease': {
            target: 'http://192.168.233.150',
            changeOrigin: true
        }
    }
  }
}
