import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.delete_todo_list = this.delete_todo_list.bind(this)
        this.append_todo_list = this.append_todo_list.bind(this)
        this.state = {
            todo_lists: [],
            newValue: ''
        }
    }
    append_todo_list() {
        var input_value = document.getElementById('new_list_text').value
        if (input_value !== '') {
            var new_state = this.state.todo_lists.slice()
            new_state.push(input_value)
            this.setState( {
                todo_lists: new_state

            })
        }
    }
    delete_todo_list(index) {
        this.state.todo_lists.splice(index,1)
        this.setState({todo_lists : this.state.todo_lists})
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Todo List
                </header>
                <div id='Input_new_list'>
                    <input type='text' className='input_text' id='new_list_text' name='new_list' placeholder='New list' value={this.state.newValue} onChange={event => {this.setState({newValue: event.target.value})}}/>
                    <span id='add_icon' className="material-icons" onClick={this.append_todo_list}>add</span>
                </div>
                <div id='Lists'>
                    {this.state.todo_lists.map((element,index) => (
                        <Todo_list name={element} index={index} delete ={this.delete_todo_list} />
                    ))}
                </div>

            </div>
        )
    }

}
class Todo_list extends React.Component {
    constructor(props) {
        super(props);
        this.delete_element = this.delete_element.bind(this)
        this.append_element = this.append_element.bind(this)
        this.state = {
            elements: [],
            newValue: ''
        }
    }
    append_element() {
        if (this.state.newValue !== '') {
            var new_state = this.state.elements.slice()
            new_state.push(this.state.newValue)
            this.setState( {
                elements: new_state

            })

        }
    }
    delete_element(index) {
        this.state.elements.splice(index,1)
        this.setState({elements : this.state.elements})
    }
    render() {
        return <div id='main_list_div'>
            <div className='header_todo_list'>
                <h2>{this.props.name}</h2>
                <span id='delete_icon' className="material-icons" onClick={()=>this.props.delete(this.props.index)}>delete</span>
            </div>
            <div id='input_new_element'>
                <input type='text' className='input_text' id='new_element_text' name='new_element' placeholder='New element' value={this.state.newValue} onChange={event => {this.setState({newValue: event.target.value})}}/>
                <span id='add_icon' className="material-icons" onClick={this.append_element}>add</span>
            </div>
            <div className='elements'>
                {this.state.elements.map((element,index) => (
                    <Element name={element} index={index} delete={this.delete_element}/>
                ))}
            </div>

        </div>

    }
}
class Element extends React.Component {
    constructor(props) {
        super(props);
        this.checked = this.checked.bind(this)
        this.crossed= this.crossed.bind(this)
        this.state = {
            status : 'neutral'
        }
    }
    checked() {
        if (this.state.status !== 'checked') {
            this.setState({status : 'checked'})
        } else {
            this.setState({status : 'neutral'})
        }
    }
    crossed() {
        if (this.state.status !== 'crossed') {
            this.setState({status : 'crossed'})
        } else  {
            this.setState({status : 'neutral'})
        }
    }
    render() {
        const materials = "material-icons " + this.state.status
        const classname_text = 'element_text ' + this.state.status
        return <div className='element_div'>
            <div>
                <span id='check_icon' className={materials} onClick={this.checked}>check</span>
                <span id='clear_icon' className={materials} onClick={this.crossed}>clear</span>
            </div>
            <h3 className={classname_text} >{this.props.name}</h3>
            <span id='delete_icon' className="material-icons" onClick={()=>this.props.delete(this.props.index)}>delete</span>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)