import Task from './Task';

function Tasks(props) {
    function update(oldTask, newTask) {
        const taskInTasks = props.tasks.filter(task => task.key === oldTask.key)[0];
        if (newTask === null) {
            const newTasks = props.tasks.filter(task => task !== taskInTasks);
            props.update(newTasks, true);
        } else {
            const newTasks = props.tasks.map(task => {
                if (task.key === oldTask.key) {
                    return newTask;
                }
                return task;
            });
            props.update(newTasks, false);
        }
    }
    const tasksJSX = props.tasks.map((task) => 
        <Task key={task.key} task={task} update={update} />
    );
    return (
        <tbody>
            {tasksJSX}
        </tbody>
    );
}

export default Tasks;
