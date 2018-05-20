import React, {Component} from 'react'
import TodoHeader from '../TodoHeader'
import TodoMain from '../TodoMain'
import TodoFooter from '../TodoFooter'
import './index.scss'


class App extends Component {
    constructor() {
        super()
        this.state = {
            todos: [{isDone: false, title: '吃饭'}, {isDone: false, title: '睡觉'}],
            isAllDone: false
        }
    }

    //添加todo
    addTodo = (todo) => {
        const todos = this.state.todos
        todos.unshift(todo)
        this.setState({
            todos,
            isAllDone: false
        })
    }
    //获取所有未完成的todos
    getUnDoneTodos = () => {
        return this.state.todos.filter(todo => !todo.isDone)
    }
    //更新指定todo的isDone
    updataTodoChecked = () => {
        const todos = this.state.todos
        const isAllDone = this.getUnDoneTodos().length === 0 && todos.length > 0
        this.setState({
            todos,
            isAllDone
        })
    }
    //删除
    deleteTodo = (index) => {
        const todos = this.state.todos
        todos.splice(index, 1)
        const isAllDone = this.getUnDoneTodos().length === 0 && todos.length > 0
        this.setState({
            todos,
            isAllDone
        })
    }
    //删除已完成
    deleteDoneTodos = () => {
        const todos = this.getUnDoneTodos()
        this.setState({
            todos,
            isAllDone: false
        })
    }
    //改变所有状态
    changeAllState = (isAllDone) => {
        let todos = this.state.todos
        todos.forEach(todo => todo.isDone = isAllDone)
        this.setState({
            todos,
            isAllDone
        })
    }

    render() {
        const mainProps = {
            todos: this.state.todos,
            updataTodoChecked: this.updataTodoChecked,
            deleteTodo: this.deleteTodo
        }
        const footerProps = {
            totalCount: this.state.todos.length,
            doneCount: this.state.todos.filter((todo) => todo.isDone).length,
            deleteDoneTodos: this.deleteDoneTodos,
            isAllDone: this.state.isAllDone,
            changeAllState: this.changeAllState
        }
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <TodoHeader addTodo={this.addTodo}/>
                    <TodoMain {...mainProps}/>
                    <TodoFooter {...footerProps}/>
                </div>
            </div>
        )
    }
}

export default App