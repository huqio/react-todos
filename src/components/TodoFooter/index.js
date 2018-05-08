import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './index.css'

class TodoFooter extends Component {
    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        doneCount: PropTypes.number.isRequired,
        isAllDone: PropTypes.bool.isRequired,
        deleteDoneTodos: PropTypes.func.isRequired,
        changeAllState: PropTypes.func.isRequired
    }
    deleteDoneTodos = () => {
        this.props.deleteDoneTodos()
    }
    handleAllChange = () => {
        const {changeAllState, isAllDone} = this.props
        changeAllState(!isAllDone)
    }

    render() {
        const {totalCount, doneCount, isAllDone} = this.props
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={isAllDone} onChange={this.handleAllChange}/>
                </label>
                <span><span>已完成{doneCount}</span> / 全部{totalCount}</span>
                <button className="btn btn-danger" onClick={this.deleteDoneTodos}>清除已完成任务</button>
            </div>
        )
    }
}

export default TodoFooter