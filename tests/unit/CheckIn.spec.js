import CheckIn from "@/components/shared/CheckIn";
import {shallowMount} from '@vue/test-utils'

describe('CheckIn.vue', () => {
    it('checks in', async () => {
        const wrapper = shallowMount(CheckIn);

        wrapper.setData({rating: 7});
        wrapper.setData({review: 'Test Checkin'});
        wrapper.find('[jest="submit"]').trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.rating).toBe(7);
        expect(wrapper.vm.review).toBe('Test Checkin');
    })
});
