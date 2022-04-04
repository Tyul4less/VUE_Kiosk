<template>
    <div id="app" class="father">
        <vue3-circle-menu :distance="150" :menu-items="['A', 'B', 'C']">
            <template v-slot:default>
                <div id="toggleDiv" class='rightBottomToggle' style="border:1px solid black">
                    <i class="bi bi-three-dots-vertical"></i>
                </div>
            </template>

            <template v-slot:A>
                <div class="circle" @click="() => { showAlert('권한관리'); }">
                    Q&A
                </div>
            </template>
            <template v-slot:B>
                <div class="circle" @click="() => { showAlert('코드조회'); }">
                    주문<br>조회
                </div>
            </template>
            <template v-slot:C>
                <div class="circle" @click="() => { showAlert('월급여조회'); } ">
                    매장<br>찾기
                </div>
            </template>
        </vue3-circle-menu>
    </div>

</template>
<script>
    import Vue3CircleMenu from "vue3-circle-menu";

    export default {
        components: {
            Vue3CircleMenu
        },
        methods: {
            showAlert: (text) => {
                    alert(text);

            }
        },
    }
</script>
<style>
    @import '../css/Toggle.scss';
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>