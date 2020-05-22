<template>
    <div id="app">
        <Header/>
        <ion-content class="min-vh-100" id="content">
            <router-view/>
            <div class="height-rem">
                <Footer/>
            </div>
        </ion-content>
    </div>
</template>


<script>
    import Header from "./components/shared/Header";
    import Footer from "./components/shared/Footer";

    export default {
        name: 'App',
        components: {
            Header,
            Footer
        }
    }
</script>

<style>
    @import "./css/main.css";

    body {
        position: relative;
        margin: 0;
        padding-bottom: 6rem;
        min-height: 100%;
        font-family: "Helvetica Neue", Arial, sans-serif;
    }

    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background: white;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>
