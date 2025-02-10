<template>
    <base-modal
            title="بانک سؤالات آزمون"
            width="600"
            @close="$emit('update:visible', false)"
            :visible="visible">


        <template v-slot:toolbar-action>
            <base-button
                    @click="define"
                    label="تعریف بانک سؤال جدید"
            />


        </template>


        <base-table
                :headers="table.headers"
                :items="table.contents"
                :actions="table.actions"
        />


        <questions-modal
                v-if="modal.questions.visible"
                :visible.sync="modal.questions.visible"
                :data="modal.questions.data"
                :question-id="modal.questions.id">

        </questions-modal>

    </base-modal>
</template>

<script>
import QuestionsModal from "@/view/components/Admin/PublishedTests/QuestionsBank/Questions/QuestionsModal.vue";

export default {
    name: "QuestionsBankModal",
    components: {QuestionsModal},
    props: {
        visible: Boolean,
    },
    created() {
        this.httpGet(`/test/list`, result => {
            this.table.contents = result;
        })
    },
    data() {
        return {
            table: {
                headers: [
                    {text: 'عنوان', value: 'title'},
                    {text: 'تعداد سوالات', value: 'questionsCount'},
                ],
                contents: [],
                actions: [
                    // {
                    //     title: 'ویرایش',
                    //     icon: 'mdi-pen',
                    //     click: (item) => {
                    //         // this.modal.data = item;
                    //         // this.modal.index = this.table.contents.indexOf(item);
                    //         // this.modal.visible = true;
                    //     }
                    // },
                    {
                        title: 'سوالات',
                        icon: 'mdi-comment-question-outline',
                        click: (item) => {
                            this.httpGet(`/test/${item.id}`, result => {
                                this.modal.questions.data = result;
                                this.modal.questions.id = item.id;
                                this.modal.questions.visible = true;
                            })

                        }
                    }
                ],
            },
            modal: {
                visible: false,
                data: null,
                questions: {
                    visible: false,
                    id: null,
                    data: null,
                }
            }
        }
    },
    methods: {
        define() {
            this.modal.questions.visible = true;
        }
    }
}
</script>

<style scoped>

</style>