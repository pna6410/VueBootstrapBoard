<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <div>{{name}}</div>
        <div>{{commentObj.created_at}}</div>
      </div>
      <div class="comment-list-item-context">{{commentObj.context}}</div>
      <div class="comment-list-item-button">
        <b-button variant="info">수정</b-button>
        <b-button variant="info" @click="deleteComment">삭제</b-button>
        <b-button variant="info" @click="subCommentToggle">덧글 달기</b-button>
      </div>
    </div>
    <template v-if="subCommentCreateToggle">
      <!-- isSubComment 값이 true이면 대댓글 아니면 댓글이다. comment_id 는 댓글 id 값이다. reloadSubComments 함수와 subCommentCreateToggle 함수를 자식도 사용할 수 있게 넘긴다.-->
      <CommentCreate
        :isSubComment="true"
        :commentId="commentObj.comment_id"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
      />
    </template>
    <template v-if="subCommentList.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_id"
        v-for="item in subCommentList"
      >
      <div class="comment-list-item-name">
        <div>{{item.user_name}}</div>
        <div>{{item.created_at}}</div>
      </div>
      <div class="comment-list-item-context">{{item.context}}</div>
      <div class="comment-list-item-button">
        <b-button variant="info">수정</b-button>
        <b-button variant="info">삭제</b-button>
      </div>
      </div>
    </template>
  </div>
</template>
<script>
import data from '@/data';
import CommentCreate from './CommentCreate'

export default {
  name: "CommentListItem",
  props: {
    commentObj: Object,
    reloadComments: Function,
  },
  components: {
    CommentCreate
  },
  data() {
    return {
      name: data.User.filter(
        item => item.user_id === this.commentObj.user_id
      )[0].name,
      subCommentList: data.SubComment.filter(
        item => item.comment_id === this.commentObj.comment_id
      ).map(subCommentItem => ({
        ...subCommentItem,
        user_name: data.User.filter(
          item => item.user_id === subCommentItem.user_id
        )[0].name
      })),
      subCommentCreateToggle: false,
    };
  },
  methods: {
    subCommentToggle() { // 토글 on/off
      this.subCommentCreateToggle = !this.subCommentCreateToggle;
    },
    reloadSubComments() { // SubComment 배열의 변경된 데이터를 다시 가져오는 기능
      this.subCommentList = data.SubComment.filter(
        item => item.comment_id === this.commentObj.comment_id
      ).map(subCommentItem => ({
        ...subCommentItem,
        user_name: data.User.filter(
          item => item.user_id === subCommentItem.user_id
        )[0].name
      }))
    },
    deleteComment() { // 댓글 삭제
      const comment_index = data.Comment.findIndex(item => item.comment_id === this.commentObj.comment_id);
      data.Comment.splice(comment_index, 1);
      // 댓글의 대댓글 삭제 처리도 해줘야됨
      this.reloadComments();
    }
    // 댓글 수정은 나중에 하자
  }
};
</script>

<style scoped>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}
.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
}
.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}
.btn {
  margin-bottom: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
</style>
