<template>
    <v-container>
        <div class="row">
            <div class="col-12">
                <base-text-field
                        v-model="model"
                        label="Api key"
                        dir="ltr"
                />
            </div>
        </div>
    </v-container>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";

export default {
    name: "InfluxSettings",
    components: {BaseTextField},
    props: {
        value: undefined,
    },
    data() {
        return {
            model: null,
        }
    },
    created() {
        this.model = this.value;
    },
    watch: {
        'model': {
            handler() {
                this.$emit('input', this.model)
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

</style>