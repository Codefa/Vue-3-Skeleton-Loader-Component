import { getCurrentInstance as _getCurrentInstance } from 'vue';

export default function useRender(render) {
  const getCurrentInstance = (name, message) => {
    const vm = _getCurrentInstance();

    if (!vm) {
      throw new Error(
        `[touchcast] ${name} ${
          message || 'must be called from inside a setup function'
        }`
      );
    }

    return vm;
  };

  const vm = getCurrentInstance('useRender');
  vm.render = render;
}
