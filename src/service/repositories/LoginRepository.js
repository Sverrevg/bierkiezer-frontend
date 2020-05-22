import Repository from "@/service/Repository";

const resource = "/users/login";
export default {
    login(username, password){
        return Repository.post(`${resource}`, username, password)
    },
};
