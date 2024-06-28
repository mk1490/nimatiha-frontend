<template>
    <base-modal
            title="مشاهده جزئیات"
            @close="$emit('update:visible', false)"
            @submit="updateStatus"
            :visible="visible">
        <div class="row">
            <div class="col-12">
                <base-simple-table
                        :items="table.items"
                />
            </div>
            <div class="col-12">
                <base-select
                        label="تغییر وضعیت آگهی"
                        v-model="model.status"
                        :items="items.status"
                        :clearable="false"
                />
            </div>
        </div>

    </base-modal>
</template>

<script>
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
    name: "RequestDetailsModal",
    components: {BaseSelect},
    props: {
        value: undefined,
        visible: Boolean,
    },
    created() {
        this.table.items.push(this.getSimpleTableKeyValueObject('نام و نام خانوادگی', this.value.customerNameAndFamily))
        this.table.items.push(this.getSimpleTableKeyValueObject('تلفن همراه', this.value.nameAndFamily))
        this.table.items.push(this.getSimpleTableKeyValueObject('تاریخ درخواست', this.getPersianTime(this.value.createDate)))
        this.table.items.push(this.getSimpleTableKeyValueObject('راننده درخواست گیرنده', this.value.driverName))
        this.table.items.push(this.getSimpleTableKeyValueObject('شماره تماس راننده', this.value.driverMobileNumber))
        this.table.items.push(this.getSimpleTableKeyValueObject('توضیحات', this.value.description))
        this.table.items.push(this.getSimpleTableKeyValueObject('وضعیت', this.getStatusText(this.value.status)))

        this.items.status.push(this.getComboBoxKeyValueObject('انتشار آگهی', 1));
        this.items.status.push(this.getComboBoxKeyValueObject('حذف و بایگانی', 2));

        this.model.status = this.items.status[0]
    },
    data() {
        return {
            table: {
                items: [],
            },
            items: {
                status: [],
            },
            model: {
                status: null,
            }
        }
    },
    methods: {
        getStatusText(status) {
            switch (status) {
                case 0:
                    return 'در انتظار تأیید';
            }
        },
        updateStatus(){
            this.httpPut(`/customer-report/update-status`, {
                status: this.model.status,
            }, result=>{

            })
        }
    }
}
</script>

<style scoped>

</style>