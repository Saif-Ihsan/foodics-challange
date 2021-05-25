<template>
    <div>
        <Toast position="top-right" />
        <Dialog class="w-1/3-screen" v-model:visible="show" :closeOnEscape="false" :modal="true" :header="data ? 'Update Customer':'Add Customer'" >
            <div class="container">
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Name</label>
                <InputText class="text-left w-full" type="text" v-model="form.name" />
            </label>
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Email</label>
                <InputText class="text-left w-full" type="email" v-model="form.email" />
            </label>
            <label class="block mb-3 font-bold" >
               <label for="targetLang" class="block mb-2 text-left">Phone Number</label>
                <input  type="number" class="w-1/12 border-r-0 p-component p-inputtext text-left rounded-r-none" placeholder="Dial"  v-model="form.dial">
                <input  class="w-11/12  border-l-0 text-left p-component p-inputtext rounded-l-none"  placeholder="Number" v-model="form.phone">

            </label>
            <label class="flex justify-end mt-10" >
                <Button class="bg-blue" :label="data ? 'Update Customer':'Add Customer'" @click="confirm"/>
            </label>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

import popupMixin from '../../shared/mixins/popup-mixin';
import CustomersService from '../customers.service';

const customersService = new CustomersService();

    export default {
        components: {
            Dialog,
            Button,
            InputText,
            Toast
        },
        mixins: [popupMixin],
        props: ['data'],
        data(){
            return {
                form: null
            };
        },
        created(){
            if (this.data) {
                this.form ={
                    'name': this.data.name,
                    'dial': this.data.dial_code,
                    'phone': this.data.phone,
                    'email': this.data.email
                };
            } else {
                this.form ={
                    'name': '',
                    'dial': '',
                    'phone': '',
                    'email': ''
                };
            }
        },
        methods: {
            confirm(){
                if (this.formValidation()) {
                    const req = {
                        'name': this.form.name,
                        'dial_code': this.form.dial,
                        'phone': this.form.phone,
                        'email': this.form.email
                    };
                    if (this.data) {
                        customersService.updateCustomer(this.data.id,req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Customer Added', detail:'Customer has been added successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    } else {
                        customersService.addCustomer(req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Customer Updated', detail:'Customer has been updated successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    }
                   
                } else {
                    this.$toast.add({severity:'error', summary: 'Error', detail:'Please make sure form values are valid', life: 3000});
                }
            },
            formValidation(){
                if (this.form.name.length && this.form.dial.toString().length && this.form.phone.length) {
                    const emailReg = new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+', '');
                    return emailReg.test(this.form.email);
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>