<template>
    <div class="bg-dark-image min-vh-100 text-center mb-negative">
        <div class="container py-5 responsive-width">
            <h1 class="text-white fancy-text">
                Inloggen
            </h1>
            <error-text hidden
                        id="error-text"
                        :text="text"/>
            <div class="p-4">
                <ion-item>
                    <ion-input inputmode="text" maxlength="32" ref="username" type="text" placeholder="Gebruikersnaam"/>
                </ion-item>
                <br/>
                <ion-item>
                    <ion-input inputmode="text" maxlength="32" ref="password" type="password" placeholder="Wachtwoord"/>
                </ion-item>
            </div>
            <ion-button class="font-weight-light" color="warning" v-on:click="login">Inloggen</ion-button>
        </div>
    </div>
</template>

<script>
    import {RepositoryFactory} from "@/service/factory/RepositoryFactory";
    import ErrorText from "../error/ErrorText";

    const LoginRepository = RepositoryFactory.get('login');

    export default {
        name: "Login",
        components: {
            ErrorText
        },
        data() {
            return {
                text: null
            }
        },
        props: {
            timeout: {type: Number, default: 1000},
        },
        methods: {
            async login() {
                // Save username and pw to variables
                const username = this.$refs.username.value;
                const password = this.$refs.password.value;

                if (username !== "" && password !== "") {
                    return this.$ionic.loadingController
                        .create({
                            message: 'Inloggen...',
                            duration: this.timeout,
                        })
                        .then(loading => {
                            loading.present();

                            // Create JSON object
                            let loginRequest = {
                                username: username,
                                password: password
                            };

                            LoginRepository.login(loginRequest).then((response) => {
                                let authRequest = {
                                    username: response.data.username,
                                    token: response.data.token,
                                    refresh_token: response.data.refresh_token
                                };
                                this.$store.dispatch("login", authRequest).then(() => {
                                    this.$router.push("/home");
                                    loading.dismiss();
                                });
                            });

                        });
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

    ion-grid {
        height: 100%;
        justify-content: center;
    }

    .flex-col {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
