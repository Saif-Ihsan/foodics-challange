<template>
    <div class="container flex flex-wrap mx-auto" v-if="categoryDetails">
        <Toast position="top-right" />
        <div class="w-full text-right">
            <Button icon="pi pi-pencil pl-1" class="bg-blue" @click="ShowEditCategoryModel = true"/>
        </div>
        <label class="flex  mb-3 font-bold w-1/2 text-center" >
            <label class="mr-3 mb-2">Name:</label>
            <p>{{categoryDetails.name}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/2 text-center" >
            <label class="mr-3 mb-2">Reference:</label>
            <p>{{categoryDetails.reference}}</p>
        </label>
        <Button icon="pi-undo pi" label="Restore" class="bg-blue" @click="restoreCategory" v-if="categoryDetails.deleted_at"/>
        <Button icon="pi-trash pi" label="Delete" class="bg-red" @click="deleteCategory" v-else/>
        <createCategory v-if="ShowEditCategoryModel" @on-close="closeUpdate" :data="categoryDetails" />

    </div>
</template>

<script>
import CategoriesService from '../../categories.service';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import createCategory from '../create-category';

const categoriesService = new CategoriesService();

    export default {
        components:{
            Button,
            Toast,
            createCategory
        },
        data(){
            return {
                id: this.$route.params.id,
                categoryDetails: null,
                ShowEditCategoryModel: false
            };
        },
        created(){
            this.getCategory();
        },
        methods: {
            getCategory(){
                categoriesService.getCategory(this.id).then(res =>{
                    this.categoryDetails =  res.data;
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            restoreCategory(){
               categoriesService.restoreCategory(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Category Restored', detail:'Category has been restored Successfully', life: 3000});
                    this.getCategory();
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });  
            },
            deleteCategory(){
                categoriesService.deleteCategory(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Category Deleted', detail:'Category has been deleted Successfully', life: 3000});
                    this.getCategory();
                },err=>{
                    let msg = '';
                    if (err.data.errors?.category) {
                        msg = err.data.errors.category.join(',');
                    } else {
                        msg = 'Something went wrong, Please try again later ...';
                    }
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:msg, life: 3000});
                }); 
            },
            closeUpdate(e){
                this.getCategory();
                this.ShowEditCategoryModel = e;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>