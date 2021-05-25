export default {
    emits: ['on-close'],
    watch:{
        show(newVal){
            if (!newVal) {
                this.$emit('on-close', false);
            }
        }
    },
    data(){
        return {
            show: true
        };
    },
};