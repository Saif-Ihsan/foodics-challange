import  BaseApi  from '../../base-api.js';

export default class ProjectService extends BaseApi {
    constructor() {
        super();
    }
    getCustomers(page, email, phone){
        return super.GET(`/customers?page=${page}&filter[email]=${email}&filter[phone]=${phone}`);
    }
    addCustomer(form){
        return super.POST('/customers', form);
    }
    updateCustomer(id,form){
        return super.PUT(`/customers/${id}`, form);
    }
    getCustomer(id){
        return super.GET(`/customers/${id}`);
    }
    restoreCustomer(id){
        return super.PUT(`/customers/${id}/restore`);
    }
    deleteCustomer(id){
        return super.DELETE(`/customers/${id}`);
    }
}