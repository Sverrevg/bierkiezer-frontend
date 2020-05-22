<template>
    <div class="bg-dark-image min-vh-100 text-center mb-negative">
        <div class="container py-5 responsive-width">
            <h1 class="text-white fancy-text">
                Registreren
            </h1>
            <div class="p-4">
                <error-text hidden
                            id="error-text"
                            :text="text"/>
                <ion-item>
                    <ion-input inputmode="email" ref="email" type="text" placeholder="Email adres"/>
                </ion-item>
                <br/>
                <ion-item>
                    <ion-input inputmode="text" ref="username" type="text" placeholder="Gebruikersnaam"/>
                </ion-item>
                <br/>
                <ion-item>
                    <ion-input inputmode="text" ref="password" type="password" placeholder="Wachtwoord"/>
                </ion-item>
                <br/>
                <ion-item>
                    <ion-input inputmode="text" ref="passwordConf" type="password" placeholder="Wachtwoord herhalen"/>
                </ion-item>
            </div>

            <ion-button color="warning" @click="presentLoading" v-on:click="register">
                Registreren
            </ion-button>
        </div>
    </div>
</template>

<script>
    import {RepositoryFactory} from "@/service/factory/RepositoryFactory";
    import ErrorText from "../error/ErrorText";

    const RegisterRepository = RepositoryFactory.get('register');

    export default {
        name: "Register",
        components: {
            ErrorText
        },
        data() {
            return {
                authenticated: false,
                text: null
            }
        },
        methods: {
            register: async function () {
                // Save username and pw to variables
                const email = this.$refs.email.value;
                const username = this.$refs.username.value;
                const password = this.$refs.password.value;
                const passwordConf = this.$refs.passwordConf.value;

                if (email !== "" && username !== "" && password !== "" && passwordConf !== "") {
                    if (password === passwordConf) {
                        return this.$ionic.loadingController
                            .create({
                                message: 'Registreren...',
                                duration: this.timeout,
                            })
                            .then(loading => {
                                loading.present();

                                // Create JSON object
                                var registerRequest = {
                                    email: email,
                                    username: username,
                                    password: password
                                };

                                RegisterRepository.register(registerRequest).then((response) => {
                                    if (response.status === 200) {
                                        this.$store.dispatch("login", response.data.token, username).then(() => {
                                            loading.dismiss();
                                            this.$router.push("/home");
                                        });
                                    } else {
                                        loading.dismiss();
                                        document.getElementById("error-text").hidden = false;
                                        this.text = response.data.message;
                                    }
                                });

                            });
                    } else {
                        document.getElementById("error-text").hidden = false;
                        this.text = 'Wachtwoorden komen niet overeen.';
                    }
                } else {
                    document.getElementById("error-text").hidden = false;
                    this.text = 'Vul alle velden in.';
                }
            }
        }
    }
</script>

<style scoped>
    ion-input {
        --placeholder-color: white;
        --placeholder-opacity: 0.8;
        --ion-color-step-600: #684611;
    }

    ion-item {
        --background: transparent;
        --color: white;
        --border-color: white;
    }
</style>
