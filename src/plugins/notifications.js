import Vue from 'vue'

import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.prototype.$notify.error = function (msg) {
	return Vue.prototype.$notify({
		group: 'foo',
		type: 'error',
		text: msg
	})
}

Vue.prototype.$notify.success = function (msg) {
	return Vue.prototype.$notify({
		group: 'foo',
		type: 'success',
		text: msg
	})
}

Vue.prototype.$notify.warn = function (msg) {
	return Vue.prototype.$notify({
		group: 'foo',
		type: 'warn',
		text: msg
	})
}