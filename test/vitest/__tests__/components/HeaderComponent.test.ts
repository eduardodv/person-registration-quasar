import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeaderComponent from 'src/components/HeaderComponent.vue';

installQuasarPlugin();

describe('Header Component', () => {
  it('render', () => {
    const wrapper = mount(HeaderComponent);
    expect(wrapper.find('.q-header').exists()).toBeTruthy()
  });

  it('render title', () => {
    const wrapper = mount(HeaderComponent);
    expect(wrapper.find('.q-toolbar__title').text()).toEqual('Cadastro')
  });
});
