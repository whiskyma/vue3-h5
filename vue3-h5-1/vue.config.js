const path = require('path')
const resolve = dir =>{
    return path.join(__dirname, dir)
}
function getDay() {
    const myDate = new Date();
    return 'h5' + myDate.getFullYear() +
        bu0(myDate.getMonth() + 1) +
        bu0(myDate.getDate()) +
        bu0(myDate.getHours()) +
        bu0(myDate.getMinutes());
}
function bu0(t) {
    return t<10?'0'+t:t
}
const distTime = getDay();

// br压缩比gzip压缩效果好些
//brotli-webpack-plugin----br压缩插件
const BrotliPlugin = require('brotli-webpack-plugin');
const productionGzipExtensions = ['js', 'css' , 'png', 'jpeg']

const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
    //打本地包
	publicPath: process.env.NODE_ENV === "production" ? "./" : "/", 
    //打线上包
	// publicPath: process.env.NODE_ENV === "production" ? `https://images2355.com/m/${distTime}/` : "/", 
	outputDir: `dist/${ distTime }`,
	assetsDir: "static",
	filenameHashing: false,
	lintOnSave: false,
	productionSourceMap: false,
    // css相关配置
    css: {
        loaderOptions: {
            stylus: {
                import: '~@/assets/styl/color.styl' //公共样式变量引入路径
            }
        }
    },
    // 别名快捷设置
    chainWebpack: config => {
        config.resolve.alias
            .set('@com', resolve('src/components/common')) //公共部分组件引入路径
            .set('@styl', resolve('src/assets/styl')) //公共样式引入路径
            .set('@img', resolve('src/assets/img')) //公共图片引入路径
            .set('@js', resolve('src/utils')) //公共js引入路径
            .set('@pon', resolve('src/components')) //公共组件引入路径
        // 转换base64(为了打包之后css不过大,故不转换base64,limit==1)
        config.module
            .rule('images')
                .use('url-loader')
                    .loader('url-loader')
                    .tap(options => Object.assign(options, { limit: 1 }))
    },
    configureWebpack: config => {
        if (isProduction) {
            // br压缩
            config.plugins.push(new BrotliPlugin({
                    asset: '[path].br[query]',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            )

            // 去掉console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            // 配置分离第三方库
            config.optimization = {
                splitChunks: {
                    chunks: 'all',
                    minSize: 1, // 模块的最小体积
                    minChunks: 1, // 模块的最小被引用次数
                    maxAsyncRequests: 20, // 按需加载的最大并行请求数
                    maxInitialRequests: 20, // 一个入口最大并行请求数
                    cacheGroups: { //缓存组
                        vue: {
                            name: 'v-vue',
                            test: /[\\/]node_modules[\\/]vue[\\/]/,
                            priority: 20
                        },
                        vuex: {
                            name: 'v-vuex',
                            test: /[\\/]node_modules[\\/]vuex[\\/]/,
                            priority: 19
                        },
                        axios: {
                            name: 'v-axios',
                            test: /[\\/]node_modules[\\/]axios[\\/]/,
                            priority: 18
                        },
                        'vue-router': {
                            name: 'v-router',
                            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                            priority: 17
                        },
                        'mint-ui': {
                            name: 'v-mint',
                            test: /[\\/]node_modules[\\/]mint-ui[\\/]/,
                            priority: 16
                        },
                        // 'crypto-js': {
                        //     name: 'h5-crypto',
                        //     test: /[\\/]node_modules[\\/]crypto-js[\\/]/,
                        //     priority: 15
                        // },
                        // 'fingerprintjs2': {
                        //     name: 'h5-fingerprintjs2',
                        //     test: /[\\/]node_modules[\\/]fingerprintjs2[\\/]/,
                        //     priority: 14
                        // },
                        'js-md5': {
                            name: 'v-md5',
                            test: /[\\/]node_modules[\\/]js-md5[\\/]/,
                            priority: 13
                        },
                        utilCommon: {
                            name: "v-common",
                            test: /[\\/]src[\\/]utils[\\/]/,
                            minSize: 0, //将引用模块分离成新代码文件的最小体积
                            minChunks: 1, //表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                            priority: 12
                        },
                        'vendors': {
                            name: 'v-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 1
                        }
                    }
                }
            }
        };
    },
    devServer: {
        host: "localhost",
        host: "192.168.50.119",
        port: 2222,
        https: false,
        open: true
    }
};
