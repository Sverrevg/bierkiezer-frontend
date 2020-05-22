// RepositoryFactory.js

import BeersRepository from "@/service/repositories/BeerRepository";
import LoginRepository from "@/service/repositories/LoginRepository";
import RegisterRepository from "@/service/repositories/RegisterRepository";
import UserBeerRepository from "../repositories/UserBeerRepository";

const repositories = {
    beers: BeersRepository,
    login: LoginRepository,
    register: RegisterRepository,
    userBeer: UserBeerRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
