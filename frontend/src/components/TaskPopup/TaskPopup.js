import { useContext, useEffect, useState } from 'react';
import './TaskPopup.css';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function TaskPopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const isLead = props.subs.length !== 0;

    //Если попап был открыт для редактирования задачи, то берём данные этой задачи, иначе пустые поля
    const [title, setTitle] = useState(props.currentTask ? props.currentTask.title : '');
    const [description, setDescription] = useState(props.currentTask ? props.currentTask.description : '');
    const [dateEnd, setDateEnd] = useState(props.currentTask ? props.currentTask.date_end : '');
    const [priority, setPriority] = useState(props.currentTask ? props.currentTask.priority : '');
    const [responsible, setResponsible] = useState(props.currentTask ? `${props.currentTask.responsible_name} ${props.currentTask.responsible_lastname}` : '');
    const [status, setStatus] = useState(props.currentTask ? props.currentTask.status : '')

    function handleSubmit(e) {
        e.preventDefault();
        let date = new Date();
        date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;

        
        if (props.currentTask) {
            props.onSubmit({
                title: title,
                description: description,
                date_end: dateEnd,
                date_created: props.currentTask.date_created.split('T')[0],
                date_updated: date,
                priority: priority,
                status: status,
                creator: currentUser[0].id,
                responsible: getResponsibleId(responsible)
            }, true, props.currentTask.id);
        }
        else {
            props.onSubmit({
                title: title,
                description: description,
                date_end: dateEnd,
                date_created: date,
                date_updated: date,
                priority: priority,
                status: status,
                creator: currentUser[0].id,
                responsible: getResponsibleId(responsible)
            });
        }

    }

    function getResponsibleId(target) {

        target = target.split(' ')
        let result;
        props.subs.forEach((user) => {
            if (user['first_name'] === target[0] && user['last_name'] === target[1]) {
                result = user.id;
            }

        })
        return result;
    }

    return (
        <div className={`TaskPopup TaskPopup_opened `}>
            <div className="TaskPopup__container">
                <h2 className="TaskPopup__title">Задание</h2>

                <form className={`TaskPopup__form`} name={'taskPopup'} onSubmit={handleSubmit}>
                    <label>Заголовок</label>
                    <input type='text'
                        className='TaskPopup__field'
                        placeholder='Введите заголовок'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        disabled={!isLead}
                    ></input>
                    <label>Описание</label>
                    <input type='text'
                        className='TaskPopup__field'
                        placeholder='Опишите задачу'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        disabled={!isLead}></input>
                    <label>Дата окончания</label>
                    <input type='date'
                        className='TaskPopup__field'
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                        disabled={!isLead}
                    ></input>

                    <label>Приоритет</label>
                    <select className='TaskPopup__field'
                        onChange={(e) => setPriority(e.target.value)}
                        value={priority}
                        disabled = {!isLead}>
                        <option></option>
                        <option>Низкий</option>
                        <option>Средний</option>
                        <option>Высокий</option>
                    </select>
                    <label>Ответственный</label>
                    <select className='TaskPopup__field'
                        onChange={(e) => setResponsible(e.target.value)}
                        required
                        disabled = {!isLead}>
                        <option>{responsible && responsible}</option>
                        {props.subs.map(sub => <option key={sub.id}>{sub.first_name} {sub.last_name}</option>)}
                    </select>
                    <label>Статус</label>
                    <select className='TaskPopup__field'
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}>
                        <option></option>
                        <option>К выполнению</option>
                        <option>Выполняется</option>
                        <option>Выполнена</option>
                        <option>Отменена</option>
                    </select>
                    <button className="TaskPopup__save" type="submit">{props.currentTask ? 'Сохранить' : 'Создать'}</button>
                </form>
                <button className="TaskPopup__close" type="button" aria-label="Закрыть" onClick={props.closePopup}></button>
            </div>
        </div>
    )
}