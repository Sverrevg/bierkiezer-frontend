import Repository from "@/service/Repository";

const resource = "/users/sign-up";
export default {
    register(email, username, password){
        return Repository.post(`${resource}`, email, username, password)
    }
};