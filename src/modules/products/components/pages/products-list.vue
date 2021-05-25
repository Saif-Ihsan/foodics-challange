<template>
    <div class="product-container w-full flex  flex-wrap">
        <Toast position="top-right" />
        <div class="w-full flex justify-between mb-5">
            <h1>Products List</h1>
            <p class="cursor-pointer hover:underline my-auto text-blue text-lg" @click="ShowAddProductModel = true;"><i class="pi pi-plus"></i> Create Product</p>
        </div>
        <div class="w-11/12 mx-auto mb-5 flex justify-between">
            <InputText type="text" v-model="name" placeholder="Filter By Name"/>
            <!-- <InputText type="text" v-model="category" placeholder="Filter By Category" /> -->
            <AutoComplete forceSelection @blur="checkSelection" v-model="category" dropdownMode="current" :suggestions="categoryList" field="label" @item-select="selectCategory" placeholder="Search In Categories" />
        </div>
        <Table class="mx-auto w-11/12" type="product" v-if="productsList && productsListMeta && !tableError" :meta="productsListMeta" :data="productsList" :loading="loading" @change-page="changePage"/>
        <div class="flex justify-center h-80 w-full" v-else-if="tableError">
            <h2 class="self-center">Something went wrong please come back later...</h2>
        </div>
        <createProduct v-if="ShowAddProductModel" @on-close="ShowAddProductModel = $event;" />
    </div>
</template>

<script>
import ProductsService from '../../products.service';
import CategoriesService from '../../../categories/categories.service';

import Table from '../../../shared/components/table';
import InputText from 'primevue/inputtext';
import createProduct from '../create-product';
import Toast from 'primevue/toast';
import AutoComplete from 'primevue/autocomplete';


const productsService = new ProductsService();
const categoriesService = new CategoriesService();
    export default {
        components:{
            Table,
            InputText,
            Toast,
            createProduct,
            AutoComplete
        },
        data(){
            return {
                page: 1,
                name: '',
                category: '',
                selectedCategoryId: '',
                loading: false,
                productsList: null,
                productsListMeta:null,
                columns: [{
                        value: 'name',
                        title: 'Name'
                    },
                    {
                        value: 'sku',
                        title: 'SKU'
                    },
                    {
                        value: 'category.name',
                        title: 'Category'
                    },
                    {
                        value: 'price',
                        title: 'price'
                    }
                ],
                tableError: false,
                ShowAddProductModel: false,
                categoryList: []
            };
        },
        watch: {
            name(){
                this.getProducts();
            },
            selectedCategoryId(){
                this.getProducts();
            },
            category(){
                this.getCategories();
            }
        },
        created(){
            this.getProducts();
        },
        methods:{
            getProducts(){
                this.loading = true;
                this.productsList= null;
                productsService.getProducts(this.page, this.name, this.selectedCategoryId).then(res=>{
                    this.productsList = res.data;
                    this.productsListMeta = res.meta;
                    this.productsListMeta.columns = this.columns;
                    this.loading = false;
                }, () => {
                    this.tableError = true;
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            changePage(e){
                this.page = e;
                this.getProducts();
            },
            getCategories(){
                categoriesService.getCategories(1,this.category, '').then(res=>{
                    this.categoryList = res.data.map(item => {return {label: item.name, value: item.id};});
                });
            },
            selectCategory(e){
                this.selectedCategoryId = e.value.value;
            },
            checkSelection(){
                if (!(this.category && this.category.length)) {
                   this.selectedCategoryId = '';
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>