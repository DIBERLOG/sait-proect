<script>
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'

export default {
    components: {
        AppSidebar,
        RouterView
    }
}
</script>

<template>
    <div class="app">
        <div class="container py-3">
            <div class="row">
                <div class="col-3">
                    <app-sidebar></app-sidebar>
                </div>
                <div class="col-9">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body {
    background-color: #EDEEF0;
}
</style>
