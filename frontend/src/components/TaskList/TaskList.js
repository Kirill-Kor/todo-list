import { useEffect, useState } from 'react';
import './TaskList.css';
import api from '../../utils/Api';
import Task from '../Task/Task';

export default function TaskList(props) {

    const [isToday, setIsToday] = useState(false);
    const [isTomorrow, setIsTomorrow] = useState(false);
    const [isFuture, setIsFuture] = useState(false);
    const [currentTasks, setCurrentTasks] = useState([]);

    function todayFilter() {
        setIsToday(!isToday);
    }
    function tomorrowFilter() {
        setIsTomorrow(!isTomorrow);
    }
    function futureFilter() {
        setIsFuture(!isFuture);
    }
    
    useEffect(() => {
        
        if (isToday) {
            let filteredTasks = [...props.tasks];
            
            filteredTasks = filteredTasks.filter(task => task.rest_time <= 0);
            setCurrentTasks(filteredTasks);
        }
        else {
            setCurrentTasks(props.tasks);
        }
    }, [isToday])

    useEffect(() => {
        
        if (isTomorrow) {
            let filteredTasks = [...props.tasks];
            filteredTasks = filteredTasks.filter(task => task.rest_time === 1);
            setCurrentTasks(filteredTasks);
        }
        else {
            setCurrentTasks(props.tasks);
        }
    }, [isTomorrow])

    useEffect(() => {
        
        if (isFuture) {
            let filteredTasks = [...props.tasks];
            filteredTasks = filteredTasks.filter(task => task.rest_time > 1);
            setCurrentTasks(filteredTasks);
        }
        else {
            setCurrentTasks(props.tasks);
        }
    }, [isFuture])

    useEffect(() => {

        setCurrentTasks(props.tasks);
        
    },[props.tasks])

    return (
        <div className='tasks'>
            <h2 className='tasks-title'>Задания</h2>
            {props.subs.length !== 0 && <button type='button' className='tasks__add-button' onClick={props.openPopup}></button>}
            <div className='tasks__sorts'>
                <label>На сегодня</label>
                <input type='checkbox' onChange={todayFilter}></input>
                <label>На завтра</label>
                <input type='checkbox' onChange={tomorrowFilter}></input>
                <label>Будущие</label>
                <input type='checkbox' onChange={futureFilter}></input>
            </div>

            <ul className='tasks__list'>
                {currentTasks.map((task) =>
                    <Task key={task.id} task={task} onClick={props.onClick} />)}
            </ul>

        </div>
    )
}