<template>
    <div class="row">
        <div class="col-12">
            <base-text-field
                    label="نام کاربری"
                    v-model="model.username"
                    dir="ltr"
            />
        </div>
        <div class="col-12">
            <base-text-field
                    label="کلمۀ عبور"
                    v-model="model.password"
                    dir="ltr"
                    :append-icon="passwordVisible ? 'mdi-eye-off': 'mdi-eye'"
                    @click:append="passwordVisible =!passwordVisible"
                    :type="passwordVisible ? '': 'password'"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AssignUsernameAndPassword",
    props: {
        visible: Boolean,
        value: undefined,
    },
    emits: ['onSubmit'],
    created() {
        this.model = this.value;
    },
    data() {
        return {
            passwordVisible: false,
            model: {
                username: null,
                password: null,
            }
        }
    },
    watch: {
        'model': {
            handler(val) {
                this.$emit('update:input', val)
            }
        }
    }

}
</script>

<style scoped>

</style>