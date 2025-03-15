import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../view/layout/TheLayout.vue';

Vue.use(Router);

export const constantRoutes = [{
    path: '*', hidden: true,
},
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
            permission: [
                'management.test',
                'management.form_generator',
                'management.courses',
                'management.coaches',
                'management.settings',
            ],
        }, children: [
            {
                path: 'test-management',
                name: 'test-management',
                component: () => import('@/view/components/Admin/PublishedTests/PublishedTests.vue'),
                meta: {
                    title: 'آزمون',
                    icon: 'mdi-format-list-checks',
                    permission: 'management.test'
                },
            },
            {
                path: 'questionnaires-management',
                name: 'questionnaires-management',
                component: () => import('@/view/components/Admin/Questionnaire/QuestionnaireManagement.vue'),
                meta: {
                    title: 'فرم‌ساز',
                    icon: 'mdi-format-list-checks',
                    permission: 'management.form_generator'
                },
            },
            {
                path: 'courses',
                name: 'courses',
                component: () => import('@/view/components/Admin/Courses/CoursesManagement.vue'),
                meta: {
                    title: 'دوره‌ها',
                    icon: 'mdi-playlist-check',
                    permission: 'management.courses'
                },
            },
            {
                path: 'coaches',
                name: 'coaches',
                component: () => import('@/view/components/Admin/Coaches/Coaches.vue'),
                meta: {
                    title: 'مربیان',
                    icon: 'mdi-format-list-checks',
                    permission: 'management.coaches'
                },
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/view/components/Admin/Settings/Settings.vue'),
                meta: {
                    title: 'تنظیمات',
                    icon: 'mdi-cog',
                    permission: 'management.settings'
                },
            },
        ]
    },
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
            permission: 'report.answer_sheet'
        }, children: [
            {
                path: 'answerSheets',
                name: 'answerSheets',
                component: () => import('@/view/components/Admin/AnswerSheets/AnswerSheets.vue'),
                meta: {
                    title: 'پاسخ‌نامه',
                    icon: 'mdi-book-open-page-variant',
                    permission: 'report.answer_sheet'
                },
            },


        ]
    },
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
            permission: 'report.answered_tests'
        }, children: [
            {
                path: 'answeredTests',
                name: 'answeredTests',
                component: () => import('@/view/components/Admin/AnsweredTests/AnsweredTests.vue'),
                meta: {
                    title: 'پاسخ‌نامه آزمون',
                    icon: 'mdi-book-open-page-variant',
                    permission: 'report.answered_tests'
                },
            },
        ]
    },
    {
        path: '/report', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: "گزارش",
            permission: 'management.coaches'
        }, children: [
            {
                path: 'coaches',
                name: 'coachesReport',
                component: () => import('@/view/components/Reports/CoachReports.vue'),
                meta: {
                    title: 'عملکرد مربیان',
                    // icon: 'mdi-book-open-page-variant',
                    // permission: 'report.answered_tests'
                    permission: 'management.coaches'
                },
            },
            {
                path: 'coachTests',
                name: 'coachesTestReport',
                component: () => import('@/view/components/Reports/CoachTests/CoachTests.vue'),
                meta: {
                    title: 'کارنامه آزمون',
                    // icon: 'mdi-book-open-page-variant',
                    // permission: 'report.answered_tests'
                    permission: 'management.coaches'
                },
            },
            {
                path: 'homeWorks',
                name: 'homeWorks',
                component: () => import('@/view/components/Reports/Homeworks.vue'),
                meta: {
                    title: 'تکالیف ارسالی',
                    permission: 'management.coaches'
                    // icon: 'mdi-book-open-page-variant',
                    // permission: 'report.answered_tests'
                },
            },
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import('@/view/components/Auth/Login.vue'),
        hidden: true,
        meta: {},
    }];
export default new Router({
    scrollBehavior: () => ({y: 0}), routes: constantRoutes, mode: 'hash', // base: '/admin/'
});
export const asyncRoutes = [{path: '*', redirect: '/error/404', hidden: true},];
