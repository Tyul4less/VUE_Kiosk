<template>
    <div id="toggleDiv" class='rightBottomToggle' @click="toggleButtonHide">
        <i id="ToggleIcon" class="bi bi-three-dots-vertical"></i>
    </div>
    <div id="miniSubMenu" class="miniSubMenu">

    </div>
</template>
<script>

    export default{

        methods : {
            toggleButtonHide: function () {

                    this.opacity = this.opacity - 0.1
                    let setTime_func = setTimeout(this.fadeIn, 30)
                    if(this.opacity < 0) {
                        console.log("0")
                        clearTimeout(setTime_func);
                        //menuOpen
                        document.querySelector("#miniSubMenu").style.right = '10px'
                    }
            },
            fadeIn: function () {
                const toggle = document.querySelector("#toggleDiv");
                toggle.style.opacity = this.opacity
                this.toggleButtonHide();
            }
        },
        data(){
            return{
                opacity : 1
            }
        }
            /*showMenu : $(function(){
                $('#slide-submenu').on('click',function() {			        
                    $(this).closest('.list-group').fadeOut('slide',function(){
                        $('.mini-submenu').fadeIn();	
                    });
                    
                });

                $('.mini-submenu').on('click',function(){		
                    $(this).next('.list-group').toggle('slide');
                    $('.mini-submenu').hide();
                })
            })*/
    }
</script>
<style>
    @import '../css/Toggle.scss';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css';
    .rightBottomToggle{
        position: fixed;
        right: 10px;
        bottom: 10px;
        height: 40px;
        width:40px;
        border: 2px solid black;
        align-items: center;
        border-radius:25px;
        background:white;
    }
    .rightBottomToggle #ToggleIcon{
        position: relative;
        left: 11px;
        top: 5px;
    }
    .miniSubMenu{
        position: fixed;
        width: 200px;
        height: 200px;
        border: 1px solid black;
        right: -200px;
        bottom: 10px;
        transition: all 300ms ease-in-out;
    }

</style>
