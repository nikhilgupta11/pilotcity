import Navbar from '@/components/Navbar.vue';
import { Meta, Story } from '@/@types/storybook.d';

export default {
  component: Navbar,
  title: 'Navbar'
} as Meta;

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Navbar },
  template: '<Navbar :loading="loading" :user="user"></Navbar>'
});

export const asDefault: Story = Template.bind({});
asDefault.args = {
  loading: false,
  user: undefined
};

export const whileLoading: Story = Template.bind({});
whileLoading.args = {
  loading: true,
  user: undefined
};
const mockUser = {
  _accessToken: 'testToken',
  _id: 'secretId',
  _profile: {
    email: 'poopmonster@flex.com'
  }
};
export const loggedIn: Story = Template.bind({});
loggedIn.args = {
  loading: false,
  user: mockUser
};
