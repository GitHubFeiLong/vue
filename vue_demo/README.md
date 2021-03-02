# vue_demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 额外信息
### 打包编译
1. 下载serve：npm i serve -g
2. 打包：npm run build (此时会生成dist目录)
3. 运行serve：serve dist
### eslint
在`npm run dev` 后，eslint会检查代码，根据控制台提示进行修复代码。
一些小问题，我们不认为是问题的代码格式，可以在`.eslintrc.js`中的`rules`中添加规则
开发时，在`.eslintignore` 忽略特定的文件，后面在统一修复