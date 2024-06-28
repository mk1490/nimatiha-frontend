<template>
    <div class="row">
        <div class="col-12">
            <base-select
                    item-text="title"
                    item-value="id"
                    label="دلیل"
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
</template>

<script>
export default {
    name: "RejectionReasons",
    created() {
        this.httpGet(`/rejection-template/list`, data => {
            this.items = data;
        })
    },
    data() {
        return {
            items: [],
            model: {
                rejectionTemplateId: null,
                description: null,
            }
        }
    }
}
</script>

<style scoped>

</style>