<template>
    <div class="container flex flex-wrap mx-auto" v-if="productDetails">
        <Toast position="top-right" />
        <div class="w-full text-right">
            <Button icon="pi pi-pencil pl-1" class="bg-blue" @click="ShowEditProductModel = true"/>
        </div>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Name:</label>
            <p>{{productDetails.name}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">SKU:</label>
            <p>{{productDetails.sku}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Category:</label>
            <p>{{productDetails.category.name}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Pricing Method:</label>
            <p>{{getPricingMethod}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" v-if="productDetails.pricing_method === 1">
            <label class="mr-3 mb-2">Price:</label>
            <p>{{productDetails.price}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center">
            <label class="mr-3 mb-2">Activation:</label>
            <InputSwitch v-model="productDetails.is_active" @change="changeActive"/>
        </label>
        <Button icon="pi-undo pi" label="Restore" class="bg-blue" @click="restoreProduct" v-if="productDetails.deleted_at"/>
        <Button icon="pi-trash pi" label="Delete" class="bg-red" @click="deleteProduct" v-else/>

        <createProduct v-if="ShowEditProductModel" @on-close="closeUpdate" :data="productDetails" />

    </div>
</template>

<script>
import ProductsService from '../../products.service';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import createProduct from '../create-product';
import InputSwitch from 'primevue/inputswitch';

const productsService = new ProductsService();

    export default {
        components:{
            Button,
            Toast,
            createProduct,
            InputSwitch
        },
        data(){
            return {
                id: this.$route.params.id,
                productDetails: null,
                ShowEditProductModel: false
            };
        },
        computed:{
            getPricingMethod(){
                if (this.productDetails.pricing_method === 1) {
                    return 'Fixed Price';
                } else if(this.productDetails.pricing_method === 2){
                    return 'Open Price';
                }
                return '';
            }
        },
        created(){
            this.getProduct();
        },
        methods: {
            getProduct(){
                productsService.getProduct(this.id).then(res =>{
                    this.productDetails =  res.data;
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            restoreProduct(){
               productsService.restoreProduct(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Product Restored', detail:'Product has been restored Successfully', life: 3000});
                    this.getProduct();
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });  
            },
            deleteProduct(){
                productsService.deleteProduct(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Product Deleted', detail:'Product has been deleted Successfully', life: 3000});
                    this.getProduct();
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                }); 
            },
            closeUpdate(e){
                this.getProduct();
                this.ShowEditProductModel = e;
            },
            changeActive(){
                productsService.updateProduct(this.productDetails.id, {
                    is_active: this.productDetails.is_active
                }).then(()=>{
                    const type =  this.productDetails.is_active ? 'activated': 'deactivated';
                    this.$toast.add({severity:'success', summary: `Product ${type}`, detail:`Product has been ${type} Successfully`, life: 3000});
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                    this.productDetails.is_active = !this.productDetails.is_active;
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>