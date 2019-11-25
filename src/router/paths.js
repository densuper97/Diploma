/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [{
    path: '/dashboard',
    // Relative to /src/views
    name: 'Домашняя страница',
    view: 'Dashboard'
  },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   view: 'UserProfile'
  // },
  {
    path: '/student/:id', 
    name: 'Профиль студента',
    view: 'StudentProfile'
  },
  {
    path: '/recognize',
    name: 'Распознавание лиц',
    view: 'Recognize'
  },
  // {
  //   path: '/table-list',
  //   name: 'Table List',
  //   view: 'TableList'
  // },
  // {
  //   path: '/typography',
  //   view: 'Typography'
  // },
  // {
  //   path: '/icons',
  //   view: 'Icons'
  // },
  // {
  //   path: '/maps',
  //   view: 'Maps'
  // },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  // {
  //   path: '/upgrade',
  //   name: 'Upgrade to PRO',
  //   view: 'Upgrade'
  // },
  {
    path: '/students',
    name: 'Студенты',
    view: 'Students'
  }
]