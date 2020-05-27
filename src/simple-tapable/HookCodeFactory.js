class HookCodeFactory {
  constructor() {

  }

  setup(instance, options) {
    instance._x = options.taps.map(t => t.fn);
  }

  create()
}