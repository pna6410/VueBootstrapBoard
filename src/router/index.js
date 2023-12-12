import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'
import ContentDetail from '@/components/ContentDetail'
import Create from '@/components/Create'

Vue.use(Router)

export default new Router({
  // 페이지 하나 추가될때마다 여기에 추가해줘야 한다.
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board/free',
      name: 'Board',
      component: Board
    },
    {
      path: '/board/free/detail/:contentId', // url뒤에 붙일 파라미터 명을 설정
      name: 'ContentDetail',
      component: ContentDetail
    },
    {
      path: '/board/free/create/:contentId?', // ?는 파라미터가 있어도 되고 없어도 된다는 뜻 (?가 없으면 필수 사항)
      name: 'Create',
      component: Create
    }
  ]
})
