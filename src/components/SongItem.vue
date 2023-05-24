<template>
  <van-cell center :title="name" :label="author" @click="play">
    <template #icon>
      <van-icon :name="picUrl" class="songJpg" v-lazy="picUrl"/>
    </template>
    <template #default>
      <van-icon name="play-circle-o" size="0.6rem" />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: "SongItem",
  props: {
    name: String,
    author: String,
    id: Number,
    picUrl:String
  },
  data() {
    return {};
  },
  methods: {
    play() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.songJpg{
  margin-right: 0.3rem;
}

.songJpg img{
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.3rem;
}
</style>
