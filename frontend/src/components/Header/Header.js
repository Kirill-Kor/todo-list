import { useNavigate} from 'react-router-dom'
import './Header.css'
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Header(props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const user = useContext(CurrentUserContext);
    
    useEffect(() => {
        if (user) setName(`${user[0].first_name} ${user[0].last_name} `)


    }, [user])


    function toSignin() {
        navigate('/signin');

    }

    function toSignup() {

        navigate('/signup');
    }

    return (
        <header className='header'>
            {!props.isLogged ?
                <nav className='header__navigation'>
                    <button type='button' className='header__button' onClick={toSignin}>Вход</button>
                    <button type='button' className='header__button' onClick={toSignup}>Регистрация</button>
                </nav>
                : <>
                    <button type='button' className='header__button' onClick={props.onLogout}>Выйти</button>
                    <p>Пользователь: {name}</p>
                </>}


        </header>
    )
}