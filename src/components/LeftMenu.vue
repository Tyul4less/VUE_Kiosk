<template>
<!--    <input type="checkbox" id="menu-toggle" style="display:block; border: 1px solid black"/>
    <label for="menu-toggle" class="menu-icon"><i class="fa fa-bars"></i></label>
    <div >
        Main Content Here
    </div>-->
    <div class="slideout-sidebar">
        <ul>
            <li><router-link class="menuRouter" to="/MainPage">홈으로 가기</router-link></li>
            <li><router-link class="menuRouter" to="/MenuSelection"> 햄벅 주문</router-link></li>
            <li><router-link class="menuRouter" to="/PaymentPage">결제하기</router-link></li>
            <li><router-link class="menuRouter" to="/FourthPage">For</router-link></li>
        </ul>
        <div id='slideLable' class="slideLable" @mouseover="openNav">Menu</div>
    </div>



</template>
<script>
    export default {
        methods:{
            openNav() {
                const menu = document.querySelector(".slideout-sidebar")

                if (this.isOpen === false) {
                    this.isOpen=true
                    menu.style.left = "0px";
                } else {
                    this.isOpen=false
                    menu.style.left = "-150px";
                }
            },
        },
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>
<style>
    @import '../css/SideMenu.scss';

</style>