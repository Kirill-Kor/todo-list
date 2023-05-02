import { useCallback, useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import TaskPopup from '../TaskPopup/TaskPopup';
import './Main.css';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const [tasks, setTasks] = useState([]);
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [changedTask, setChangedTask] = useState([]);
    const [subs, setSubs] = useState([]);

    function openPopup() {
        setPopupIsOpen(true);
    }

    function closePopup() {
        setPopupIsOpen(false);
        setChangedTask([]);
    }

    useEffect(() => {
        if (props.isLogged) {
            fetchAllData();

        }
    }, [props.isLogged])

    function fetchAllData() {
        Promise.all([api.getTasks(), api.getAllUsers()])
            .then(([tasks, users]) => {
                users = users.filter((user) => user.lead_id === currentUser[0].id);

                const subsIds = users.map((sub) => sub.id)
                console.log(subsIds);

                tasks = tasks.filter((task, index) => subsIds.includes(task.responsible) || task.responsible === currentUser[0].id)

                setSubs(users);
                setTasks(tasks);

            });
    }

    function onSubmitPopup(task, isChanged, taskId) {
        if (isChanged) {

            api.updateTask(task, taskId)
                .then((result) => {
                    fetchAllData();
                    closePopup();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            api.createTask(task)
                .then((result) => {
                    fetchAllData();
                    closePopup();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function handleTaskClick(taskId) {
        api.getTaskById(taskId)
            .then((task) => {
                setChangedTask(task);
                setPopupIsOpen(true);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='main'>
            <Header isLogged={props.isLogged} onLogout={props.onLogout} />
            {props.isLogged &&
                <>
                    <TaskList tasks={tasks} openPopup={openPopup} onClick={handleTaskClick} subs={subs}/>
                    {popupIsOpen &&
                        <TaskPopup
                            onSubmit={onSubmitPopup}
                            closePopup={closePopup}
                            currentTask={changedTask[0]}
                            subs={subs}
                        />}
                </>
            }
        </div>
    )
}