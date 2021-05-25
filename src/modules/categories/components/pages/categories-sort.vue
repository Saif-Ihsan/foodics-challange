<template>
    <div class="category-container w-full flex  flex-wrap">
        <Toast position="top-right" />
        <div class="w-full flex justify-between mb-5">
            <h1>Categories List(Sort)</h1>
        </div>

        <draggable  v-if="isSorted" :list="categories"  tag="transition-group" ghost-class="ghost" item-key="id" @end="changeOrder">
            <template #item="{ element, index }">
                <div class="item w-1/5   " :key="index">
                   <div class="m-3 px-10 py-5 item-name cursor-grab">{{element.name}}</div> 
                </div>
            </template>
        </draggable>
    </div>
</template>

<script>
import Toast from 'primevue/toast';
import draggable from 'vuedraggable';
import CategoriesService from '../../categories.service';

const categoriesService = new CategoriesService();
    export default {
        components:{
            Toast,
            draggable
        },
        data(){
            return{
                categories: [],
                page: 1,
                isSorted: false
            };
        },
        created(){
            this.getAllCategories();
        },
        methods: {
            getAllCategories(){
                categoriesService.getCategories(this.page, '', '').then(res =>{
                   this.categories = this.categories.concat(res.data);
                   if (this.page < res.meta.last_page) {
                       this.page++;
                       this.getAllCategories();
                   } else{
                       categoriesService.getSortedCategories().then(res=>{
                           this.categories = res.data.categories.map(item =>{
                               return this.categories.find(cat=> cat.id === item.category_id);
                           });
                           console.log(JSON.parse(JSON.stringify(this.categories)));
                           this.isSorted = true;
                       });
                   }
                });
            },
            changeOrder(e){
                categoriesService.updateSortedCategories({'categories': this.categories.map(item => {return{'category_id': item.id, children: []};})}).then(() =>{},
                ()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
.cursor-grab{
    cursor: grab;
}
.item {
    .item-name{
        background: #e9ecef;
    }
}
</style>