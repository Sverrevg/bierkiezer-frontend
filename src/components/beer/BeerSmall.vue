<template>
    <div class="card m-3">
        <div class="card-header w-100 d-flex p-0">
            <h4 class="text-left fancy-text py-2 pl-3">{{name}}</h4>
            <div v-if="checkedIn" class="bg-success ml-auto pl-5 clip">
                <ion-icon name="checkmark" size="large" class="text-white pr-1"/>
            </div>
        </div>
        <div class="row no-gutters p-2">
            <div class="col-auto">
                <img :src="picture" class="img-fluid profile-pic-small pr-3" alt="bier">
            </div>
            <div class="col pl-3">
                <div class="card-block text-left">
                    <h4 class="card-title">{{brewery}}</h4>
                    <p class="card-text">{{category}}</p>
                    <span class="badge badge-pill badge-warning text-white">{{alcohol}}% vol.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserBeerRepository from "../../service/repositories/UserBeerRepository";

    export default {
        name: "beer-small",
        props: {
            id: {
                type: Number
            },
            name: {
                type: String
            },
            brewery: {
                type: String
            },
            alcohol: {
                type: Number
            },
            beerStyle: {
                type: String
            },
            category: {
                type: String
            },
            city: {
                type: String
            },
            country: {
                type: String
            },
            picture: {
                default: "http://media.buzzle.com/media/images-en/photos/drinks/beer/900-21524271-tulip-glass.jpg",
                type: String
            }
        },
        data() {
            return {
                checkedIn: false
            }
        },
        created() {
            UserBeerRepository.isPresent(this.$store.getters.username, this.id, this.$store.getters.token).then((response) => {
                this.checkedIn = response.data.isPresent;
            });
        }
    }
</script>

<style scoped>
    .clip {
        clip-path: polygon(
                15% 0,
                100% 0,
                100% 100%
        );
    }
</style>
