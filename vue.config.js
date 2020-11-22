module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/scan'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
