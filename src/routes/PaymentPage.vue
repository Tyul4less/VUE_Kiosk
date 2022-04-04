<template >
    <div>
        <div class="paymentOption" style="min-width: 610px">

            <div class="bankOption">
                <div ref="bankPointer" style="border:4px solid rgba(255, 150, 220, 0); margin:2px;">

                    <div style="border-left: 2px solid #8BBCFF; border-right: 2px solid #8BBCFF; width: 75px">은행 선택</div>
                    <div class="form-check" v-for="bank in bankList" :key="bank"
                         style="width: 50%; display: inline-block; margin-top: 10px">
                        <input class="form-check-input border-2" v-model='checkedBank' :value="bank.id" type="checkbox" @change="checkFunc($event)">
                        <label class="form-check-label" style="font-weight: bold;">
                           {{bank.bank}}
                        </label>
                    </div>
                </div>
                    <hr style="border:1px solid #007bff"/>
                <div style="border:4px solid rgba(0,0,0,0); margin:2px;">
                    <div style="display: inline-block; border-left: 2px solid #8BBCFF; border-right: 2px solid #8BBCFF; width: 75px">할부 선택</div>

                    <select style="display:inline-block; margin-left: 20px" v-model="Installment">
                        <option>일시불</option>
                        <option>2개월</option>
                        <option>3개월</option>
                        <option>4개월</option>
                        <option>5개월</option>
                        <option>6개월</option>
                        <option>8개월</option>
                        <option>10개월</option>
                        <option>12개월</option>
                    </select>
                        <br/>

                    <div class="form-check" style="width: 100px; display: inline-block; margin-top: 10px;
                        border:1px solid #007bff; margin-top: 15px">
                        <input class="form-check-input border-2" type="checkbox" v-model='isAllChecked' @click="allCheck">
                        <label class="form-check-label" style="font-weight: bold;">
                            전체 선택
                        </label>
                    </div>

                        <br/>
                    <div style="border:4px solid rgba(255, 150, 220, 0); width: 230px; height: 34px; margin: 15px 0 -5px -4px" ref="RequiredSelectionPointer">
                        <div class="form-check"
                             style="width: 220px; display: inline-block; margin-top: 0">
                            <input class="form-check-input border-2" type="checkbox" v-model="checkedApply" :value="1">
                            <label class="form-check-label" style="font-weight: bold;">
                                제3자 정보제공 동의(필수)
                            </label>
                        </div>
                    </div>
                    <div class="form-check" v-for="option in applyList" :key="option.id"
                         style="width: 50%; display: inline-block; margin-top: 10px">
                        <input class="form-check-input border-2" type="checkbox" v-model="checkedApply" :value="option.id">
                        <label class="form-check-label" style="font-weight: bold;">
                            {{option.option}}
                        </label>
                    </div>
                </div>

                <div class="finalPrice">
                    최종 가격 : {{totalPrice[0].price}}<p style="display:inline-block">원</p>

                    <input type="button" class="btn btn-primary" style="float: right; margin: 5px 5px 0 0" @click="cardModal" value="카드결제"/>
                    <input type="button" class="btn btn-primary" style="float: right; margin: 5px 5px 0 0" @click="cashModal" value="현금결제"/>
                </div>
            </div>
        </div>
        <div class="basket" style="overflow-y: scroll; overflow-x: hidden; min-width: 360px;">

            <template v-for="menu in basket" v-bind:key="menu.id">
                <div id="menu">
                    <div id="imgDiv">
                        <img id="menuImg" :src="menu.image" :alt="menu.name" />
                    </div>
                    <hr style="margin-top: 10px; margin-bottom: 10px;"/>
                    <div>{{menu.name}}</div>
                    <div>{{menu.price}}원</div>
                    <div class="">{{menu.EA}}개</div>
                </div>
            </template>
        </div>

        <transition name="fade" mode="out-in">
            <paymentModal @close="closeModal" v-if="modal">
                <template v-slot:header>
                    결제 내용을 확인하시고 맞으시면 결제버튼을 눌러주십시오.
                </template>
                <template v-slot:body>
                    <div>은행 : {{selectedBank}}</div>
                    <div>할부 : {{Installment}}</div>
                    <div>결제하실 금액 : {{totalPrice[0].price}}</div>
                </template>

                <template v-slot:footer>
                    <input class="btn btn-primary" type="button" @click="applyPayment" value="결제"/>
                    <input class="btn btn-primary" type="button" @click="closeModal" value="취소"/>
                </template>
            </paymentModal>
        </transition>

        <transition name="fade" mode="out-in">
            <paymentModal @close="loadingModalClose" v-if="loadingModal">
                <template v-slot:header>
                    결제가 진행중입니다...
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </template>
                <template v-slot:body>
                    잠시만 기다려 주십시오.
                </template>

                <template v-slot:footer>
                    <input class="btn btn-primary" type="button" @click="loadingModalClose" value="취소"/>
                </template>
            </paymentModal>
        </transition>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    import paymentModal from '../components/modal/PaymentModal'
    export default {
        components: { paymentModal },
        created() {
            if (this.totalPrice[0].confirm === false){
                this.$swal.fire({
                    icon: 'error',
                    title: '메뉴를 제대로 확인하셨나요?',
                    text: '메뉴선택에서 확정을 누르고 오세요!',
                    confirmButtonText: '돌아가기',
                    footer: '<a href="">문제가 있다면 직원 호출하기</a>'
                })
                history.back()
            }
        },
        computed:{
            ...mapState(['menuList']),
            ...mapState(['basket']),
            ...mapState(['totalPrice']),
        },
        methods:{
            checkFunc(event) {
                for(let i=1; i<=this.checkedBank.length; i++){
                    this.selectedBank = this.bankList[event.target.value-1].bank
                    if(this.checkedBank[i] == event.target.value){
                        this.checkedBank.splice(i-1,1);
                    }
                }
            },
            allCheck(){
                if(!this.isAllChecked){
                    for(let i=1; i<4; i++){
                        this.checkedApply.push(i)
                    }
                    this.isAllChecked = true;
                }else{
                    this.checkedApply=[]

                    this.isAllChecked  = false;
                }
            },
            cardModal(){
                if(this.checkedBank == ''){
                    this.$swal.fire({
                        icon: 'question',
                        title: '선택된 은행이 없습니다.',
                        text: '은행을 최소 하나 선택해주세요.',
                        confirmButtonText: '은행 선택하기',
                        footer: '<a href="">문제가 있다면 직원 호출하기</a>'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.bankPointer=this.$refs.bankPointer
                            this.bankPointerShow()
                        }
                    })
                }else if(!this.checkedApply.some(e => {return e == 1})){
                    this.$swal.fire({
                        icon: 'question',
                        title: '필수 동의 체크!',
                        text: '제3자 정보제공 동의를 체크해주세요',
                        confirmButtonText: '돌아가기',
                        footer: '<a href="">문제가 있다면 직원 호출하기</a>'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.bankPointer = this.$refs.RequiredSelectionPointer
                            this.bankPointerShow()
                        }
                    })
                }else{
                    this.modal = true
                }
            },
            closeModal() {
                this.modal = false
            },
            applyPayment() {
                this.modal=false
                this.loadingModal=true
                setTimeout(this.successPayment, 2000)
            },

            successPayment(){
              this.$store.dispatch('resetBasket')
            },
            loadingModalClose() {
                this.loadingModal = false
            },
            bankPointerShow() {
                let setTime_func = setTimeout(this.banPointerFadeOut, 30)
                if(this.opacity > 1) {
                    console.log("0")
                    clearTimeout(setTime_func);
                    this.bankPointerHide()
                }
            },
            banPointerFadeOut() {
                this.opacity += 0.1
                this.bankPointer.style.borderColor = `rgba(255, 150, 220, ${this.opacity})`;
                console.log(this.bankPointer.style.borderColor)
                this.bankPointerShow()
            },
            bankPointerHide() {
                let setTime_func = setTimeout(this.bankPointerFadeIn, 30)
                if(this.opacity < 0) {
                    console.log("1")
                    this.fadeCycle += 1
                    clearTimeout(setTime_func);
                    if(this.fadeCycle == 2){
                        this.fadeCycle = 0
                    }else{
                        this.bankPointerShow()
                    }
                }
            },
            bankPointerFadeIn() {
                this.opacity -= 0.1
                this.bankPointer.style.borderColor = `rgba(255, 150, 220, ${this.opacity})`;
                console.log(this.bankPointer.style.borderColor)
                this.bankPointerHide()
            },
        },
        data(){
            return {
                bankList :[
                    {bank : '신한', id : 1},
                    {bank : 'NH농협',id : 2},
                    {bank : 'KB국민은행', id : 3},
                    {bank : 'IBK기업은행', id : 4},
                    {bank : 'K뱅크', id : 5},
                    {bank : '제주은행', id : 6},
                    {bank : '우체국', id : 7},
                    {bank : '하나은행', id : 8},
                    {bank : '우리은행', id : 9},
                    {bank : '새마을금고', id : 10},
                    {bank : '부산은행', id : 11},
                    {bank : '광주은행', id : 12},
                    {bank : '대구은행', id : 13},
                    {bank : 'KDB신업은행', id : 14},
                    {bank : '경남은행', id : 15},
                    {bank : '수협중앙회', id : 16},
                ],
                applyList : [
                    {option : 'SNS 이벤트성 광고 수신 동의(선택)', id : 2},
                    {option : '홍보관련 메일 수신 동의(선택)', id : 3}
                ],
                checkedBank:[],
                checkedApply:[],
                isAllChecked:false,
                Installment:'일시불',
                modal: false,
                selectedBank: '',
                message: '',
                opacity : 1,
                fadeCycle : 0,
                bankPointer : '',
                loadingModal : false
            }
        }
    }
</script>
<style>
    @import '../css/BaseLayout.scss';
    @import '../css/HamBurUk.scss';
    @import '../css/PaymentModal.scss';
    .finalPrice{
        font-weight: bold;
        font-size: 30px;
        width: 100%;
        height: 50px;
        display: inline-block;
        border-top: 2px solid #8BBCFF;
        position: absolute;
        float: bottom;
        right: 0px;
        bottom: 0px;
    }
    .bankOption{
        width: 95%;
        height: 500px;
        margin:2.5% 2.5% 2.5% 2.5%;
        text-align: left;
    }
    .fade-enter{
        opacity:0.5
    }
    .fade-enter-active,
    .fade-leave-active{
        transition:opacity 0.3s ease-out;
    }
    .fade-leave-to{
        opacity: 0;
    }
</style>