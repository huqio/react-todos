## 配置sass预编译器环境
[参考链接](https://www.cnblogs.com/yangrenmu/p/7118398.html)
  - `npm install sass-loader node-sass --save-dev`
  - `npm run eject`
  - 修改`webpack.config.dev.js` 和 `webpack.config.prod.js`
    ```
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.scss$/,
        /\.json$/,
        /\.svg$/
      ],
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.scss$/,
      include: paths.appSrc,
      loaders: ["style", "css", "sass"]
    },
    ```
    
    
## 编写静态页面
  - HTML
  - CSS
    
## 拆分组件
  ```
  App-------------应用组件
    TodoHeader---------------头部组件
    TodoMain-----------------主体组件
      TodoItem---------------------todo项组件
    TodoFooter---------------尾部组件
  ```
## 实现静态组件
  - 拆分页面
  - 拆分样式(就近原则)

## 分析确定组件的state和props
  - App:
    - state: 
      - todos: `[{isDone: false, title: '吃饭'}, {isDone: false, title: '睡觉'}]`
      - isAllChecked: boolean
  - TodoHeader
    - props: addTodo/func
  - todoMain
    - props: 
      - todos/array   
      - deleteTodo/func
      - changeTodoState/func
  - todoItem
    - props: 
      - todo/object  
      - deleteTodo/func 
      - index/number
      - changeTodoState/func
  - TodoFooter
    - props: 
      - isAllChecked/boolean 
      - doneCount/number 
      - totalCount/number
      - deleteDone/func
      - changeAllState/func
      
## 实现动态组件
  - 动态显示初始化todos列表数据
    - App  state--> todos
    - 初始化todos: constructor()
    - todos的结构: `[{title:'xx', isDone:false}, {}]`
    - 通过标签属性向-->TodoMain-->TodoItem传递todos
  - 添加新的todo, 显示在列表首位
  - 勾选指定todo
  - 删除指定todo
  - 显示完成的/所有的todo的数量
  - 全选/全不选
  - 删除所有选中的


- 父组件向子组件传递数据
  - 数据(包含对数据操作的函数)都在父组件里
  - 数据只能是当前组件和子组件使用, 不能给兄弟组件使用
  - 共同的数据放在父组件上, 特有的数据放在自己组件内部
  - 一般数据---> 用于组件页面显示
  - 函数数据--->调用执行
  - 父子组件的通信

## 项目打包运行
- 项目编译打包并运行
  - `npm build`
  - `npm install -g serve`
  - `serve -s build`
  - 访问地址:`localhost:5000`