import { createRouter, createWebHistory } from "vue-router";
import SignIn from '@/views/auth/SignIn';
import SignUp from '@/views/auth/SignUp';

const routes = [{
        path: "/",
        name: "SignIn",
        component: SignIn,
        meta: {
            title: "Login | SignIn",
        },
    },
    {
        path: "/auth/signup",
        name: "SignUp",
        component: SignUp,
        meta: {
            title: "SignUp | Register",
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;