export default [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    children: [
      {
        name: '分析页',
        path: '/analysis',
        models: ['/chart'],
        page: '/Dashboard/Analysis',
      },
      {
        name: '监控页',
        path: '/monitor',
        models: ['/monitor'],
        page: '/Dashboard/Monitor',
      },
      {
        name: '工作台',
        path: '/workplace',
        models: ['/project', '/activities', '/chart'],
        page: '/Dashboard/Workplace',
      },
    ],
  },
  {
    name: '表单页',
    path: '/form',
    icon: 'form',
    children: [
      {
        name: '基础表单',
        path: '/basic-form',
        models: ['/form'],
        page: '/Forms/BasicForm',
      },
      {
        name: '分步表单',
        path: '/step-form',
        models: ['/form'],
        page: '/Forms/StepForm',
        children: [
          {
            path: '/confirm',
            models: ['/form'],
            page: '/Forms/StepForm/Step2',
          },
          {
            path: '/result',
            models: ['/form'],
            page: '/Forms/StepForm/Step3',
          },
        ],
      },
      {
        name: '高级表单',
        path: '/advanced-form',
        models: ['/form'],
        page: '/Forms/AdvancedForm',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: '/list',
    children: [
      {
        name: '查询表格',
        path: '/table-list',
        models: ['/rule'],
        page: '/List/TableList',
      },
      {
        name: '标准列表',
        path: '/basic-list',
        models: ['/list'],
        page: '/List/BasicList',
      },
      {
        name: '卡片列表',
        path: '/card-list',
        models: ['/list'],
        page: '/List/CardList',
      },
      {
        name: '搜索列表',
        path: '/search',
        page: '/List/List',
        children: [{
          name: '搜索列表（项目）',
          path: '/projects',
          models: ['/list'],
          page: '/List/Projects',
        }, {
          name: '搜索列表（应用）',
          path: '/applications',
          models: ['/list'],
          page: '/List/Applications',
        }, {
          name: '搜索列表（文章）',
          path: '/articles',
          models: ['/list'],
          page: '/List/Articles',
        }],
      },
    ],
  },
  {
    name: '详情页',
    path: '/profile',
    icon: 'profile',
    children: [
      {
        name: '基础详情页',
        path: '/basic',
        models: ['/profile'],
        page: '/Profile/BasicProfile',
      },
      {
        name: '高级详情页',
        path: '/advanced',
        models: ['/profile'],
        page: '/Profile/AdvancedProfile',
      },
    ],
  },
  {
    name: '结果',
    path: '/result',
    icon: 'check-circle-o',
    children: [
      {
        name: '成功',
        path: '/success',
        page: '/Result/Success',
      },
      {
        name: '失败',
        path: '/fail',
        page: '/Result/Error',
      },
    ],
  },
  {
    name: '异常',
    path: '/exception',
    icon: 'warning',
    children: [
      {
        name: '403',
        path: '/403',
        page: '/Exception/403',
      },
      {
        name: '404',
        path: '/404',
        page: '/Exception/404',
      },
      {
        name: '500',
        path: '/500',
        page: '/Exception/500',
      },
    ],
  },
]
