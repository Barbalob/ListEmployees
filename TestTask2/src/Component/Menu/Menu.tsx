import { Outlet } from 'react-router-dom';
import srcLogo from '../../assets/logo66.svg';
import './Menu.scss'
import { FC, memo, useState } from 'react';
import MySwitch from '../Switch/MySwitch';


const Menu:FC<{mobile?:boolean}> = memo(({mobile=false}) => {
    const [isLigth, setIsLigth] = useState(true)

    function handleChange() {
        setIsLigth(isLigth => !isLigth)
        if (isLigth){
            document.body.setAttribute('dark', '')
        } else {
            document.body.removeAttribute('dark')
        }
    }


    return (
        <>
            <div className='menu'>
                <div className='menu__wrapper'>
                    <img className='logo' src={srcLogo} alt="logo" />
                    <div className='menu__info'>
                        <p><a href="tel:+73432908476">+7 343 290 84 76</a></p>
                        <p><a href="mailto:info@66bit.ru">info@66bit.ru</a></p>
                        <MySwitch mobile={mobile} handleChange={handleChange} flag={isLigth} />
                    </div>
                </div>
            </div> 
            <Outlet />
        </>
    );
});

export default Menu;