import Vue from 'vue';
import i18n from '@/locale'

const baseData = {
    state: {
        tenantId: null,
        panelTitle: null,
        companyLogo: null,
        timeRangeItems: [{
            text: i18n.t('timeRangeItems.recent12Hour'), value: 'recent12Hour'
        }, {
            text: i18n.t('timeRangeItems.recent3Days'), value: 'recent3Days'
        }, {
            text: i18n.t('timeRangeItems.recent15Days'), value: 'recent15Days'
        }, {
            text: i18n.t('timeRangeItems.recentMonth'), value: 'recentMonth'
        }, {
            text: i18n.t('timeRangeItems.recent6Month'), value: 'recent6Month'
        }, {text: i18n.t('timeRangeItems.customTimeRange'), value: 'customTimeRange'},], discountTypeItems: [{
            text: i18n.t('discount.form.discountTypeItems.percentage'), value: 0
        }, {
            text: i18n.t('discount.form.discountTypeItems.amountage'), value: 1
        },]
    }, getters: {
        timeRangeItems: (state) => state.timeRangeItems,
        tenantId: (state) => state.tenantId,
        panelTitle: (state) => state.panelTitle,
        companyLogo: (state) => state.companyLogo,
    },

    mutations: {
        SET_TENANT_ID: (state, payload) => {
            state.tenantId = payload;
        },
        SET_PANEL_TITLE: (state, payload) => {
            state.panelTitle = payload;
        },
        SET_COMPANY_LOGO_URL: (state, payload) => {
            state.companyLogo = payload;
        }
    }, actions: {
        setInitializeData: ({commit}, payload) => {
            commit('SET_TENANT_ID', payload.tenantId)
            commit('SET_PANEL_TITLE', payload.panelTitle)
            commit('SET_COMPANY_LOGO_URL', payload.companyLogo)
        }
    },
};

export default baseData;
