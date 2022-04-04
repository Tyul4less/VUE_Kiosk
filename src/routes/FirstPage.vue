<template>

    <div class='firstPageImage'>
        <div id="imgContainer">
            <img src='../assets/logistic-wallpaper.jpg' style="width: auto; max-height:100vh; object-fit:cover; ">
        </div>
    </div>
    <div class='loginDiv'>
        <div id="loginPage">

            <div style="margin-top:30px; height:25px; border: 1px solid black; width: 253px">
                <span  class="cont-btn">
                    <input v-model='account.id' class="loginText" type="text" placeholder="ID" @change="log" style="border-right:2px solid #BDBDBD;">
                    <input v-model='account.pw' class="loginText" type="text" placeholder="PW" @change="log">
                </span>
                    <span class="login-btn-div">
                    <BUtton class="login-btn" @click="login">Login</BUtton>
                </span>
            </div>
        </div>
    </div>

</template>
<script>
    import { mapState } from 'vuex';
    //import router from '@/routes/index.js';
    export default {
        created() {
            this.account.id = 'GDW'; this.account.pw = '1111';
        },
        computed:{
            ...mapState({userData: 'userData'}),
        },
        methods: {
            log() {
                this.$store.commit('setData', this.account)
            },
            login() {
                this.$store.dispatch('login', this.account)
                //router.replace({ name : 'MainPage' })
                console.log(this.userData.token)
            },
            slideShow() {
                document.querySelector("#slider").attr('src', this.img.logi)
            }
        },
        data() {
            return {
                account : [
                    {
                        id : '',
                        pw : ''
                    }
                ],
                img : [
                    {
                        logi : '../assets/logistic-wallpaper.jpg',
                        hr : '../assets/hr-software.jpg',
                        account : '../assets/265FBF4F5404587E25.png'
                    }
                ]
            }
        }
    }
</script>
<style>
    @import "./../css/BaseLayout.scss";
    body {
        margin:0;
        padding:0;
        height:100%;
        -ms-overflow-style:none;
    }
    html {
        margin:0;
        padding:0;
        height: 100%;

    }
    body::-webkit-scrollbar { display:none; }


    .cont-btn{ /*사각형*/
        float:left;
        display:block;
        width:200px;height:20px;
        background-color:white;
    }
/*    .cont-btn:after{ !*마름모*!
        content:"";
        display:block;
        position:relative;
        left:180px;
        top:-21px;
        z-index: 1;
        border-left: 21px solid white;
        border-bottom: 21px solid transparent;
    }*/
    .loginText{
        margin-top:3px;
        z-index: 2;
        border: none;
        width: 80px;
        height:18px;

    }



/* ----------------------------------*/
    .login-btn-div{ /*사각형*/
        float: right;
        position: absolute;
        margin-top:-1px;
        width:50px;
        height:25px;
        background-color:#B2EBF4;
        margin-left: 0px;
    }

    .login-btn-div:after{ /*마름모*/
        content:"";
        display:inline-flex;
        position:relative;
        left: -20px;
        top:-26px;
        z-index: 2;
        border-right: 20px solid #B2EBF4;
        border-top: 26px solid transparent;

    }
    .login-btn{
        z-index: 2;
        border: none;
        background:  #B2EBF4;
        position:relative;
        display:block;
    }
#loginPage{
    width: 80%;
    height: 80%;
    top: 50px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    border: solid 1px black;
    min-width:284px;
}

</style>