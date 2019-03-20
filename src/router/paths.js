/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/info-board',
    // Relative to /src/views
    name: '信息面板',
    view: 'InfoBoard'
  },
  {
    path: '/user-profile',
    name: '用户信息',
    view: 'UserProfile'
  },
  {
    path: '/flow-list',
    name: '流量列表',
    view: 'FlowList'
  },
  {
    path: '/device-management',
    name: '设备管理',
    view: 'DeviceManagement'
  },
  {
    path: '/flow-release',
    name: '流量释放',
    view: 'FlowRelease'
  },
  {
    path: '/logIn',
    name: 'logIn',
    view: 'LogIn'
  }
]
