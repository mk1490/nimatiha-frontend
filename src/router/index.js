import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../view/layout/TheLayout.vue';
import TheLayout from "@/view/layout/TheLayout.vue";

Vue.use(Router);

export const constantRoutes = [{
    path: '*', hidden: true,
},
    //
    // {
    //     path: 'dashboard', name: 'Dashboard', component: TheLayout,
    //     children: [
    //         {
    //             path: '/Dashboard',
    //             name: 'Dashboard',
    //             component: () => import('@/view/components/Admin/Dashboard/Dashboard.vue'),
    //             meta: {
    //                 icon: 'mdi-gauge',
    //                 title: 'داشبورد',
    //                 // permission: ['reports.event_records']
    //             },
    //         }
    //     ], meta: {},
    // },
    {
        path: '/', name: 'Root', component: Layout, meta: {
            noCache: true,
            affix: true,
            title: 'route.Management',
        }, children: [
            {
                path: 'Users',
                name: 'Users',
                component: () => import('@/view/components/Admin/Users/UsersManagement.vue'),
                meta: {
                    title: 'route.users',
                    icon: 'mdi-account-multiple',
                    // permission: 'users.list,users.update,users.insert,users.delete,users.change_password'
                },
            },
            // {
            //     path: 'members',
            //     name: 'members',
            //     component: () => import('@/view/components/Admin/Members/MembersManagement.vue'),
            //     meta: {
            //         title: 'اعضا',
            //         icon: 'mdi-account-settings',
            //         // permission: 'access_permissions.list,access_permissions.update,access_permissions.insert,access_permissions.delete'
            //     },
            // },
            {
                path: 'membersRequestInbox',
                name: 'membersRequestInbox',
                component: () => import('@/view/components/Admin/Members/MemberRequestsInbox/MemberRequestsInbox.vue'),
                meta: {
                    title: 'route.memberRequestsInbox',
                    icon: 'mdi-account-settings',
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
