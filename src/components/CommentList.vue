<template>
  <div>
    <div :key="item.comment_id" v-for="item in comments">
      <CommentListItem :commentObj="item" :reloadComments="reloadComments"/>
    </div>
    <CommentCreate :contentId="contentId" :reloadComments="reloadComments"/>
  </div>
</template>
<script>
import data from '@/data';
import CommentListItem from './CommentListItem';
import CommentCreate from './CommentCreate';

export default {
  name: 'CommentList',
  components: {
    CommentListItem,
    CommentCreate
  },
  props: { // 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 사용 (자식은 props를 선언하여 부모의 데이터를 받고, 부모는 v-bind나 :키워드를 통해 자식의 데이터를 받음)
    contentId: Number,
  },
  data() {
    return {
      comments: data.Comment.filter(item => item.content_id === this.contentId)
    }
  },
  methods: {
    reloadComments() { //comment 배열의 변화를 바로 확인할 수 있도록 새로 가져옴
      this.comments = data.Comment.filter(item => item.content_id === this.contentId)
    }
  }

}
</script>
