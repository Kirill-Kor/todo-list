import './Task.css';

export default function Task({task, onClick}) {

    const cardTitleClassName = `tasks__title ${task.rest_time < 0 && 'tasks__title_red'} ${task.status === 'Выполнена' && 'tasks__title_completed'}`


    function handleClick(e) {
        onClick(task.id);
    }

    return (
        <li className='tasks__item' onClick={handleClick}>
            <p className={cardTitleClassName}>{task.title}</p>
            <p className='tasks__description'>{task.description}</p>
            <p className='tasks__status'>Статус: {task.status}</p>
            <p className='tasks__priority'>Приоритет: {task.priority}</p>
            <p className='tasks__responsible'>Ответственный: {`${task.responsible_name} ${task.responsible_lastname}`}</p>
            <p className='tasks__dateEnd'>Осталось дней: {task.rest_time}</p>

        </li>
    )
}