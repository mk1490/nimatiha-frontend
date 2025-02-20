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
        }, children: [
            {
                path: 'test-management',
                name: 'test-management',
                component: () => import('@/view/components/Admin/PublishedTests/PublishedTests.vue'),
                meta: {
                    title: 'آزمون',
                    icon: 'mdi-format-list-checks',
                },
            },
            {
                path: 'questionnaires-management',
                name: 'questionnaires-management',
                component: () => import('@/view/components/Admin/Questionnaire/QuestionnaireManagement.vue'),
                meta: {
                    title: 'فرم‌ساز',
                    icon: 'mdi-format-list-checks',
                },
            },
            {
                path: 'courses',
                name: 'courses',
                component: () => import('@/view/components/Admin/Courses/CoursesManagement.vue'),
                meta: {
                    title: 'دوره‌ها',
                    icon: 'mdi-format-list-checks',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
            {
                path: 'coaches',
                name: 'coaches',
                component: () => import('@/view/components/Admin/Coaches/Coaches.vue'),
                meta: {
                    title: 'مربیان',
                    icon: 'mdi-format-list-checks',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/view/components/Admin/Settings/Settings.vue'),
                meta: {
                    title: 'تنظیمات',
                    icon: 'mdi-cog',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },
        ]
    },
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
        }, children: [
            {
                path: 'answerSheets',
                name: 'answerSheets',
                component: () => import('@/view/components/Admin/AnswerSheets/AnswerSheets.vue'),
                meta: {
                    title: 'پاسخ‌نامه',
                    icon: 'mdi-book-open-page-variant',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
                },
            },


        ]
    },
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
        }, children: [
            {
                path: 'answeredTests',
                name: 'answeredTests',
                component: () => import('@/view/components/Admin/AnsweredTests/AnsweredTests.vue'),
                meta: {
                    title: 'پاسخ‌نامه آزمون',
                    icon: 'mdi-book-open-page-variant',
                    // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
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
