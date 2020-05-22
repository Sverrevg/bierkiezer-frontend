import Login from "../../src/components/user/Login";
import {mount} from "@vue/test-utils";

describe("Login.vue", () => {
    const wrapper = mount(Login);

    // Check if component exists.
    it('renders', () => {
        expect(wrapper.exists()).toBe(true);
    });
});
