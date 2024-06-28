<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">

            <v-text-field
                    :label="label"
                    :value="computedDateFormattedMomentjs"
                    hide-details
                    dense
                    outlined
                    readonly
                    :disabled="disabled"
                    :clearable="clearable"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="clearTime"
                    @click="menu.visible = true">

            </v-text-field>
        </template>
        <v-date-picker
                v-model="date"
                :range="range">
            <v-spacer></v-spacer>
            <v-btn
                    text
                    color="primary"
                    @click="menu = false"
            >
                لغو
            </v-btn>
            <v-btn
                    text
                    color="primary"
                    @click="submit"
            >
                تأیید
            </v-btn>
        </v-date-picker>


        <!--        <date-picker-->
        <!--                v-model="date"-->
        <!--                format="YYYY-MM-DD HH:mm:ss"-->
        <!--                :type="hideTime ? 'date' : 'datetime'"-->
        <!--                :element="`time-input_${id}`"-->
        <!--                :range="range"-->
        <!--        />-->
    </v-menu>


</template>

<script>

import VuePersianDatetimePicker from "vue-persian-datetime-picker";

export default {
    name: "BaseDateTimeTextField",
    components: {
        DatePicker: VuePersianDatetimePicker
    },
    created() {
        this.date = this.value;
    },
    data() {
        return {
            date: null,
            datePicker: false,
            menu: false,
        }
    },
    props: {
        id: String,
        label: String,
        value: undefined,
        hideTime: {
            type: Boolean,
            default: false,
        },
        range: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        clearTime() {
            this.date = null;
            this.$emit('input', null);
        },
        submit() {
            this.$refs.menu.save(this.date);
            this.$emit('input', this.date);
        }
    },
    computed: {
        computedDateFormattedMomentjs() {
            const format = 'YYYY/MM/DD'
            if (Array.isArray(this.date)) {
                if (this.date.length > 1) {
                    return this.date ? `${this.getPersianTime(this.date[0], format)} الی ${this.getPersianTime(this.date[1], format)}` : '';
                }
                return this.date ? `${this.getPersianTime(this.date, format)}` : '';

            }
            return this.date ? `${this.getPersianTime(this.date, format)}` : '';

        },
    },
    watch: {
        date: {
            handler(value) {

            }
        }
    }
}
</script>

<style scoped>

</style>