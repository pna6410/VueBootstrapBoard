<template>
  <div>
    <!-- v-model : 지정한 변수의 값을 input 창에 넣어준다. (value 같은 기능) -->
    <b-input v-model="subject" placeholder="제목을 입력해 주세요"></b-input>
    <b-form-textarea
      id="textarea"
      v-model="context"
      placeholder="내용을 입력해 주세요"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <b-button @click="updateMode ? updateContent() : uploadContent()">저장</b-button>
    <b-button @click="cancel">취소</b-button>
  </div>
</template>
<script>
import data from '@/data'

export default {
  name: 'Create',
  data() {
    return {
      subject: '',
      context: '',
      userId: 1,
      createdAt: '2019-04-17 11:35:42',
      updatedAt: null,
      updateObject : null,
      updateMode : this.$route.params.contentId > 0 ? true : false // 등록인지 수정인지 구분하기 위해 contentId값이 넘어오면 수정이고 아니면 등록으로 처리
    }
  },
  created() { // 페이지가 열리는 과정에서 호출되는 코드
    if (this.$route.params.contentId > 0) {
      const contentId = Number(this.$route.params.contentId)
      this.updateObject = data.Content.filter(item => item.content_id === contentId)[0]
      this.subject = this.updateObject.title;
      this.context = this.updateObject.context;
    }
  },
  methods: {
    uploadContent() { // 글쓰기인 경우
      let items = data.Content.sort((a,b) => {return b.content_id - a.content_id})
      const content_id = items[0].content_id +1 // 정렬 후 가장 큰 값에 1을 더한 값을 아이디로 준다. (새 글을 등록했기 때문)
      data.Content.push({
        content_id: content_id,
        user_id: this.userId,
        title: this.subject,
        context: this.context,
        created_at: this.createdAt,
        updated_at: this.updatedAt
      })
      this.$router.push({
        path: '/board/free/'
      })
    },
    updateContent() { // 수정인 경우
      this.updateObject.title = this.subject;
      this.updateObject.context = this.context;
      this.$router.push({
        path: '/board/free/'
      })
    },
    cancel() { // 취소 메인페이지로 돌아감
      this.$router.push({
        path: '/board/free/'
      })
    }
  }
}
</script>
