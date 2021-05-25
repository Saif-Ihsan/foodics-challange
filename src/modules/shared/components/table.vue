<template>
    <div >
        <DataTable  :value="data" v-if="data.length" :loading="loading">
            <Column v-for="(item, index) in meta.columns" :key="index" :field="item.value" :header="item.title"></Column>
            <template #loading>
                Loading records, please wait...
            </template>
            <Column header="Actions">
                <template #body="dataItem">
                    <Button icon="pi pi-eye ml-1" class="p-button-rounded bg-primary border-primary" @click="viewItem(dataItem.data.id)" />
                </template>
            </Column>
        </DataTable>
        <div class="flex justify-center h-80" v-else>
            <h1 class="self-center">No Result Found</h1>
        </div>
        <Paginator v-if="data.length" :first="meta.from" @page="changePage" :rows="meta.per_page" :totalRecords="meta.total" />

    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';

    export default {
        components:{
            DataTable,
            Column,
            Paginator,
            Button
        },
        props: ['data', 'meta', 'loading', 'type'],
        emits: ['change-page'],
        methods:{
            changePage(e){
                this.$emit('change-page', e.page+1);
            },
            viewItem(id){
                this.$router.push(`/${this.type}/${id}`);
            }
        }
    };
</script>

<style lang="scss">
</style>