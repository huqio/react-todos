import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import './index.scss'

class TodoMain extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        updataTodoChecked: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    }

    render() {
        return (
            <ul className="todo-main">
                {
                    this.props.todos.map((todo, index) => {
                        return <TodoItem key={index} index={index} todo={todo} {...this.props}/>
                    })
                }
            </ul>
        )
    }
}

export default TodoMain