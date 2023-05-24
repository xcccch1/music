<template>
    <div>
        <img src="../../assets/logo.png" alt="" />
        <van-form label-align="center" style="width: 80vw;margin: 0 auto;">
            <div style="background-color: #212121;border-radius: 15px;">
                <van-field v-model="phoneNum" name="手机号码" label="手机号码" placeholder="手机号码"
                    :rules="[{ required: true, message: '' }]" clearable />
                <van-field v-model="code" name="验证码" center clearable label="验证码" placeholder="验证码">
                    <template #button>
                        <van-button size="small" type="primary" color="#414141" round :disabled="codeStatus"
                            @click="getCode">{{ sendCode }}</van-button>
                    </template>
                </van-field>
            </div>
            <div style="margin: 50px 16px 16px 16px ">
                <van-button round block type="info" @click="checkCode" native-type="submit" color="#212121">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { getCodeAPI, checkCodeAPI, checkLoginStatusAPI } from '@/api/index';
export default {
    name: "Code",
    data() {
        return {
            phoneNum: "",
            code: "",
            codeStatus: false,
            sendCode: "发送验证码",
        }
    },
    methods: {
        onSubmit(values) {
            console.log("submit", values);
        },
        getCode() {
            const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (reg_tel.test(this.phoneNum)) {
                getCodeAPI(this.phoneNum)
                this.codeStatus = true;
                this.sendCode = 5
                this.timer = setInterval(() => {
                    this.sendCode--
                }, 1000)
            } else {
                this.$toast.fail('手机号码有误');
            }
        },
        checkCode() {
            try {
                checkCodeAPI(this.phoneNum, this.code).then(async res => {
                    if (res.data.code == 200) {
                        const status = await checkLoginStatusAPI()
                        console.log(status);
                    }
                }).catch(error => {
                    this.$toast.fail(error.response.data.message)
                })
            } catch (error) {
                console.log(error);
            }
        }
    },
    watch: {
        sendCode(newvalue) {
            if (newvalue == 0) {
                clearInterval(this.timer)
                this.sendCode = "发送验证码"
                this.codeStatus = false
            }
        }
    }
}
</script>

<style></style>