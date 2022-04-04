<template >
    <div class="content" >
        <div class="thanksDiv" ref="thanksDiv">
            {{thanksText}}
        </div>
    </div>
</template>
<script>
    import router from "./index";



    export default {
        created(){
            this.bankPointerShow()
        },
        methods:{
            bankPointerShow() {

                let setTime_func = setTimeout(this.banPointerFadeOut, 30)
                if(this.opacity > 1) {
                    clearTimeout(setTime_func);

                        this.bankPointerHide()

                }
            },
            banPointerFadeOut() {

                this.opacity += 0.05
                this.$refs.thanksDiv.style.opacity = this.opacity;
                this.bankPointerShow()
            },
            bankPointerHide() {

                const setTime_func = setTimeout(this.bankPointerFadeIn, 30)
                if(this.opacity < 0) {
                    console.log("cycle = "+this.fadeCycle)
                    if(this.fadeCycle === 0){
                        console.log("if0")
                        this.thanksText = 'Thank you!'
                        this.fadeCycle += 1
                        clearTimeout(setTime_func);
                        this.bankPointerShow()
                    }else if(this.fadeCycle === 1){
                        console.log("if1")
                        this.thanksText = '3초 후 메인페이지로 이동합니다.'
                        this.fadeCycle += 1
                        clearTimeout(setTime_func);
                        this.bankPointerShow()
                    }else if(this.fadeCycle === 2){
                        console.log('3초 진입')

                        let three = setTimeout(()=>{
                                this.thanksText = '3'
                            this.$refs.thanksDiv.style.opacity = 1;
                                let two = setTimeout(()=>{
                                        clearTimeout(three)
                                        this.thanksText = '2'

                                        let one = setTimeout(()=>{
                                                clearTimeout(two)
                                                this.thanksText = '1'

                                                setTimeout(()=>{
                                                        clearTimeout(one)
                                                        console.log("push")
                                                        router.push({ name : 'MainPage'})
                                                    },1000
                                                )
                                            }, 1000
                                        )
                                    }, 1000
                                )
                            }, 1000
                        )
                        clearTimeout(setTime_func);
                    }

                }
            },
            bankPointerFadeIn() {

                this.opacity -= 0.05
                this.$refs.thanksDiv.style.opacity = this.opacity;
                this.bankPointerHide()
            }
        },
        data(){
            return {
                opacity : 0,
                fadeCycle : 0,
                thanksText : '감사합니다!'
            }
        }
    }
</script>
<style>
    .content{
        width: 70%;
    }
    .thanksDiv{
        width: 100%;
        text-align:center;
        padding-top: 20%;
        font-size: 50px;
        opacity: 0;
    }
</style>




