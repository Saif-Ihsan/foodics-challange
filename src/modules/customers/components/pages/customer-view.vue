<template>
    <div class="container flex flex-wrap mx-auto" v-if="customerDetails">
        <Toast position="top-right" />
        <div class="w-full text-right">
            <Button icon="pi pi-pencil pl-1" class="bg-blue" @click="ShowEditCustomerModel = true"/>
        </div>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Name:</label>
            <p>{{customerDetails.name}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Email:</label>
            <p>{{customerDetails.email}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Phone number:</label>
            <p>{{customerDetails.dial_code}}{{customerDetails.phone}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Last order date:</label>
            <p>{{date(customerDetails.updated_at)}} {{getTime(customerDetails.updated_at)}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Order count:</label>
            <p>{{customerDetails.order_count}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">birthday:</label>
            <p>{{customerDetails.birth_date}}</p>
        </label>
        <label class="flex  mb-3 font-bold w-1/3 text-center" >
            <label class="mr-3 mb-2">Gender:</label>
            <p>{{getGender}}</p>
        </label>
        <Button icon="pi-undo pi" label="Restore" class="bg-blue" @click="restoreCustomer" v-if="customerDetails.deleted_at"/>
        <Button icon="pi-trash pi" label="Delete" class="bg-red" @click="deleteCustomer" v-else/>
        <createCustomer v-if="ShowEditCustomerModel" @on-close="closeUpdate" :data="customerDetails" />

    </div>
</template>

<script>
import CustomersService from '../../customers.service';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import createCustomer from '../create-customer';

const customersService = new CustomersService();

    export default {
        components:{
            Button,
            Toast,
            createCustomer
        },
        data(){
            return {
                id: this.$route.params.id,
                customerDetails: null,
                ShowEditCustomerModel: false
            };
        },
        computed:{
            getGender(){
                if (this.customerDetails.gender === 1) {
                    return 'Male';
                } else if(this.customerDetails.gender === 2){
                    return 'Female';
                }
                return '';
            }
        },
        created(){
            this.getCustomer();
        },
        methods: {
            getCustomer(){
                customersService.getCustomer(this.id).then(res =>{
                    this.customerDetails =  res.data;
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            restoreCustomer(){
               customersService.restoreCustomer(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Customer Restored', detail:'Customer has been restored Successfully', life: 3000});
                    this.getCustomer();
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });  
            },
            deleteCustomer(){
                customersService.deleteCustomer(this.id).then(() =>{
                    this.$toast.add({severity:'success', summary: 'Customer Deleted', detail:'Customer has been deleted Successfully', life: 3000});
                    this.getCustomer();
                },()=>{
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                }); 
            },
            closeUpdate(e){
                this.getCustomer();
                this.ShowEditCustomerModel = e;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>