import { useState } from 'react';
import './Signin.css';
import api from '../../utils/Api';
import { Link, useNavigate } from 'react-router-dom';


export default function Signin(props) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(e) {

        e.preventDefault();

        api.login({ login, password })
            .then((result) => {
                localStorage.setItem('jwt', result.token);
                
                props.onLogin()
                    .then(() => {
                        setError(false);
                        navigate('/');
                    })
                    .catch(error => console.log(error))

            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })

    }

    return (
        <div className='signin'>
            <h1 className='signin__title'>С возвращением!</h1>
            <form className='signin__form' onSubmit={handleSubmit}>
                <label htmlFor='login'>Логин</label>
                <input type='text' className='signin__field' name='login' placeholder='Введите логин' onChange={(e) => setLogin(e.target.value)} required></input>
                <label htmlFor='password'>Пароль</label>
                <input type='password' className='signin__field' name='password' placeholder='Введите пароль' onChange={(e) => setPassword(e.target.value)} required></input>

                <button type='submit' className='signin__button'>Войти</button>
                {error && <p className='signin__error'>Ошибка при попытке входа</p>}
                <p>У вас нет аккаунта? <Link to='/signup'>Зарегистрироваться</Link></p>
            </form>
        </div>
    )
}