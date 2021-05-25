import  BaseApi  from '../../base-api.js';

export default class ProjectService extends BaseApi {
    constructor() {
        super();
    }
    getCategories(page, name, reference){
        return super.GET(`/categories?page=${page}&filter[name]=${name}&filter[reference]=${reference}`);
    }
    addCategory(form){
        return super.POST('/categories', form);
    }
    updateCategory(id,form){
        return super.PUT(`/categories/${id}`, form);
    }
    getCategory(id){
        return super.GET(`/categories/${id}`);
    }
    restoreCategory(id){
        return super.PUT(`/categories/${id}/restore`);
    }
    deleteCategory(id){
        return super.DELETE(`/categories/${id}`);
    }
    getSortedCategories(){
        return super.GET('/menu_display');
    }
    updateSortedCategories(form){
        return super.PUT('/menu_display',form);
    }
}