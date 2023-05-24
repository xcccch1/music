<template>
  <div>
    <img src="../../assets/logo.png" alt="" />
    <van-form @submit="onSubmit" label-align="center" style="width: 80vw;margin: 0 auto;">
      <div style="background-color: #212121;border-radius: 15px;">
        <van-field v-model="username" name="用户名" label="邮箱" placeholder="邮箱" :rules="[{ required: true, message: '' }]"
          clearable />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '' }]" />
      </div>
      <div style="margin: 50px 16px 16px 16px ">
        <van-button round block type="info" native-type="submit" color="#212121">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style></style>