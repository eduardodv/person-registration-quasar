import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SidebarMenu from 'src/components/SidebarMenu.vue';

installQuasarPlugin();

describe('SidebarMenu Component', () => {
  it('render', () => {
    const wrapper = mount(SidebarMenu);
    expect(wrapper.find('.q-drawer').exists()).toBeTruthy()
  });

  it('render title', () => {
    const wrapper = mount(SidebarMenu);
    expect(wrapper.find('.q-drawer .title-menu').text()).toEqual('MENU')
  });
});
