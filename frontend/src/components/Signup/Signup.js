import { useEffect, useState } from 'react';
import './Signup.css';
import api from '../../utils/Api';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [lead, setLead] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        api.getAllUsers()
            .then((users) => {
                setUsers(users);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    function getLeadId(target) {
    
        if(!target) return null;

        target = target.split(' ')
        let result;
        users.forEach((user) => {
            if (user['first_name'] === target[0] && user['last_name'] === target[1]) {
                result = user.id;
            }
        
        })
        return result;

    }

    function handleSubmit(e) {
        e.preventDefault();

        api.createUser({ name, lastname, login, password, leadId: getLeadId(lead)})
            .then((result) => {
                setError(false);
                navigate('/signin');
                
            })
            .catch((error) => {
                setError(true);
                console.log(error);
                
            })
    }

    return (
        <div className='signup'>
            <h1 className='signup__title'>Добро пожаловать!</h1>
            <form className='signup__form' onSubmit = { handleSubmit }>
                <label for='name'>Имя</label>
                <input type='text' name='name' className='signup__field' placeholder='Введите имя' onChange={(e) => setName(e.target.value)} required></input>
                <label for='lastname'>Фамилия</label>
                <input type='text' name='lastname' className='signup__field' placeholder='Введите фамилию' onChange={(e) => setLastname(e.target.value)} required></input>
                <label for='lead'>Ваш руководитель</label>
                <select name="select" className='signup__field' onChange={(e) => setLead(e.target.value)}>
                    <option></option>
                    { users.map(lead => 
                        <option key={lead.id}>{ `${lead.first_name} ${lead.last_name}` }</option>) }
                </select>
                <label for='login'>Логин</label>
                <input type='text' name='login' className='signup__field' placeholder='Введите логин' onChange={(e) => setLogin(e.target.value)} required></input>
                <label for='password'>Пароль</label>
                <input type='password' name='password' className='signup__field' placeholder='Введите пароль' onChange={(e) => setPassword(e.target.value)}required></input>
                <button type='submit' className='signup__button'>Зарегистрироваться</button>
                {error && <p className='signup__error'>Ошибка регистрации</p>}
                <p>Уже зарегистрированы? <Link to='/signin'>Войти</Link></p>
            </form>
            
        </div>
    )
}