<template>
    <base-card-layout
            @buttonClick="defineOrEditCustomer(null)"
            button-title="تعریف مشتری جدید"
            title="مشتریان">
        <base-table
                :headers="table.headers"
                :items="table.contents"
                :actions="table.actions"
        />

        <define-or-edit-customer-modal
                v-if="modal.visible"
                :data="modal.data"
                :visible.sync="modal.visible"
        />
        <purchased-package-history-modal
                v-if="modal.purchasedPackages.visible"
                :visible.sync="modal.purchasedPackages.visible"
                v-model="modal.purchasedPackages.data"
        />
    </base-card-layout>
</template>

<script>
import DefineOrEditCustomerModal from "@/view/components/Admin/Customers/DefineOrEditCustomerModal.vue";
import PurchasedPackageHistoryModal from "@/view/components/Admin/Customers/PurchasedPackageHistoryModal.vue";

export default {
    name: "CustomersManagement",
    components: {PurchasedPackageHistoryModal, DefineOrEditCustomerModal},
    async created() {
        const [err, data] = await this.to(this.http.get(`/customer/list`));
        if (!err) {
            this.table.contents = data;
        }
    },
    data() {
        return {
            modal: {
                visible: false,
                data: null,
                purchasedPackages: {
                    visible: false,
                    data: null,
                }
            },
            table: {
                headers: [
                    {text: 'نام', value: 'name'},
                    {text: 'نام خانوادگی', value: 'family'},
                    {text: 'شماره همراه', value: 'mobileNumber'},
                ],
                contents: [],
                actions: [
                    {
                        icon: 'mdi-delete',
                        title: 'حذف',
                        color: 'red',
                        click: (event) => {
                            this.delete(event);
                        }
                    },
                    {
                        icon: 'mdi-eye',
                        title: 'مشاهده جزئیات',
                        click: (event) => {

                        }
                    },
                    {
                        icon: 'mdi-history',
                        title: 'سوابق بسته‌های خریداری شده',
                        click: (event) => {

                        }
                    },
                    {
                        icon: 'mdi-pen',
                        title: 'ویرایش',
                        click: (item) => {
                            this.defineOrEditCustomer(item);
                        }
                    }
                ]
            },
        }
    },
    methods: {
        async delete(item) {
            const modal = await this.deleteModal.show();
            if (!modal)
                return;
            const [err] = await this.to(this.http.delete(`/customer/${item.id}`,));
            if (!err) {
                this.table.contents.splice(this.table.contents.indexOf(item), 1);
            }
        },
        defineOrEditCustomer(item) {
            this.modal.data = item;
            this.modal.visible = true;
        }
    }

}
</script>

<style scoped>

</style>