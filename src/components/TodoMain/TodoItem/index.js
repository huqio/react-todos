import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.css'

class TodoItem extends Component {
    static propTypes = {
        updataTodoChecked: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
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
        const {index, deleteTodo} = this.props
        deleteTodo(index)
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