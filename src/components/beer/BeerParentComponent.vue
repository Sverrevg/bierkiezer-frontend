<template>
    <div class="bg">
        <div class="custom-bg min-vh-100 text-center">
            <div class="container bg-white p-0">
                <div aria-label="breadcrumb">
                    <ol class="breadcrumb border-square mb-0">
                        <li class="breadcrumb-item">
                            <router-link class="font-weight-light" to="/home" v-on:click="navigate()">Home</router-link>
                        </li>
                        <li class="breadcrumb-item active font-weight-light">
                            Bieren
                        </li>
                    </ol>
                </div>
                <div class="container">
                    <ion-searchbar mode="ios" slot="end" placeholder="Zoeken"/>
                </div>

                <div
                        v-for="beer in beers"
                        :key="beer.id">
                    <router-link class="no-decoration text-black"
                                 v-bind:to="'/bieren/details/' + beer.id"
                                 v-on:click="navigate()">
                        <beer-small v-bind="beer"/>
                    </router-link>
                </div>
            </div>
            <observer v-on:intersect="loadMore()"/>
        </div>
    </div>
</template>

<script>
    import BeerSmall from "@/components/beer/BeerSmall";
    import Observer from "../shared/Observer";
    import BeerRepository from "@/service/repositories/BeerRepository";

    export default {
        name: "parent-component",
        components: {
            BeerSmall,
            Observer
        },
        data() {
            return {
                beers: [],
                offset: 0,
                limit: 10
            }
        },
        created() {
            this.loadMore();
        },
        methods: {
            loadMore() {
                BeerRepository.getAll(this.offset, this.limit).then(response => {
                    this.beers = this.beers.concat(response.data);
                    this.offset += this.limit;
                });
            }
        }
    }
</script>

<style scoped>
    .bg {
        background-color: #2c3e50;
    }

    .custom-bg {
        -webkit-background-size: contain;
        -moz-background-size: contain;
        -o-background-size: contain;
        background-size: contain;
        background: url(../../assets/images/bg-home-blur.jpg) no-repeat fixed top;
    }
</style>
