import { PureComponent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import Header from "./Header";
import FormAddToDo from "./FormAddToDo";
import Todo from "./Todo";
import TodosContext from "./Context/ToDos";

class App extends PureComponent {

    state = {
        todos: [],
        statusToDo: false
    }

    addToDo(text) {
        this.setState(prevState => {
            return {
                todos: [...prevState.todos,
                { key: Date.now(), done: false, text }
                ]

            }
        })
    }

    deleteToDo(key) {
        this.setState(prevState => {
            return {
                todos: prevState.todos.filter(item => item.key != key)
            }
        })
    }

    doneToDo(key) {

        let itemsDone = this.state.todos.find(item => item.key == key)
        itemsDone.done = !itemsDone.done;

        let newTodos = this.state.todos.filter(item => item.key != key)

        this.setState({
            todos: [...newTodos, itemsDone]
        })
    }

    editToDo(key, text) {
        let itemsDone = this.state.todos.find(item => item.key == key)
        itemsDone.text = text;

        let newTodos = this.state.todos.filter(item => item.key != key)

        this.setState({
            todos: [...newTodos, itemsDone]
        })
    }

    render() {

        let filterToDo = this.state.todos.filter(item => item.done == this.state.statusToDo)
        return (
            <TodosContext.Provider value={{
                add : this.addToDo.bind(this),
                delete : this.deleteToDo.bind(this),
                done : this.doneToDo.bind(this),
                edit : this.editToDo.bind(this)
            }}>

                <div className="App">
                    <Header />
                    <main>
                        <section className="jumbotron bg-light py-5">
                            <div className="container d-flex flex-column align-items-center">
                                <h1 className="jumbotron-heading">Welcome!</h1>
                                <p className="lead text-muted">To get started, add some items to your list:</p>
                                <FormAddToDo/>
                            </div>
                        </section>
                        <div className="todosList">
                            <div className="container">
                                <div className="d-flex flex-column align-items-center ">
                                    <nav className="col-6 mb-3">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className={`nav-item nav-link font-weight-bold ${!this.state.statusToDo ? 'active' : ''}`} id="nav-home-tab" onClick={() => this.setState({ statusToDo: false })}>undone <span className="badge bg-secondary">{this.state.todos.filter(item => item.done == false).length}</span></a>
                                            <a className={`nav-item nav-link font-weight-bold ${this.state.statusToDo ? 'active' : ''}`} id="nav-profile-tab" onClick={() => this.setState({ statusToDo: true })}>done <span className="badge bg-success">{this.state.todos.filter(item => item.done == true).length}</span></a>
                                        </div>
                                    </nav>
                                    {filterToDo.length == 0
                                        ? <p>this not exist Todo</p>
                                        : filterToDo.map(item => <Todo key={item.key} item={item} />)
                                    }

                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </TodosContext.Provider>
        )
    }
}

export default App;