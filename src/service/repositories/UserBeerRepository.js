import Repository from "@/service/Repository";

const resource = "/users/beers";

export default {
    getAll(username, token) {
        return Repository.get(`${resource}/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    isPresent(username, beerId, token) {
        return Repository.get(`${resource}/${username}/${beerId}/present`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    getByBeerId(username, beerId, token) {
        return Repository.get(`${resource}/${username}/${beerId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    post(userBeer, token) {
        return Repository.post(`${resource}/add`, userBeer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    delete(username, id, token) {
        return Repository.delete(`${resource}/${username}/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },

    update(username, id, userBeer, token) {
        return Repository.put(`${resource}/${username}/${id}/update`, userBeer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};
