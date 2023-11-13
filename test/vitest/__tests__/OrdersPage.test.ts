import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import OrdersPage from 'src/pages/OrdersPage.vue';

installQuasarPlugin();

describe('Header Component', () => {
  it('render', () => {
    const wrapper = mount(OrdersPage);
    expect(wrapper.find('.q-page').exists()).toBeTruthy()
  });

  it('render table', () => {
    const wrapper = mount(OrdersPage);
    expect(wrapper.find('.q-table').exists()).toBeTruthy()
    expect(wrapper.find('h1.text-h5').text()).toEqual('Cadastro de Pedidos')
  });
});
