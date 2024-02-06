import React, { FC } from 'react';
import { UserType, createDate } from '../../vars';
import Spinner from '../Spinner/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Table:FC<{
    userList:Array<UserType>,
    hasMore:boolean,
    loading:boolean,
    noData:boolean,
    error:boolean,
    fetchError:boolean,
    setId:React.Dispatch<React.SetStateAction<number>>
    fetchData:()=>void,
    }> = ({hasMore,userList,loading,noData,error,fetchData,fetchError,setId}) => {
    const navigate = useNavigate();
    return (
        <div className='table'>
                    <div className='title'>
                        <div className='item first'>ФИО</div>
                        <div className='item'>Должность</div>
                        <div className='item'>Телефон</div>
                        <div className='item'>Дата рождения</div>
                    </div>
                    {error ? 
                        <div style={{textAlign:'center'}}>Не удалось загрузить данные</div> 
                    :
                        <>
                        {loading ? <Spinner/> : 
                        <>
                            {noData ? 
                                <p style={{ textAlign: 'center', padding:10  }}>
                                    <b>Сотрудников с такими фильтрами нет</b>
                                </p>
                            :
                            <InfiniteScroll
                                dataLength={userList.length}
                                style={{ overflow:'hidden'}}
                                next={fetchData}
                                hasMore={hasMore}
                                loader={<Spinner/>}
                                endMessage={
                                    <p style={{ textAlign: 'center', padding:10 }}>
                                    <b>Сотрудники закончились</b>
                                    </p>
                                }
                            >
                                {userList.map(user => {
                                    return (
                                        <button onClick={()=>{
                                            setId(user.id)
                                            navigate('/user')
                                            }} key={user.id} className='table-user-list-item'>
                                            <div className='table-user-list-item-wrraper'>
                                                <div className='item first'>{user.name}</div>
                                                <div className='item'>{user.position}</div>
                                                <div className='item'>{user.phone}</div>
                                                <div className='item'>{createDate(user.birthdate)}</div>
                                            </div>
                                        </button>
                                    )
                                })}
                                {fetchError  ? 
                                    <div style={{textAlign:'center', padding:10, display:'flex', flexDirection:'column', alignItems:'center', gap:10}}>
                                        Не удалось загрузить сотрудников
                                        <button onClick={fetchData} style={{padding:'10px 20px', borderRadius:5, width:150}}>Обновить</button>
                                    </div>: ''
                                }
                                </InfiniteScroll>
                            }
                            
                            </>
                            }
                        </>
                    }
                  
            </div>
    );
};

export default Table;