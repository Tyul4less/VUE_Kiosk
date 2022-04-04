<template >
    <div>
    <div class="menuBoard">
        <template v-for="menu in setMenuList" :key="menu.id">
            <div id="menu">
                <div id="imgDiv">
                    <img id="menuImg" :src="menu.image" :alt="menu.name" />
                </div>
                <hr style="margin-top: 10px; margin-bottom: 10px;"/>
                <div>{{menu.name}}</div>
                <div>{{menu.price}}원</div>
                <i class="bi bi-caret-left"
                   @mouseover="subIcon($event, 1)"
                   @mouseout="subIcon($event, 2)"
                    @click="sub($event)"
                   :id="menu.id"
                />
                    <input class='EACounter' type="text" :id="menu.id" v-model="menu.EA" readonly disabled style="border:1px solid black"/>
                <i class="bi bi-caret-right"
                   @mouseover="addIcon($event, 1)"
                   @mouseout="addIcon($event, 2)"
                   @click="add($event)"
                   :id="menu.id"
                />
            </div>
        </template>
    </div>
    <div class="basket">
        <template v-for="item in basket" :key="item.id">
            <div class="oneItem">
                {{item.name}}
                <i class="bi bi-x-circle" style="float:right; margin:0 10px 0 10px"
                   @mouseover="cancelIcon($event, 1)"
                   @mouseout="cancelIcon($event, 2)"
                   @click="cancel($event)"
                   :id="item.id"
                ></i>
                <input type="text" class="EACounter" v-model="item.price"
                       style="float:right; margin: 6px 0 0 10px; width: 100px; height: 35px"/>
            </div>
        </template>
        <div class="priceDiv">
            가격 : {{totalPrice[0].price}}<p style="display:inline-block">원</p>
            <p style="float: right; margin-right: 10px;" @click="goToPayMent">결제</p>
        </div>
    </div>
    <div class="btn-group" role="group" style="display:block; margin-left: 10%">
        <button type="button" class="btn btn-primary" @click="setMenuBoard('bread')">빵</button>
        <button type="button" class="btn btn-primary" @click="setMenuBoard('paty')">패티</button>
        <button type="button" class="btn btn-primary" @click="setMenuBoard('vagetable')">채소</button>
        <button type="button" class="btn btn-primary" @click="setMenuBoard('drink')">음료</button>
        <button type="button" class="btn btn-primary" @click="setMenuBoard('side')">사이드</button>
    </div>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    import router from "./index";
    export default {
        created() {
            this.setMenuList = this.menuList.filter(e => {
                return e.category === 'bread'
            })
        },
        computed:{
            ...mapState(['menuList']),
            ...mapState(['basket']),
            ...mapState(['totalPrice']),
        },
        methods: {
            sub(event){
                const subId = event.target.id
                this.menuList.filter((e, index) => {
                    if(e.id === subId) {
                        if (e.EA === 0) {alert("제품이 이미 비었습니다."); return;}
                        this.menuList[index].EA += -1
                        this.$store.commit('addBasket', {'id' : e.id, 'AS' : 'sub'} )
                    }
                })

            },
            add(event){
                const addId = event.target.id
                this.menuList.filter((e, index) => {
                    if(e.id === addId) {
                        this.menuList[index].EA += 1;
                        this.$store.commit('addBasket', {'id' : e.id, 'AS' : 'add'})
                    }
                })
            },
            cancel(event){
                this.$swal.fire({
                    title: '비우시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '비우기',
                    cancelButtonText: '취소',
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        const addId = event.target.id
                        this.menuList.filter(e => {
                            if(e.id === addId) {
                                this.$store.commit('addBasket', {'id' : e.id, 'AS' : 'cancel'})
                            }
                        })
                        this.$swal.fire('Saved!', '', 'success')
                    }
                })
            },
            subIcon(e, state){
                if (state===1){
                    e.target.className="bi bi-caret-left-fill"
                }else{
                    e.target.className="bi bi-caret-left"
                }
            },
            addIcon(e, state){
                if (state===1){
                    e.target.className="bi bi-caret-right-fill"
                }else{
                    e.target.className="bi bi-caret-right"
                }
            },
            cancelIcon(e, state){
                if (state===1){
                    e.target.className="bi bi-x-circle-fill"
                }else{
                    e.target.className="bi bi-x-circle"
                }
            },
            goToPayMent(){
                this.$swal.fire({
                    title: '확정하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '확정!',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$store.commit('isConfirm', true)
                        router.push({ name : 'PaymentPage' })
                    }
                })
            },
            setMenuBoard(select){
                this.setMenuList = this.menuList.filter(e => {
                    return e.category === select
                })
            }
        },
        data(){
            return {
                selectedMenu:[],
                setMenuList:[]
            }
        },

    }
</script>
<style>
    @import '../css/BaseLayout.scss';
    @import '../css/HamBurUk.scss';

</style>