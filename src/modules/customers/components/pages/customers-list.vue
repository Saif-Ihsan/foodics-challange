<template>
    <div class="customer-container w-full flex  flex-wrap">
        <Toast position="top-right" />
        <div class="w-full flex justify-between mb-5">
            <h1>Customers List</h1>
            <p class="cursor-pointer hover:underline my-auto text-blue text-lg" @click="ShowAddCustomerModel = true;"><i class="pi pi-plus"></i> Create Customer</p>
        </div>
        <div class="w-11/12 mx-auto mb-5 flex justify-between">
            <InputText type="text" v-model="email" placeholder="Filter By Email"/>
            <InputText type="text" v-model="phone" placeholder="Filter By Phone" />
        </div>
        <Table class="mx-auto w-11/12" type="customer" v-if="customersList && customersListMeta && !tableError" :meta="customersListMeta" :data="customersList" :loading="loading" @change-page="changePage"/>
        <div class="flex justify-center h-80 w-full" v-else-if="tableError">
            <h2 class="self-center">Something went wrong please come back later...</h2>
        </div>
        <createCustomer v-if="ShowAddCustomerModel" @on-close="ShowAddCustomerModel = $event;" />
    </div>
</template>

<script>
import CustomersService from '../../customers.service';
import Table from '../../../shared/components/table';
import InputText from 'primevue/inputtext';
import createCustomer from '../create-customer';
import Toast from 'primevue/toast';


const customersService = new CustomersService();
    export default {
        components:{
            Table,
            InputText,
            Toast,
            createCustomer
        },
        data(){
            return {
                page: 1,
                email: '',
                phone: '',
                loading: false,
                customersList: null,
                customersListMeta:null,
                columns: [{
                        value: 'name',
                        title: 'Name'
                    },
                    {
                        value: 'email',
                        title: 'Email'
                    },
                    {
                        value: 'phone',
                        title: 'Phone Number'
                    },
                    {
                        value: 'updated_at',
                        title: 'Last Order Date'
                    }
                ],
                tableError: false,
                ShowAddCustomerModel: false
            };
        },
        watch: {
            email(){
                this.getCustomers();
            },
            phone(){
                this.getCustomers();
            }
        },
        created(){
            this.getCustomers();
        },
        methods:{
            getCustomers(){
                this.loading = true;
                this.customersList= null;
                customersService.getCustomers(this.page, this.email, this.phone).then(res=>{
                    this.customersList = res.data.map(item => {
                        item.updated_at = this.date(item.updated_at) + ' '+ this.getTime(item.updated_at);
                        return item;
                    });
                    this.customersListMeta = res.meta;
                    this.customersListMeta.columns = this.columns;
                    this.loading = false;
                }, () => {
                    this.tableError = true;
                    this.$toast.add({severity:'error', summary: 'Server Error', detail:'Something went wrong, Please try again later ...', life: 3000});
                });
            },
            changePage(e){
                this.page = e;
                this.getCustomers();
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>