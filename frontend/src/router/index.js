import { createRouter, createWebHistory } from "vue-router";
import store from '../store';
import LogIn from '../views/LogIn.vue';
import SignUp from '../views/SignUp.vue';
import ListBids from '../views/dashboard/ListBids.vue';
import CreateBid from '../views/dashboard/AddBid.vue';
import EditBid from '../views/dashboard/EditBid.vue';
import BidView from '../views/dashboard/BidView.vue'

const routes = [{
        path: '/',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/log-in',
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/bids',
        name: 'Bids',
        component: ListBids,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/bids/create',
        name: 'CreateBid',
        component: CreateBid,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/bids/:id/edit',
        name: 'EditBid',
        component: EditBid,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/bids/:id',
        name: 'Bid',
        component: BidView,
        meta: {
            requireLogin: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next('/log-in')
    } else {
        next()
    }
})

export default router;