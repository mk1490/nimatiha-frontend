<template>
    <base-card-layout title="درخواست‌های مشتریان">
        <base-table
                :headers="table.headers"
                :items="table.contents"
                :actions="table.actions">
            <template v-slot:item.origin="{item}">
                <div>
                    {{ item.srcCity }} ({{ item.originProvince }})
                </div>
            </template>
            <template v-slot:item.destination="{item}">
                <div>
                    {{ item.destinationCity }} ({{ item.destinationProvince }})
                </div>
            </template>
            <template v-slot:item.createDate="{item}">
                <div>{{ getPersianTime(item.createDate) }}</div>
            </template>
        </base-table>
        <request-details-modal
                v-if="modal.visible"
                :visible.sync="modal.visible"
                v-model="modal.data"
        />
    </base-card-layout>
</template>

<script>
import RequestDetailsModal from "@/view/components/Reports/CustomerReportsInbox/RequestDetailsModal.vue";

export default {
    name: "CustomerReportsInbox",
    components: {RequestDetailsModal},
    created() {
        this.httpGet(`/customer-report/list`, result => {
            this.table.contents = result;
        })
    },
    data() {
        return {
            modal: {
                visible: false,
                data: null,
            },
            table: {
                headers: [
                    {text: 'مبدأ', value: 'origin'},
                    {text: 'مقصد', value: 'destination'},
                    {text: 'کاربر', value: 'fullName'},
                    {text: 'تاریخ درخواست', value: 'createDate'},
                ],
                contents: [],
                actions: [
                    {
                        icon: 'mdi-eye',
                        title: 'مشاهده جزئیات',
                        click: async (item) => {
                            this.httpGet(`/customer-report/${item.id}`, result => {
                                this.modal.data = {...result};
                                this.modal.visible = true;
                            })

                        }
                    }
                ],
            }
        }
    }
}
</script>

<style scoped>

</style>