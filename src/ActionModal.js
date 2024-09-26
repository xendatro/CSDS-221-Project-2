import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function ActionModal(props) {
    const [title, setTitle] = React.useState(props.title || "");
    const [description, setDescription] = React.useState(props.description || "");
    const [deadline, setDeadline] = React.useState(props.deadline || "");
    const [priority, setPriority] = React.useState(props.priority || 0);
    const [formErrors, setFormErrors] = useState({});

    function handleClose() {
        props.handleClose();
        if (props.mode === "Add") {
            setTitle("");
            setDescription("");
            setPriority(0);
            setDeadline("");
            setFormErrors({});
        }
    }

    function getErrors() {
        let errors = {}
        if (title === "") {
            errors.title = "Your task needs a title."
        } else if (props.mode === "Add" && !props.uniqueTitle(title)) {
            errors.title = "You already have a task with that title."
        }
        if (description === "") {
            errors.description = "Your task needs a description."
        }
        if (deadline === "") {
            errors.deadline = "Your task needs a deadline."
        }
        if (priority === 0) {
            errors.priority = "Please select a priority."
        }
        return errors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        let errors = getErrors();
        if (Object.keys(errors).length === 0) {
            const task = {
                title: title,
                description: description,
                deadline: deadline,
                priority: priority,
                key: props.key || title,
                isCompleted: false
            }
            props.mode === "Add" ? props.add(task) : props.update(task);
            props.handleClose();
            if (props.mode === "Add") {
                setTitle("");
                setDescription("");
                setPriority(0);
                setDeadline("");
                setFormErrors({});
            }
        } else {
            setFormErrors(errors); 
        }
    }
    return (    
          <Modal show={props.show} 
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
            <Modal.Header className="bg-primary">
                <div className="text-white">
                    {props.mode === "Add" 
                    ? <span className="bi-plus-circle" aria-hidden="true"></span> 
                    : <span className="bi-pencil" aria-hidden="true"></span> 
                    } {props.mode} Task
                </div>
            </Modal.Header>
            <Modal.Body>

                <Form noValidate onSubmit={handleSubmit}>
                    <div>
                        {props.mode === "Add" && <Form.Group>
                            <InputGroup>
                                <Form.Control style={formErrors.title && {borderColor: "red"}} type="text" className="form-control" placeholder="Title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </InputGroup>
                            {formErrors.title && <p style={{color: "red"}}> {formErrors.title}</p>}
                            {!formErrors.title && <br />}
                        </Form.Group>}
                        <Form.Group>
                            <InputGroup>
                                <Form.Control style={formErrors.description && {borderColor: "red"}} type="text" className="form-control" placeholder="Description" required value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </InputGroup>
                            {formErrors.description && <p style={{color: "red"}}>  {formErrors.description}</p>}
                            {!formErrors.description && <br />}
                        </Form.Group>
                        <Form.Group>
                            <InputGroup>
                                <Form.Control style={formErrors.deadline && {borderColor: "red"}} type="date" className="form-control" placeholder="Deadline" required value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                            </InputGroup>
                            {formErrors.deadline && <p style={{color: "red"}}>  {formErrors.deadline}</p>}
                            {!formErrors.deadline && <br />}
                        </Form.Group>
                        <Form.Label htmlFor="priority">Priority:</Form.Label>
                        <Form.Group id="priority">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={priority === 1} onChange={() => setPriority(1)} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Small</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked={priority === 2} onChange={() => setPriority(2)} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Medium</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" checked={priority === 3} onChange={() => setPriority(3)} />
                                <label className="form-check-label" htmlFor="inlineRadio3">High</label>
                            </div>
                            {formErrors.priority && <p style={{color: "red"}}>  {formErrors.priority}</p>}
                            {!formErrors.priority && <br />}
                        </Form.Group>
                        <br />
                        <div className="text-end">
                            <Button type="submit" variant="primary"> 
                            {props.mode === "Add" 
                            ? <span className="bi-plus-circle" aria-hidden="true"></span> 
                            : <span className="bi-pencil" aria-hidden="true"></span> 
                            } {props.mode}
                            </Button>
                            <span> </span>
                            <Button variant="danger" onClick={handleClose}>
                            <span className="bi-x-circle" aria-hidden="true"></span> Cancel
                            </Button>   
                        </div>
                    </div>
                </Form>
            </Modal.Body>
          </Modal>
      );
}

export default ActionModal;