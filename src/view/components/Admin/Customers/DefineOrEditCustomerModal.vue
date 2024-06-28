<template>
    <base-modal
            :title="data? 'ویرایش مشتری': 'تعریف مشتری جدید'"
            @close="$emit('update:visible', false)"
            :visible="visible">
        <div class="row">
            <div class="col-12">
                <base-text-field
                        label="نام"
                        v-model="model.name"
                />
            </div>
            <div class="col-12">
                <base-text-field
                        label="نام خانوادگی"
                        v-model="model.family"
                />
            </div>
            <div class="col-12">
                <base-text-field
                        type="tel"
                        label="شماره همراه"
                        v-model="model.mobileNumber"
                />
            </div>
        </div>
    </base-modal>
</template>

<script>

export default {
    name: "DefineOrEditCustomerModal",
    props: {
        data: Object,
        visible: Boolean,
    },
    data() {
        return {
            model: {
                name: null,
                family: null,
                mobileNumber: null,
            }
        }
    },
    methods: {
        async submit() {
            const [err, data] = await this.to(this.http.post(``));
            if (!err) {
                this.$emit('onAddItem', data);
            }
        }
    }
}
</script>

<style scoped>

</style>