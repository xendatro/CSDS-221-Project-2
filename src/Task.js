import React from 'react';
import ActionModal from './ActionModal';


function Task(props) {
    const [show, setShow] = React.useState(false);
    const [showUpdate, setShowUpdate] = React.useState(true);
    
    function del(e) {
      props.update(props.task, null);
    }

    function update(task) {
      props.update(props.task, task);
    }

    function checked(e) {
      setShowUpdate(!showUpdate);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <tr className="align-middle">
        <td>{props.task.title}</td>
        <td>{props.task.description}</td>
        <td>{props.task.deadline}</td>
        <td>{props.task.priority === 1 ? "Low" : props.task.priority === 2 ? "Medium" : "High"}</td>
        <td>
            <input type="checkbox" checked={props.task.isComplete} onClick={checked} />      
        </td>
        <td>
            {showUpdate && 
            <div>
               <button type="button" onClick={handleShow} className="btn btn-primary" ><span className="bi-pencil" aria-hidden="true"></span> Update</button> <br />
            </div>
            }
            <button type="button" onClick={del} className="btn btn-danger"><span className="bi-x-circle" aria-hidden="true"></span> Delete</button>
        </td>  
        <ActionModal show={show} title={props.task.title} description={props.task.description} deadline={props.task.deadline} priority={props.task.priority} mode="Edit" update={update} handleClose={handleClose} />
      </tr>
    )
}

export default Task;