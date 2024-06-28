<template>
    <base-modal
            title="رد کردن مشتری"
            @close="$emit('update:visible', false)"
            @submit="submit"
            :visible="visible">

        <div class="row">
            <div class="col-12">
                <base-select
                    item-text="title"
                    item-value="id"
                    v-model="model.rejectionTemplateId"
                    :items="items"/>
            </div>
            <div
                class="col-12">
                <base-text-area
                    label="شرح"
                    v-model="model.description"
                />
            </div>
        </div>

    </base-modal>
</template>

<script>

export default {
    name: "RejectionModal",
    props: {
        visible: Boolean,
        data: Object,
    },
    emits: ['onSubmit'],
    data() {
        return {
            items: [],
            model: {
                rejectionTemplateId: null,
                description: null,
            }
        }
    },
    async created() {
        this.data.items.map(f => {
            this.items.push(f)
        })
        this.model.rejectionTemplateId = this.items[0].id;
    },
    async submit() {
        this.httpPut(`/member-request/reject-customer/${this.data.customerItem.id}`, this.model, data => {
            this.$emit('onSubmit', data);
        })
    }
}
</script>

<style scoped>

</style>