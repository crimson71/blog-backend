import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/visitcount',
    name: 'backendhome',
    component: () => import('@/views/BackendHome.vue'),
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/TestPage.vue')
      },

      {
        path: '/articledetail/:id',
        name: 'articledetail',
        component: () => import('@/views/ArticleDtail.vue')
      },
      {
        path: '/articleedit/:id',
        name: 'articleedit',
        component: () => import('@/views/ArticleEdit.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/ArticlePage.vue')
      },
      {
        path: '/addarticle',
        name: 'addarticle',
        component: () => import('@/views/ArticleAdd.vue')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/commentPage.vue')
      },
      {
        path: '/visitcount',
        name: 'visitcount',
        component: () => import('@/views/VisitCount.vue')
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('@/views/ClassifyPage.vue')
      }

    ]

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
