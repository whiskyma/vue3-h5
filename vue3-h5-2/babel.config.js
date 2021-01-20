module.exports = {
    presets: ["@vue/app"],
    plugins:[
        [
          "component",
          { //这里不需要数组再包着，官方实例有数组包着
            "libraryName": "mint-ui",
            "style": true
          }
        ]
    ]
}
