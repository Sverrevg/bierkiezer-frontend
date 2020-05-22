<template>
    <header>
        <menu-left/>
        <ion-menu-controller/>
        <ion-header>
            <ion-toolbar color="warning">
                <ion-buttons start>
                    <ion-button @click="openStart">
                        <ion-icon name="menu"/>
                    </ion-button>
                </ion-buttons>
                <div slot="end">
                    <ion-title>
                        <router-link class="fancy-text no-decoration text-white text-medium" to="/home" v-on:click="navigate()">
                            {{ title }}
                        </router-link>
                    </ion-title>
                </div>
            </ion-toolbar>
        </ion-header>
    </header>
</template>

<script>
    import MenuLeft from "../menus/MenuLeft";

    export default {
        name: "Header",
        components:{
            'menu-left': MenuLeft
        },
        data() {
            return {
                title: 'De Bierkiezer'
            }
        },
        methods: {
            openStart() {
                document.querySelector('ion-menu-controller').open('start');
            }
        }
    }
</script>

<style scoped>

</style>
