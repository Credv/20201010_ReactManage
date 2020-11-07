const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //针对antd实现按需打包 根据import来打包（使用babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //这里style值为true表示引入less 如果为‘css’表示css 自动打包相关样式
    }),
    //使用less-loader对源码中的less的变量进行重新指定
    //主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#008080' //定制主题
        }
    })
);