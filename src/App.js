import ActionModal from './ActionModal';
import Tasks from './Tasks';
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const success = (message) => toast.success(message, {theme: "colored"});

  function update(newTasks, deleted) {
    setTasks(newTasks);
    if (deleted) {
      success("Deleted task!");
    } else {
      success("Updated task!");
    }
    
  }

  function uniqueTitle(title) {
    return tasks.filter(t => t.title === title)[0] === undefined;
  }

  function addTask(task) {
    let newTasks = [...tasks];
    newTasks[newTasks.length] = task;
    setTasks(newTasks);
    success("Added task!");
  }
  return (
    <div className="container">
      <ActionModal show={show} handleClose={handleClose} handleShow={handleShow} add={addTask} mode="Add" uniqueTitle={uniqueTitle} />
      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={true} />
      <div className="card">
        <div className="card-header text-white bg-primary">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
              </div>
              <div className="col-md-8 text-center">
               <h4 className="card-text"><span className="bi-justify" aria-hidden="true"></span> FRAMEWORKS</h4>
              </div>  
              <div className="col-md-2 text-end">
                <button type="button" onClick={handleShow} className="btn btn-info text-white"><span className="bi-plus-circle" aria-hidden="true"></span> ADD</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Priority</th>
              <th scope="col">Is Complete</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <Tasks tasks={tasks} update={update} />
        </table>
        </div>
      </div>
    </div>
  );
}

export default App;
