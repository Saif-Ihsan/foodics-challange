import  BaseApi  from '../../base-api.js';

export default class ProjectService extends BaseApi {
    constructor() {
        super();
    }
    getProducts(page, name, category){
        return super.GET(`/products?include=category&page=${page}&filter[name]=${name}&filter[category_id]=${category}`);
    }
    addProduct(form){
        return super.POST('/products', form);
    }
    updateProduct(id,form){
        return super.PUT(`/products/${id}`, form);
    }
    getProduct(id){
        return super.GET(`/products/${id}`);
    }
    restoreProduct(id){
        return super.PUT(`/products/${id}/restore`);
    }
    deleteProduct(id){
        return super.DELETE(`/products/${id}`);
    }
}