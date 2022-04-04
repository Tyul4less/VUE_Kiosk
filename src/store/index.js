 import axios from "axios";
import Vuex from 'vuex';
import router from '@/routes/index.js';



const baseUrl = process.env.VUE_APP_baseApiURL;

const store = new Vuex.Store({

    state: {
        userData : [
            {
                id : 'GDW',
                pw : '1111',
                nickname : 'Heka',
                token : false
            }
        ],
        menuList:[
            {
                image : require("../assets/menuSelection/normalBread.png"),
                name : '일반빵',
                price : 1000,
                category : 'bread',
                EA : 0,
                id : '1-1'
            },
            {
                image : require('../assets/menuSelection/참깨빵.png'),
                name : '참깨빵',
                price : 1000,
                category : 'bread',
                EA : 0,
                id : '1-2'
            },
            {
                image : require('../assets/menuSelection/소고기패티.jpg'),
                name : '소고기패티',
                price : 2000,
                category : 'paty',
                EA : 0,
                id : '2-1'
            },
            {
                image : require('../assets/menuSelection/새우패티.png'),
                name : '새우패티',
                price : 1500,
                category : 'paty',
                EA : 0,
                id : '2-2'
            },
            {
                image : require('../assets/menuSelection/치킨패티.jpg'),
                name : '치킨패티',
                price : 1800,
                category : 'paty',
                EA : 0,
                id : '2-3'
            },
            {
                image : require('../assets/menuSelection/토마토.jpg'),
                name : '토마토',
                price : 1000,
                category : 'vagetable',
                EA : 0,
                id : '3-1'
            },
            {
                image : require('../assets/menuSelection/양상추.jpg'),
                name : '양상추',
                price : 800,
                category : 'vagetable',
                EA : 0,
                id : '3-2'
            },
            {
                image : require('../assets/menuSelection/할라피뇨.jpg'),
                name : '할라피뇨',
                price : 800,
                category : 'vagetable',
                EA : 0,
                id : '3-3'
            },
            {
                image : require('../assets/menuSelection/coke.jpg'),
                name : '코카콜라',
                price : 1000,
                category : 'drink',
                EA : 0,
                id : '4-1'
            },
            {
                image : require('../assets/menuSelection/zeroCoke.png'),
                name : '제로콜라',
                price : 1000,
                category : 'drink',
                EA : 0,
                id : '4-2'
            },
            {
                image : require('../assets/menuSelection/pepsi.png'),
                name : '팹시',
                price : 1000,
                category : 'drink',
                EA : 0,
                id : '4-3'
            },
            {
                image : require('../assets/menuSelection/7star.jpg'),
                name : '칠성사이다',
                price : 1000,
                category : 'drink',
                EA : 0,
                id : '4-4'
            },
            {
                image : require('../assets/menuSelection/gamtwie.jpg'),
                name : '감자튀김',
                price : 1500,
                category : 'side',
                EA : 0,
                id : '5-1'
            },
            {
                image : require('../assets/menuSelection/cheeseStick.jpg'),
                name : '치즈스틱',
                price : 4000,
                category : 'side',
                EA : 0,
                id : '5-2'
            },
            {
                image : require('../assets/menuSelection/sneckWrap.png'),
                name : '스낵랩',
                price : 2500,
                category : 'side',
                EA : 0,
                id : '5-3'
            },
            {
                image : require('../assets/menuSelection/yangnyumChiken.jpg'),
                name : '양념치킨',
                price : 12900,
                category : 'side',
                EA : 0,
                id : '5-4'
            },

        ],
        basket : [],
        totalPrice : [
            {
                price : 0,
                confirm : false
            }
        ]
    },
    getters: {
        userInfo(state){
            console.log(state.userData);
            return state.userData;

        }
    },
    mutations : {
        login (state, account) {
            console.log('mutations')
            state.userData = {...account}
            state.userData.token = true;
        },
        setData(state, account) {
            state.userData.id = account.id;
            state.userData.pw = account.pw;
        },
        addBasket(state, basketData){
            const { id, AS } = basketData

            const copy = state.menuList.filter(e => {
                return e.id === id
            })[0]


            const isNotPut = state.basket.some((e, index) => {
                if (AS === 'add'){
                    if (e.id === id){
                        state.basket[index].EA = copy.EA
                        console.log(copy.price)
                        state.basket[index].price = state.basket[index].price + copy.price
                        state.totalPrice[0].price += copy.price
                        return true
                    }
                }else if (AS === 'sub'){
                    if (e.id === id){

                        if (state.basket[index].EA === 1){
                            state.basket[index].price -= copy.price
                            state.totalPrice[0].price -= copy.price
                            console.log("-뺴기")
                            state.basket.splice(index, 1)
                            return true
                        } else {
                            state.basket[index].EA = copy.EA
                            state.basket[index].price -= copy.price
                            state.totalPrice[0].price -= copy.price

                            return true
                        }
                    }

                }else if (AS === 'cancel') {
                    if (e.id === id) {
                        state.menuList.filter((e, index) => {
                            if (e.id === id){
                                state.menuList[index].EA = 0
                            }
                        })
                        state.totalPrice[0].price -= state.basket[index].price
                        state.basket.splice(index, 1)
                        return true
                    }
                }
                return false;
            })

            if (isNotPut === false){
                console.log('추가')
                state.basket = state.basket.concat({...copy})
                console.log(state.basket)
                state.totalPrice[0].price += copy.price
            }

            console.log(JSON.stringify(state.basket))
        },
        isConfirm(state, pram){
            state.totalPrice[0].confirm = pram;
        },
        resetBasket(state){
            state.basket=[]
            state.totalPrice[0].price=0
            state.totalPrice[0].confirm=false
            state.menuList.map(e => {
                e.EA = 0
            })
            router.push({ name : 'ThanksPage'})
        }
    },
    actions: {
        login ({commit}, account) {
            this.state.userData = account;
            const {id,pw} = this.state.userData;
            let url = `${baseUrl}findHRInfo`;
            console.log(id)
            console.log(pw)

            const data = { id, pw }
            axios.post(url, data)
                .then(res => {
                    this.userData = res.data[0];

                    commit('login',res.data[0]);
                    console.log("mutations입력 : "+JSON.stringify(this.userData))

                    router.replace({ name : 'MainPage' })
            })
                .catch(err => {
                    console.log(err)

                });
        },
        resetBasket({commit}){
            //대충 결제했다치고 basket초기화, confirm false
            commit('resetBasket')
        }
    }
})

export default store;