const path = require('path')
const HtmlPlugin = require("html-webpack-plugin")
const { resolve } = require('path')
const htmlPlugin = new HtmlPlugin({
    template:"./src/index.html",
    filename:"/index.html"
})
module.exports ={
    mode:'development',
    entry:path.join(__dirname,'./src/index.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'build.js'
    },
    plugins:[htmlPlugin],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.jpg|png|bmp|gif$/,use:'url-loader'}
        ]
    },

    devServer:{
        // 开发服务器只在内存中打包，不会生成本地文件
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:3000
    }
}