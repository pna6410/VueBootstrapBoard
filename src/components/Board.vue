<template>
  <div>
    <!-- b-table : 부트스트랩 테이블 태그
      :items=""  스크립트에 선언된 값을 가져온다. :fields 테이블 열 머리글을 지정하고 데이터 열이 표시되는 순서를 지정하는 데 사용된다. -->
    <b-table striped hover :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" @row-clicked="rowClick"></b-table> <!-- item 배열에 선언되 갯수만큼 나온다. -->
    <!-- b-pagination : 부트스트랩 페이지네이션 태그
      v-model에 현재페이지, :total-rows에 전체 아이템 갯수, :per-page에 페이지당 보여줄 아이템 갯수 -->
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
    ></b-pagination>
    <b-button @click="writeContent">글쓰기</b-button>
  </div>
</template>

<script>
import data from '@/data'

export default {
  name: 'Board',
  data() {
    // sort() 문자정렬을 해준다.  숫자 정렬을 하려면 안에 함수를 만들어 a-b(오름차), b-a(내림차)를 넣어주면 된다.
    let items = data.Content.sort((a,b) => {return b.content_id - a.content_id})
    // map()    메서드는 배열 내의 모든 요소를 돌면서 주어진 함수의 결과를 모아 새로운 배열을 리턴한다.
    // filter() 메서드는 배열 내의 모든 요소를 돌면서 주어진 함수의 조건에 맞는 요소만을 모아 새로운 배열을 리턴한다.
    items = items.map(contentItem => {return{... contentItem, user_name: data.User.filter(userItem => userItem.user_id === contentItem.user_id)[0].name}})
    return {
      currentPage: 1,
      perPage: 10,
      fields: [
        {
          key: 'content_id', // 값
          label: '글번호'    // 컬럼명
        },
        {
          key: 'title',
          label: '제목'
        },
        {
          key: 'created_at',
          label: '작성일'
        },
        {
          key: 'user_name',
          label: '글쓴이'
        },
      ],
      items: items
    }
  },
  methods: {
    rowClick(item, index, e) {
      this.$router.push({
        path: `/board/free/detail/${item.content_id}` // 게시글의 구분 키값인 content_id 값을 url 뒤에 붙여 넘긴다.
      })
    },
    writeContent() {
      this.$router.push({
        path:'/board/free/create'
      })
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  }
}
</script>
