import { FC } from 'react';
import './Nav.scss'
import { NavLink} from 'react-router-dom';
import srcArrow from '../../assets/arrow.svg'

const reduction = (word:string)=>{
    if (word.length > 14 ){
        return word.slice(0,14) + '...'
    } 
    return word
}

const Nav:FC<{name?:string, mobile?:boolean}> = ({name, mobile=false}) => {
    return (
        <>
            {mobile && name ? 
                <nav className='nav-main'>
                    <NavLink to='/'>Список cотрудников</NavLink>
                    {name ? 
                        <>
                            <img src={srcArrow} alt="" />
                            <p>{reduction(name)}</p>
                        </>
                        : ''
                    }
                </nav>  
            : 
                <nav className='nav-main'>
                    <p>Главная</p>
                    <img className='arrow' src={srcArrow} alt="" />
                    <NavLink to='/'>Список cотрудников</NavLink>
                    {name ? 
                        <>
                            <img src={srcArrow} alt="" />
                            <p>{name}</p>
                        </>
                        : ''
                    }
                </nav>
            }
        </>
    );
};

export default Nav;