<template>
    <div class="custom-bg text-center min-vh-100 mb-negative">
        <div class="container p-0 bg-white">
            <div aria-label="breadcrumb">
                <ol class="breadcrumb border-square mb-0">
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/home" v-on:click="navigate()">Home</router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link class="font-weight-light" to="/bieren" v-on:click="navigate()">Bieren</router-link>
                    </li>
                    <li class="breadcrumb-item active font-weight-light" aria-current="page">{{beer.name}}</li>
                </ol>
            </div>
            <div class="container px-0 p-3 py-5">
                <beer v-bind="beer"/>
            </div>
            <div class="bg-secondary angle-cut-top p-5 text-white">

            </div>
        </div>
    </div>
</template>

<script>
    import BeerRepository from "../../service/repositories/BeerRepository";
    import Beer from "./Beer";

    export default {
        name: "BeerDetails",
        components: {
            Beer
        },
        data() {
            return {
                id: this.$route.params.id,
                beer: {
                    type: Object
                }
            }
        },
        async beforeMount() {
            const response = await BeerRepository.getById(this.id);
            this.beer = response.data;
        }
    }
</script>

<style scoped>

</style>
