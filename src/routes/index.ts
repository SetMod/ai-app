import Home from "@/views/Home.vue"
import LB2 from "@/views/LB2.vue"
import LB3 from "@/views/LB3.vue"
import LB4 from "@/views/LB4.vue"
import LB5 from "@/views/LB5.vue"
import LB6_7 from "@/views/LB6-7.vue"
import LB8 from "@/views/LB8.vue"
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
    {
        path: '/lb4',
        name: "LB4",
        component: LB4
    },
    {
        path: '/lb5',
        name: "LB5",
        component: LB5
    },
    {
        path: '/lb6-7',
        name: "LB6-7",
        component: LB6_7
    },
    {
        path: '/lb8',
        name: "LB8",
        component: LB8
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router