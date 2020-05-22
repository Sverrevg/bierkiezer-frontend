<template>
    <div class="custom-bg min-vh-100 text-center">
        <div class="container p-0">
            <img class="bg-image" src="../../assets/images/bg-crop.jpg"/>
            <div class="bg-white p-3 text-left">
                <div class="d-inline-flex pb-3">
                    <div class="col flex-image-width align-self-center p-0">
                        <img class="profile-pic border-thick rounded-circle border-warning"
                             src="../../assets/images/bg2-crop.jpg"/>
                    </div>
                    <div class="col align-self-center px-3">
                        <h1 class="text-large fancy-text m-0 py-2">{{ name }}</h1>
                        <p class="text-medium">69 bieren</p>
                    </div>
                </div>
                <hr class="bg-light-grey"/>
            </div>
            <div class="p-3 pb-5 bg-white text-left">
                <h1 class="text-medium">User's Lijst</h1>
                <br/>
                <ul class="list-group">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Morbi leo risus</li>
                    <li class="list-group-item">Porta ac consectetur ac</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Account",
        data() {
            return {
                bgImage: null,
                profileImage: null,
                name: null
            }
        },
        async beforeMount() {
            this.name = this.$store.getters.username;
        }
    }
</script>

<style scoped>

</style>
