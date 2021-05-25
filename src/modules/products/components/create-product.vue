<template>
    <div>
        <Toast position="top-right" />
        <Dialog class="w-1/3-screen" v-model:visible="show" :closeOnEscape="false" :modal="true" :header="data ? 'Update Product':'Add Product'" >
            <div class="container">
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Name</label>
                <InputText class="text-left w-full" type="text" v-model="form.name" />
            </label>
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">SKU</label>
                <InputText class="text-left w-full" type="text" v-model="form.sku" />
            </label>
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Category</label>
                <AutoComplete class="text-left w-full" v-if="categoryList" forceSelection @blur="checkSelection" v-model="category" dropdownMode="current" :suggestions="categoryList" field="label" @item-select="selectCategory" placeholder="Search In Categories" />
            </label>
            <label class="block mb-3 font-bold" >
               <label class="block mb-2 text-left">Pricing  Method</label>
                <Dropdown class="text-left w-full"  v-model="form.pricingMethod" optionValue="value" :options="[{value:1, label: 'Fixed Price'},{value:2, label: 'Open Price'}]" optionLabel="label"  placeholder="Select Price Method " />
            </label>
            <label class="block mb-3 font-bold" v-if='form.pricingMethod === 1'>
               <label class="block mb-2 text-left">Pricing</label>
                <InputNumber class="text-left w-full" currency="USD" mode="currency" v-model="form.price" />
            </label>
            <label class="flex justify-end mt-10" >
                <Button class="bg-blue" :label="data ? 'Update Product':'Add Product'" @click="confirm"/>
            </label>
            </div>
        </Dialog>
    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';

import popupMixin from '../../shared/mixins/popup-mixin';
import ProductsService from '../products.service';
import CategoriesService from '../../categories/categories.service';

const categoriesService = new CategoriesService();
const productsService = new ProductsService();

export default {
        components: {
            Dialog,
            Button,
            InputText,
            InputNumber,
            Toast,
            AutoComplete,
            Dropdown
        },
        mixins: [popupMixin],
        props: ['data'],
        data(){
            return {
                form: null,
                category: '',
                categoryList: null
            };
        },
        watch:{
            category(){
                this.getCategories();
            }
        },
        created(){
            if (this.data) {
                console.log(this.data);
                this.form ={
                    'name': this.data.name,
                    'sku': this.data.sku,
                    'category': this.data.category.id,
                    'pricingMethod': this.data.pricing_method,
                    'price': this.data.price
                };
                this.category = this.data.category.name;
                this.getCategories();
            } else {
                this.form ={
                    'name': '',
                    'sku': '',
                    'category': '',
                    'pricingMethod': -1,
                    'price': null
                };
                this.categoryList =[];
            }
        },
        methods: {
            confirm(){
                if ( this.formValidation()) {
                    const req = {
                        'name': this.form.name,
                        'sku': this.form.sku,
                        'category_id': this.form.category,
                        'pricing_method': this.form.pricingMethod,
                        'costing_method': 2,
                        'selling_method': 2
                    };
                    if (req.pricing_method === 1) {
                        req.price = this.form.price;
                    }
                    if (this.data) {
                        productsService.updateProduct(this.data.id,req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Product Added', detail:'Product has been added successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    } else {
                        productsService.addProduct(req).then(()=>{
                            this.show = false;
                            this.$toast.add({severity:'success', summary: 'Product Updated', detail:'Product has been updated successfully', life: 3000});
                        }, err=>{
                            this.$toast.add({severity:'error', summary: 'Server Error', detail:err.data.message, life: 3000});
                        });
                    }
                   
                } else {
                    this.$toast.add({severity:'error', summary: 'Error', detail:'Please make sure form values are valid', life: 3000});
                }
            },
            formValidation(){
                if (this.form.name?.length && this.form.sku?.length && this.form.category?.length && this.form.pricingMethod) {
                    if (this.form.pricingMethod === 1 && !this.form.price) {
                        return false;
                    }
                    return true;
                } else 
                {
                    return false;
                }
            },
            getCategories(){
                categoriesService.getCategories(1,this.category, '').then(res=>{
                    this.categoryList = res.data.map(item => {return {label: item.name, value: item.id};});
                });
            },
            selectCategory(e){
                this.form.category = e.value.value;
            },
            checkSelection(){
                if (!this.category || (typeof this.category === 'string' && !this.category.length)) {
                   this.form.category = '';
                }
            }
        }
    };
</script>

<style lang="scss">
.p-autocomplete-input{
    width: 100%;
}
.p-hidden-accessible{ 
    display: none;
}
</style>