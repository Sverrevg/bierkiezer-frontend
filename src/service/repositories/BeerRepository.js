import Repository from "@/service/Repository";

const resource = "/beers";

export default {
    getAll(offset, limit) {
        return Repository.get(`${resource}/all?offset=${offset}&limit=${limit}`);
    },

    getById(id) {
        return Repository.get(`${resource}/${id}`);
    },

    getRandom() {
        return Repository.get(`${resource}/random`);
    },

    getAdvice(season, mood) {
        return Repository.get(`${resource}/advice`, season, mood);
    }
};
