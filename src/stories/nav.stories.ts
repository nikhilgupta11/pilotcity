import VueCompositionAPI from '@vue/composition-api';
import { withKnobs, text } from '@storybook/addon-knobs';
import Vue from 'vue';
import Nav from '@/views/ManageProgram/components/Nav.vue';
import { Meta, Story } from '@/@types/storybook.d';

Vue.use(VueCompositionAPI);

export default {
  component: Nav,
  title: 'Manage Program Sidebar',
  decorators: [withKnobs]
} as Meta;

const Template = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Nav },
  template: '<Nav :startDate="startDate" :endDate="endDate"></Nav>'
});

export const asDefault: Story = Template.bind({});

asDefault.args = {
  startDate: text('startDate', 'DAY, MON 1'),
  endDate: text('startDate', 'DAY, MON 1'),
};
