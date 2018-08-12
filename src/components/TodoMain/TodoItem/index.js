import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'
import './index.scss'

class TodoItem extends Component {
    static propTypes = {
        updataTodoChecked: PropTypes.func.isRequired,
        todo: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired
    }
    handleChange = () => {
        const {updataTodoChecked, todo} = this.props
        todo.isDone = !todo.isDone
        updataTodoChecked()
    }
    handleEnter = () => {
        this.refs.li.style.background = '#aaa'
        this.refs.del.style.display = 'block'
    }
    handleLeave = () => {
        this.refs.li.style.background = 'none'
        this.refs.del.style.display = 'none'
    }
    deleteTodo = () => {
        const {todo, index} = this.props
        if(window.confirm(`确定删除${todo.title}吗`)) {
            // 发布消息(删除todo)
            PubSub.publish('delete', index)
        }
    }

    render() {
        let {isDone, title} = this.props.todo
        return (
            <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} ref="li">
                <label>
                    <input type="checkbox" checked={isDone} onChange={this.handleChange}/>
                    <span>{title}</span>
                </label>
                <button className="btn btn-danger" style={{display: 'none'}} ref="del" onClick={this.deleteTodo}>删除</button>
            </li>
        )
    }
}

export default TodoItem
