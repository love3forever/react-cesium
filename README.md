# react-cesium
使用前端开发框架[react](https://reactjs.org/)+[material-ui](http://www.material-ui.com/#/)快速构建cesium应用。

## 项目结构说明
当前项目大致结构如下所示：
```
├── dist
├── node_modules
├── package.json
├── public
├── src
├── webpack.config.js
```
1. `node_modules`目录，用以放置此项目的所有依赖项。
2. `public`目录，用以存放react静态html模版文件。
3. `src`目录，所有编写的js代码都放在此目录中，目前此目录中的内容为：
    ```
    ├── actions
    ├── components
    ├── containers
    ├── index.js
    └── style
    ```
    其中`index.js`为项目入口文件，style存放相关css样式文件，containers和components用于存放抽象出来的组件，actions则存放和事件控制和交互api。
4. `package.json`包含项目所有依赖项，此文件不需要手动修改。
5. `webpack.config.js`为webpack配置文件，一般不需要修改此文件。
6. `dist`目录，用于放置经过[webpack](https://doc.webpack-china.org/)打包生成的静态文件，用以发布应用，主要内容如下所示：
    ```
    ├── Assets
    ├── Widgets
    ├── Workers
    ├── app.js
    └── index.html
    ```
## 项目环境配置
1. 安装`node`，可以在[此处](https://nodejs.org/en/)获得node并完成安装。所需node版本不小于6.x。
2. 安装`yarn`，进入项目目录之后，`npm install -g yarn`，从此使用yarn替代npm。
3. 安装项目依赖，完成yarn的安装之后，`yarn install`自动完成项目依赖项的安装。
4. 运行项目，完成项目依赖项安装之后，`yarn cstart`启动项目，默认[http://localhost:8080](http://localhost:8080)打开页面。
5. 项目发布，`yarn cbuild`，默认在`dist`目录中生成经过打包的文件，可以将此静态文件放置在例如nginx/tomcat等web服务器后提供访问。