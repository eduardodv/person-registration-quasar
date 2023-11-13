import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import IndexPage from 'src/pages/IndexPage.vue';

installQuasarPlugin();

describe('Header Component', () => {
  it('render', () => {
    const wrapper = mount(IndexPage);
    expect(wrapper.find('.q-page').exists()).toBeTruthy()
  });

  it('render table', () => {
    const wrapper = mount(IndexPage);
    expect(wrapper.find('.q-table').exists()).toBeTruthy()
    expect(wrapper.find('h1.text-h5').text()).toEqual('Cadastro de Pessoas')
  });
});
