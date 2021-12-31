module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraResources: ['src/database.txt']
      }
    }
  }
}
