import { shallowMount } from '@vue/test-utils';
import Meetup from '@/views/Meetup';

describe('Meetup.vue', () => {
  it('should render meetings', async () => {
    const expected = 4;
    const wrapper = shallowMount(Meetup);

    const activities = wrapper.findAll('ul > li').length;
    expect(activities).toBe(expected);
  });
});

it('triggers add meeting method on click', async () => {
  const Method = jest.spyOn(Meetup.methods, 'rsvpActivity');
  const wrapper = shallowMount(Meetup);
  await wrapper.find('button').trigger('click');
  expect(Method).toBeCalled();
});

it('should show an activity in activities', () => {
  const wrapper = shallowMount(Meetup, {
    data() {
      return {
        rsvpedActivities: [
          {
            date: "November 28, 2021",
            title: "Thankgiving",
            review: "",
            location: "Violgatan"
          },
        ],
      };
    },
  });
  const getRsvpedActivities = wrapper.findAll('#activity-test').length;
  expect(getRsvpedActivities).toBe(1);
});

it('clicks button to add review', async () => {
  const newMethod = jest.spyOn(Meetup.methods, 'addReview');
  const wrapper = shallowMount(Meetup);
  await wrapper.find('button').trigger('click');
  expect(newMethod);
});

it('should show meetups', () => {
  const spy = jest.spyOn(Meetup.methods, 'getActivities');
  shallowMount(Meetup);
  expect(spy).toBeCalled();
});
