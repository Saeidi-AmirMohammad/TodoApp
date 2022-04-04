import { useState } from "react"
import EditToDo from "./EditToDo";

function Todo(props) {
    const [edit, setEdit] = useState(false);

    let editHandler = text => {
        props.edit(props.item.key , text);
        setEdit(false);
    }
    return (
        <>

            {
                edit === false ?
                    <div className="col-6 mb-2">
                        <div className="d-flex justify-content-between align-items-center border rounded p-3">
                            <div>
                                {props.item.text}
                            </div>
                            <div>
                                <button type="button" className={`btn ${props.item.done ? "btn-warning" : "btn-success"} btn-sm`} onClick={() => props.done(props.item.key)}>{props.item.done ? "undone" : "done"}</button>
                                <button type="button" className="btn btn-info btn-sm ms-1" onClick={() => setEdit(true)}>edit</button>
                                <button type="button" className="btn btn-danger btn-sm ms-1" onClick={() => props.delete(props.item.key)}>delete</button>
                            </div>
                        </div>
                    </div>
                    :
                    <EditToDo text={props.item.text} edit={editHandler}/>
            }

        </>
    )
}

export default Todo