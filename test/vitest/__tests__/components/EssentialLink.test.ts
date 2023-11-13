import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import EssentialLink from 'src/components/EssentialLink.vue';

installQuasarPlugin();

describe('EssentialLink Component', () => {
  it('render', () => {
    const wrapper = mount(EssentialLink);
    expect(wrapper.find('.q-item').exists()).toBeTruthy()
  });

  it('should mount component with title', () => {
    const wrapper = mount(EssentialLink, {
      props: {
        title: 'Pedidos',
        icon: 'grading',
        link: '/pedidos'
      },
    });

    expect(wrapper.find('.q-item__label').text()).toEqual('Pedidos')
  });

  it('should mount component with icon', () => {
    const wrapper = mount(EssentialLink, {
      props: {
        title: 'Pedidos',
        icon: 'grading',
        link: '/pedidos'
      },
    });

    expect(wrapper.find('.q-icon').text()).toEqual('grading')
  });
});
