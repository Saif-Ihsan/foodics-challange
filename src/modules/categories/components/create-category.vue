<template>
    <div>
        <Toast position="top-right" />
        <Dialog class="w-1/3-screen" v-model:visible="show" :closeOnEscape="false" :modal="true" :header="data ? 'Update Category':'Add Category'" >
            <div class="container">
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Name</label>
                <InputText class="text-left w-full" type="text" v-model="form.name" />
            </label>
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Reference</label>
                <InputText class="text-left w-full" type="text" v-model="form.reference" />
            </label>

            <label class="flex justify-end mt-10" >
                <Button class="bg-blue" :label="data ? 'Update Category':'Add Category'" @click="confirm"/>
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
import CategoriesService from '../categories.service';

const categoriesService = new CategoriesService();

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
                    'reference': this.data.reference,
                };
            } else {
                this.form ={
                    'name': '',
                    'reference': '',
                };
            }
        },
        methods: {
            confirm(){
                if (this.formValidation()) {
                    const req = {
                        'name': this.form.name,
                        'reference': this.form.reference,
                    };
                    if (this.data) {
                        categoriesService.updateCategory(this.data.id,req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Category Added', detail:'Category has been added successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    } else {
                        categoriesService.addCategory(req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Category Updated', detail:'Category has been updated successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    }
                   
                } else {
                    this.$toast.add({severity:'error', summary: 'Error', detail:'Please make sure form values are valid', life: 3000});
                }
            },
            formValidation(){
                if (this.form.name.length && this.form.reference.length ) {
                    return true;
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