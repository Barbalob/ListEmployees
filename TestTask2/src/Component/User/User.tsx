import Nav from '../Nav/Nav';
import srcTest from '../../assets/test.png'
import './User.scss'
import { FC, useEffect, useState } from 'react';
import { UserType, createDate } from '../../vars';
import Spinner from '../Spinner/Spinner';
import { getUser } from '../../api/request';
import { useNavigate } from 'react-router-dom';


const defaultUser:UserType = {
    id:-1,
    birthdate:'0:00:00',
    dateOfEmployment:'0:00:00',
    name:'Иванов Иван Иваныч',
    phone:"+76669900992",
    photo:srcTest,
    gender:'мужчина',
    position:'Fronend',
    stack:['React']
}

const User:FC<{
    mobile:boolean
    id:number,
}> = ({mobile=false, id,}) => {

    const [isLoading, setIsLoading] = useState(true)
    const [user,setUser] = useState<UserType>(defaultUser)
    const [error, setError] = useState<boolean>(false)
    
    const navigate = useNavigate()

    useEffect(()=>{
        if (id !== -1){
            setIsLoading(true)
            getUser(id)
                .then((response)=>{
                    setUser(response.data)
                }).catch(()=>{
                    setError(true)
                })
                .finally(()=>{
                    setIsLoading(false)
                })
        } else {
            setError(true)
        } 
        },[id])

    return (
        <>
            {error ?
            <div style={{textAlign:'center', padding:10, display:'flex', flexDirection:'column', alignItems:'center', gap:10}}>
                Не удалось загрузить данные пользователя
                <button onClick={()=>{navigate('/')}} style={{padding:'10px 20px', borderRadius:5, width:150}}>Вернуться назад</button>
            </div>
            :
            <>
                {isLoading ? <Spinner/> :
                <>
                    <Nav name={user.name} mobile={mobile}/>  
                    <div className='info'>
                        <img className='info-avatar' src={user.photo} alt="" />
                        <div className='info-mobile'>
                            <div className='info-section'>
                                <p className='info-section-name'>{user.name}</p>
                                <p className='info-section-job'>{user.position}</p>
                            </div>
                            <ul className='info-section-stack'>
                                {user.stack.map(technology=>
                                    <li key={technology} className='info-section-stack-item'>{technology}</li>
                                    )}
                            </ul>
                        </div>
                    </div>
            
                    <div className='main-info'>
                        <h1>Основная информация</h1>
                        <div className='main-info-section'><p>Контактный телефон:</p> <p>{user.phone.replace('(', '').replace(')','')}</p></div>
                        <div className='main-info-section'><p>Дата рождения:</p> <p>{createDate(user.birthdate)}</p></div>
                        <div className='main-info-section'><p>Дата устройства:</p> <p>{createDate(user.dateOfEmployment)}</p></div>
                    </div>
                </>
                }
            </>
            }
                  
        </>
    );
};

export default User;