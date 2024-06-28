<template>
    <base-modal
            width="400"
            title="تغییر وضعیت کاربر"
            @close="$emit('update:visible', false)"
            @submit="submit"
            :visible="visible">
        <div class="row">
            <div class="col-12">
                <base-select
                        label="وضعیت"
                        :items="items.statusItems"
                        v-model="model.status"
                        item-text="text"
                        item-value="value"
                />
            </div>
            <div class="col-12">
                <rejection-reasons
                        v-if="model.status == 103"
                />

                <assign-username-and-password
                        v-model="model.assignUsernameAndPassword"
                        v-if="model.status == 1 && data.status != 104"
                />
            </div>
        </div>
    </base-modal>
</template>

<script>

import RejectionReasons from "@/view/components/Admin/Members/MemberRequestsInbox/Modals/Widgets/RejectionReasons.vue";
import AssignUsernameAndPassword
    from "@/view/components/Admin/Members/MemberRequestsInbox/Modals/Widgets/AssignUsernameAndPassword.vue";

export default {
    name: "ChangeStatusModal",
    components: {AssignUsernameAndPassword, RejectionReasons},
    props: {
        data: Object,
        visible: Boolean,
    },
    emits: ['onUpdate'],
    created() {
        this.data.statusItems.map(f => {
            this.items.statusItems.push({
                value: f,
                text: this.getStatusTitle(f)
            })
        })
    },
    methods: {
        submit() {

            if (this.model.status == 1 && this.data.status != 104) {
                console.log(this.data)
                this.httpPut(`/member-request/approve-customer/${this.data.memberId}`, this.model.assignUsernameAndPassword, (data) => {
                    this.$emit('onUpdate', data);
                })
            } else {
                this.httpPut(`/member-request/change-status/${this.data.id}`, {
                    status: this.model.status,
                }, data => {
                    this.$emit('onUpdate', data);
                })
            }
        },
        deleteOption(value) {
            this.items.status.splice(this.items.status.findIndex(x => x.value === value), 1);
            this.model.status = this.items.status[0].value;
        },
        getStatusTitle(value) {
            const items = [
                {
                    text: 'مراجعه به دفتر',
                    value: 105
                },
                {
                    text: 'تأیید نمودن',
                    value: 1
                },
                {
                    text: 'رد کردن ثبت نام',
                    value: 103
                },
                {
                    text: 'غیر فعال نمودن',
                    value: 104
                },
            ];

            const item = items.find(x => x.value === value);
            return item ? item.text : '';
        }
    },
    data() {
        return {
            items: {
                statusItems: [],
            },
            model: {
                status: 100,
                assignUsernameAndPassword: {
                    username: null,
                    password: null,
                }
            }
        }
    },
}
</script>

<style scoped>

</style>