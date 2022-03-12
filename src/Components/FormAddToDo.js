import {useState} from 'react';

function FormAddToDo(props){

    const [text , setText] = useState('');

    let formHandler = e => {
        e.preventDefault();
        props.add(text);
        setText('');

    }

   let inputHandler = e => setText( e.target.value )

    

    return(
        <form className="form-inline" >
        <div className="form-group d-flex">
            <input type="text" className="form-control mx-sm-3" placeholder="i want to do ..." onChange={inputHandler} value={text} />
            <button type="submit" onClick={formHandler} className="btn btn-primary">add</button>
        </div>
    </form>
    )
}

export default FormAddToDo;