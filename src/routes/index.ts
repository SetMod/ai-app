import Home from "@/views/Home.vue"
import LB2 from "@/views/LB2.vue"
import LB3 from "@/views/LB3.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/lb2',
        name: "LB2",
        component: LB2
    },
    {
        path: '/lb3',
        name: "LB3",
        component: LB3
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router