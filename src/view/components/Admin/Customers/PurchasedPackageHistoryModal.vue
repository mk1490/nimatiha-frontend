<template>
    <base-modal
            title="مشاهده سوابق بسته‌های خریداری شده"
            @close="$emit('update:visible', false)"
            :visible="visible">

        <div class="row">
            <div class="col-12">
                <base-table
                        :items="table.contents"
                        :headers="table.headers"/>
            </div>
        </div>
    </base-modal>
</template>

<script>
export default {
    name: "PurchasedPackageHistoryModal",
    props: {
        visible: Boolean,
        input: Object,
    },
    created() {
        this.table.contents = this.input;
    },
    data() {
        return {
            table: {
                headers: [],
                contents: [],
            }
        }
    }
}
</script>

<style scoped>

</style>