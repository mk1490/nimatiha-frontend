<template>
  <base-tab-layout
      :tabs="tabs">



  </base-tab-layout>
</template>

<script>
import {addCommas} from "@persian-tools/persian-tools";
import xlsx from "json-as-xlsx";
import {mapGetters} from "vuex";
import MemberDetailsModal from "@/view/components/Admin/Members/MemberRequestsInbox/Modals/MemberDetailsModal.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import membersMixin from "@/view/components/Admin/Members/membersMixin";
import BaseTabLayout from "@/view/widget/Base/BaseTabLayout.vue";

export default {
  name: "MembersManagement",
  components: {BaseTabLayout, BaseSelect, MemberDetailsModal},
  mixins: [membersMixin],
  created() {
    this.fetchData()
  },
  data() {
    return {
      tabs: [
        {
          title: 'اساتید',
          key: 'teachers',
        },
      ],
      modal: {
        approve: {
          visible: false,
          data: null,
        },
        changeStatus: {
          visible: false,
          data: null,
          index: -1,
        },
        details: {
          visible: false,
          data: null,
          index: -1,
        },
        reject: {
          data: null,
          visible: false,
        },
        edit: {
          data: null,
          initialize: null,
          index: -1,
          visible: false,
        },
        workflow: {
          visible: false,
          data: null,
        }
      },
      table: {
        headers: [
          {text: 'نام', value: 'name'},
          {text: 'نام خانوادگی', value: 'family'},
          {text: 'پرسش‌نامه', value: 'questionnaireTitle'},
          {text: 'تاریخ ثبت', value: 'creationTime'},
        ],
        contents: [],
        actions: [
          // {
          //   title: 'مشاهدۀ گردش کار',
          //   icon: 'mdi-clipboard-flow',
          //   permission: 'members_request.change_status',
          //   click: (item) => {
          //     this.httpGet(`/member-request/workflow/${item.id}`, result => {
          //       this.modal.workflow.data = result;
          //       this.modal.workflow.visible = true;
          //     })
          //
          //   }
          // },
          // {
          //   title: 'تغییر وضعیت',
          //   icon: 'mdi-alert-octagon',
          //   permission: 'members_request.change_status',
          //   click: (item) => {
          //     this.changeStatus(item)
          //   }
          // },
          {
            title: 'مشاهدۀ جزئیات',
            icon: 'mdi-eye',
            permission: 'members_request.see_details',
            click: (item) => {
              this.seeDetails(item);
            }
          },
          {
            title: 'ویرایش',
            icon: 'mdi-pen',
            permission: 'members_request.update',
            click: (item) => {
              this.editItem(item)
            }
          },
        ],
        filters: [
          {
            value: 'name',
            type: 'text',
          },
          {
            value: 'family',
            type: 'text',
          },
          {
            value: 'initialCashAmount',
            type: 'text',
            width: 100
          },
          {
            value: 'monthlyIncome',
            type: 'text',
            width: 100
          },
          {
            value: 'monthlyInstallmentsAmount',
            type: 'text',
            width: 100
          },
          {
            value: 'suggestedUsableArea',
            type: 'text',
            width: 100
          },
          {
            value: 'status',
            type: 'select',
            width: 120,
            selectionMapping: ['0', '1'].map(f => {
              return {
                value: Number(f),
                text: this.getItemText(Number(f)),
              }
            })
          },
          {
            value: 'trackingCode',
            type: 'text',
            width: 100
          },
          {
            value: 'creationTime',
            type: 'datetime',
          },
        ],
      },
      items: {
        tests: [],
      },
      filter: {
        tests: [],
      }
    }
  },
  methods: {
    addCommas,
    requestEditModal() {
      this.modal.details.visible = false;
      this.editItem({...this.table.contents[this.modal.details.index]});
    },
    fetchData() {
      this.httpPost(`/member-request/list`, {
        tests: this.filter.tests
      }, (data) => {
        this.items.tests = data.initialize.filter.tests;
        this.table.contents = data.items;
      });
    },
    getItemColor(item) {
      switch (item.status) {
        case 0:
        case 100:
        case 101:
        case 102:
        case 105:
        case 106:
          return 'orange';
        case 104:
          return 'red';
        case 1:
          return 'green';
      }
    },
    getItemText(status) {
      switch (status) {
        case 0:
        case 1:
          return 'در انتظار تأیید';
        case 101:
          return 'تأیید شده، در انتظار بارگذاری مدارک';
        case 102:
          return 'در انتظار تأیید مدارک';
        case 104:
          return 'غیرفعال';
        case 105:
          return 'در انتظار مراجعه به دفتر';
        case 106:
          return 'در انتظار تأیید ارشد';
      }
    },
    rejectionSubmit(item) {
      this.table.contents.splice(this.table.contents.indexOf(item), 1, item);
      this.modal.reject.visible = false;
    },
    changeStatus(item) {
      this.httpGet(`/member-request/available-status-items/${item.id}`, result => {
        this.modal.changeStatus.index = this.table.contents.indexOf(item);
        this.modal.changeStatus.data = result;
        this.modal.changeStatus.visible = true;
      })

    },
    async seeDetails(item) {
      this.httpGet(`/member-request/${item.id}`, data => {
        this.modal.details.index = this.table.contents.indexOf(item);
        this.modal.details.data = data;
        this.modal.details.visible = true;
      })
    },
    editItem(item) {
      this.httpGet(`/member-request/${item.id}`, data => {
        this.modal.edit.index = this.table.contents.indexOf(item);
        this.modal.edit.data = data.information;
        this.modal.edit.initialize = data.initialize;
        this.modal.edit.visible = true;
      })
    },
  },
  watch: {
    'filter.tests': {
      handler(value) {
        this.fetchData();
      }
    }
  }
}
</script>

<style scoped>

</style>
