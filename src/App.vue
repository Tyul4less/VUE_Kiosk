<template >
  <!--<div v-if='userData.token' >-->
  <div>
    <HeadLine/>
    <LeftMenu/>
    <QuickMenu/>
    <router-view/>
  </div>

<!--  <div>
    <router-view/>
  </div>-->
  <!--<input type="button" value="ff" @click='handler'/>-->
</template>
<script>
    import { mapState } from 'vuex';
    import HeadLine from './components/HeadLine'
    import LeftMenu from './components/LeftMenu'
    import QuickMenu from './components/QuickMenu'

    export default {
      name: 'App',
      computed:{
        ...mapState(['userData'])
      },
      components: {
        HeadLine, LeftMenu, QuickMenu
      },
      methods : {
        handler () {
          console.log(this.userData.token);
        }
      }
    }
</script>