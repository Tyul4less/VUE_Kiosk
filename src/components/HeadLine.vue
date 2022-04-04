<template>
    <header>
        <span class="Logo">
            <Button class="LogoFont" @click="Logo">
                <img src="../assets/kindpng_682827.png" style="width: 35px;"/>
            </Button>
        </span>
        <div class="userState">
            <p>{{userData.nickname}} 팀장</p>
            <p>상태: 온라인</p>
        </div>
    </header>
</template>
<script>
    import { mapState } from 'vuex';
    import router from '@/routes/index.js';

    export default {
        computed :{
            ...mapState(['userData'])
        },
        methods : {
            Logo(){
                console.log(1)
                router.push('/MainPage')
            }
        }
    }
</script>
<style>
    /*@import "../css/BaseLayout.scss";*/

    .Logo{ /*사각형*/
        float: left;
        position: absolute;
        width:100px;
        height:50px;
        background-color:#6f9fff;
        margin-left: 0px;
        padding:0px;
    }

    .Logo:after{ /*마름모*/
        content:"";
        display:block;
        position:absolute;
        left: 100px;
        top:-17.5px;
        z-index: 2;
        border-left: 67px solid #6f9fff;
        border-bottom: 67.5px solid transparent;
    }
    .LogoFont{
        z-index: 2;
        border: none;
        background:  #6f9fff;
        position:relative;
        display:block;
        margin-left:20px;
        color:#D4F4FA;
        top: 10px;
        width: 40px;
        font-size: 20px;
        font-weight:bold;
    }
</style>