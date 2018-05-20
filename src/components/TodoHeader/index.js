import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.scss'

class TodeHeader extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            const title = e.target.value.trim()
            if (!title) return
            const todo = {
                title,
                isDone: false
            }
            this.props.addTodo(todo)
            e.target.value = ''
        }
    }

    render() {
        return (
            <div className="todo-header">
                <input type="text" placeholder="请输入你的任务名称，按回车键确认" onKeyUp={this.handleKeyUp}/>
            </div>
        )
    }
}

export default TodeHeader