<template>
  <div>
    <b-card>
      <div class="content-detail-content-info">
        <div class="content-detail-content-info-left">
          <div class="content-detail-content-info-left-number">
            {{contentId}}
          </div>
          <div class="content-detail-content-info-left-subject">
            {{title}}
          </div>
        </div>
        <div class="content-detail-content-info-right">
          <div class="content-detail-content-info-right-user">
            글쓴이: {{user}}
          </div>
          <div class="content-detail-content-info-right-created">
            등록일: {{created}}
          </div>
        </div>
      </div>
      <div class="content-detail-content">
        {{context}}
      </div>
      <div class="content-detail-button">
        <b-button variant="primary" @click="updateData">수정</b-button>
        <b-button variant="success" @click="deleteData">삭제</b-button>
        <b-button variant="secondary" @click="cancel">목록</b-button>
      </div>
      <div class="content-detail-comment">
        <CommentList :contentId="contentId"/>  <!-- script에서 등록한 자식 컴포넌트를 html에서 호출 -->
      </div>
    </b-card>
  </div>
</template>

<script>
import data from "@/data";
import CommentList from './CommentList';

export default {
  name: "ContentDetail",
  components: { // 부모 컴포넌트에서 자식 컴포넌트를 등록해준다.
    CommentList
  },
  data() {
    const contentId = Number(this.$route.params.contentId); // url로 받은 파라미터 값을 $route.params로 가져올 수 있다. (router 파일에서 지정한 이름을 .뒤에 붙이면 가져올 수 있다.)
    const contentData = data.Content.filter(item => item.content_id === contentId)[0] // data 파일의 Content 배열에서 해당 contentId 값을 가진 item의 정보를 가져온다.
    return {
      contentId: contentId,
      title: contentData.title,
      context: contentData.context,
      user: data.User.filter(item => item.user_id === contentData.user_id)[0].name,
      created: contentData.created_at
    };
  },
  methods: {
    deleteData() {
      const content_index = data.Content.findIndex(item => item.content_id === this.contentId); // findIndex() :  Content 배열에서 content_id 값을 가진 배열의 인덱스 값을 가져온다.
      data.Content.splice(content_index, 1) // splice : 배열에서 지정한 인덱스를 삭제하는 기능
      this.$router.push({
        path: '/board/free' // 게시판 페이지로 이동
      })
    },
    updateData() {
      this.$router.push({
        path: `/board/free/create/${this.contentId}` // id값을 들고 글쓰기 페이지로 이동
      })
    },
    cancel() { // 취소 메인페이지로 돌아감
      this.$router.push({
        path: '/board/free/'
      })
    }
  }
};
</script>
<style scoped>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row; /* flex-direction : 자식들의 정렬방향을 정하는 속성 (총 4개의 속성을 가진다. row, row-reverse column, column-reverse)  > row는 수평, column은 수직 정렬 / reverse는 반대로*/
  justify-content: space-between; /* 메인 축 방향으로 아이템들을 정렬하는 속성 */
  align-items: center; /* 수직축 방향으로 아이템들을 정렬 */
  padding: 1rem;
}

.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}

.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>
