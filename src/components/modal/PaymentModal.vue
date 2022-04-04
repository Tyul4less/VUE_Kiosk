<template>
    <div class="paymentModal">
        <div class="overlay"></div>
                <div class="card" style=" min-height:300px; min-width: 500px; max-width: 80vw; border-radius: 10px;">
                    <div class="modal-header" style="font-weight: bold">
                        <slot name="header"/>
                    </div>
                    <div class="modal-body">
                        <slot name="body"/>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"/>
                    </div>
                </div>
        </div>
</template>
<script>
    export default {
    }
</script>
<style>
    @import '../../css/PaymentModal.scss';


</style>