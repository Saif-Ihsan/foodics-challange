<template>
    <div class="category-container w-full flex  flex-wrap">
        <Toast position="top-right" />
        <div class="w-full flex justify-between mb-5">
            <h1>Categories List</h1>
            <div class="flex">
                <p class="cursor-pointer hover:underline my-auto text-blue text-lg" @click="ShowAddCategoryModel = true;"><i class="pi pi-plus"></i> Create Category</p>
                <Button class="bg-blue mx-10" label="Sort Categories" @click="routeToSort" />
            </div>
        </div>
        <div class="w-11/12 mx-auto mb-5 flex justify-between">
            <InputText type="text" v-model="name" placeholder="Filter By Name"/>
            <InputText type="text" v-model="reference" placeholder="Filter By Reference" />
        </div>
        <Table class="mx-auto w-11/12" type="category" v-if="categoriesList && categoriesListMeta && !tableError" :meta="categoriesListMeta" :data="categoriesList" :loading="loading" @change-page="changePage"/>
        <div class="flex justify-center h-80 w-full" v-else-if="tableError">
            <h2 class="self-center">Something went wrong please come back later...</h2>
        </div>
        <createCategory v-if="ShowAddCategoryModel" @on-close="ShowAddCategoryModel = $event;" />
    </div>
</template>

<script>
import CategoriesService from '../../categories.service';
import Table from '../../../shared/components/table';
import InputText from 'primevue/inputtext';
import createCategory from '../create-category';
import Toast from 'primevue/toast';
import Button from 'primevue/button';

const categoriesService = new CategoriesService();
    export default {
        components:{
            Table,
            InputText,
            Toast,
            createCategory,
            Button
        },
        data(){
            return {
                page: 1,
                name: '',
                reference: '',
                loading: false,
                categoriesList: null,
                categoriesListMeta:null,
                columns: [{
                        value: 'name',
                        title: 'Name'
                    },
                    {
                        value: 'reference',
                        title: 'Reference'
                    },
                    {
                        value: 'created_at',
                        title: 'Created date'
                    }
                ],
                tableError: false,
                ShowAddCategoryModel: false
            };
        },
        watch: {
            name(){
                this.getCategories();
            },
            reference(){
                this.getCategories();
            }
        },
        created(){
            this.getCategories();
        },
        methods:{
            getCategories(){
                this.loading = true;
                this.categoriesList= null;
                categoriesService.getCategories(this.page, this.name, this.reference).then(res=>{
                    this.categoriesList = res.data.map(item => {
                        item.created_at = this.date(item.created_at) + ' '+ this.getTime(item.created_at);
                        return item;
                    });
                    this.categoriesListMeta = res.meta;
                    this.categoriesListMeta.columns = this.columns;
                    this.loading = false;
                }, () => {
                    this.tableError = true;
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            changePage(e){
                this.page = e;
                this.getCategories();
            },
            routeToSort(){
                this.$router.push('/categories-sort');
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>