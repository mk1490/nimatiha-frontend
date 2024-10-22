<template>
  <base-card-layout
      title="مدیریت درخواست‌های عضویت">


    <template v-slot:button-area>
      <div class="d-inline-flex align-center">
        <v-btn
            class="ml-4"
            @click="downloadExcel"
            color="primary">
          <v-icon>
            mdi-file-excel
          </v-icon>
          دانلود اکسل
        </v-btn>
      </div>
    </template>


    <base-table
        :headers="table.headers"
        :items="table.contents"
        :actions="table.actions">
      <template v-slot:item.status="{item}">
        <v-chip :color="getItemColor(item)">
          {{ getItemText(item.status) }}
        </v-chip>
      </template>
      <template v-slot:item.workflow="{item}">
        <div class="workflow">
          {{ item.notifications }}
        </div>
      </template>
      <template v-slot:item.initialCashAmount="{item}">
        {{ addCommas(item.initialCashAmount) }}
      </template>
      <template v-slot:item.monthlyInstallmentsAmount="{item}">
        {{ addCommas(item.monthlyInstallmentsAmount) }}
      </template>
      <template v-slot:item.monthlyIncome="{item}">
        {{ addCommas(item.monthlyIncome) }}
      </template>
      <template v-slot:item.creationTime="{item}">
        {{ getPersianTime(item.creationTime, 'YYYY/MM/DD') }}
      </template>
    </base-table>

    <member-details-modal
        v-if="modal.details.visible"
        :visible.sync="modal.details.visible"
        :data="modal.details.data"
    />

  </base-card-layout>
</template>

<script>
import {addCommas} from "@persian-tools/persian-tools";
import xlsx from "json-as-xlsx";
import {mapGetters} from "vuex";
import MemberDetailsModal from "@/view/components/Admin/Members/MemberRequestsInbox/Modals/MemberDetailsModal.vue";

export default {
  name: "MembersManagement",
  components: {MemberDetailsModal},
  created() {
    this.httpGet(`/member-request/list`, result => {
      this.table.contents = result;
    })
  },
  data() {
    return {
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
          {text: 'وضعیت', value: 'status'},
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
        projects: [],
      },
      filter: {
        isFiltered: false,
        trackingCode: null,
        projectId: null,
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
      this.httpGet(`/member-request/list/${this.filter.projectId}${this.filter.trackingCode ? '?trackingCode=' + this.filter.trackingCode : ''}`, (data) => {
        this.table.contents = data;
        if (this.filter.trackingCode) {
          this.filter.isFiltered = true;
        }
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
    downloadExcel() {
      if (this.table.contents.length == 0) {
        this.$swal.fire({
          icon: 'warning',
          text: 'موردی جهت دانلود وجود ندارد!'
        })
        return;
      }
      const _h = [
        {label: 'ردیف', value: 'row'},
        {label: 'نام', value: 'name'},
        {label: 'نام خانوادگی', value: 'family'},
        {label: 'نام پدر', value: 'fatherName'},
        {label: 'کد ملّی', value: 'nationalCode'},
        {label: 'تاریخ تولد', value: 'birthDate'},
        {label: 'شماره تلفن همراه', value: 'mobileNumber'},
        {label: 'وضعیت معلولیت', value: 'nationalCode'},
        {label: 'توضیحات معلولیت', value: 'nationalCode'},
        {label: 'سابقه بیماری', value: 'job'},
        {label: 'شرح سابقه بیماری', value: 'job'},
        {label: 'شهرستان محل سکونت', value: 'mobileNumber'},
        {label: 'نشانی محل سکونت', value: 'birthCertificateNumber'},
        {label: 'وضعیت تک فرزندی', value: 'birthPlace'},
        {label: 'تعداد اعضای خانواده', value: 'birthPlace'},
        {label: 'نام پدر', value: 'birthPlace'},
        {label: 'نام خانوادگی پدر', value: 'birthPlace'},
        {label: 'تحصیلات پدر', value: 'birthPlace'},
        {label: 'وضعیت حیات پدر', value: 'birthPlace'},
        {label: 'نام مادر', value: 'birthPlace'},
        {label: 'نام خانوادگی مادر', value: 'birthPlace'},
        {label: 'تحصیلات مادر', value: 'birthPlace'},
        {label: 'وضعیت حیات مادر', value: 'birthPlace'},
        {label: 'مقطع تحصیلی', value: 'birthPlace'},
        {label: 'پایه تحصیلی', value: 'birthPlace'},
        {label: 'محل تحصیل (مشهد / شهرستان)', value: 'birthPlace'},
        {label: 'ناحیه / شهرستان محل تحصیل', value: 'birthPlace'},
        {label: 'معدل', value: 'birthPlace'},
        {label: 'نام مدرسه', value: 'birthPlace'},
        {label: 'نام مدیر', value: 'birthPlace'},
        {label: 'نام نام معاون پرورشی', value: 'birthPlace'},
        {label: 'نام نام معاون پرورشی', value: 'birthPlace'},
        {label: 'کد پیگیری سیستمی', value: 'trackingCode'},
        {label: 'تاریخ ثبت نام', value: 'creationTime'},
      ]
      const _c = [...this.table.contents].map((f, i) => {
        f.row = i + 1;
        delete f.id;
        delete f.creatorId;
        delete f.projectId;
        delete f.parentUserId;
        delete f.status;
        return f;
      })
      let settings = {
        fileName: `Nimkatiha_DataExport_${this.faToEn(this.getPersianTime(new Date(), 'YYYY_MM_DD_HH_mm_ss'))}`,
        writeMode: "writeFile",
        RTL: true,
        writeOptions: {},
      }
      xlsx([{
        sheet: 'Main',
        content: _c,
        columns: _h,
      }], settings);
    },
  },
  watch: {
    'filter.projectId': {
      handler(value) {
        localStorage.setItem('lastSelectedProjectId', value);
        this.fetchData();
      }
    }
  }
}
</script>

<style scoped>

</style>