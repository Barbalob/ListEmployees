
import './UserList.scss'
import Nav from '../Nav/Nav';
import { FC, useState } from 'react';
import { OptionsType, UserType} from '../../vars';
import FilterMenu from '../FIlterMenu/FilterMenu';
import SelectedFilters from '../SelectedFilters/SelectedFilters';
import Table from '../Table/Table';

const UserList:FC<{
    userList:Array<UserType>,
    hasMore:boolean,
    loading:boolean,
    noData:boolean,
    error:boolean,
    fetchError:boolean,
    options:OptionsType,
    setOptions:React.Dispatch<React.SetStateAction<OptionsType>>
    setId:React.Dispatch<React.SetStateAction<number>>
    fetchData:()=>void,
}> = ({hasMore,userList,loading,noData,error,fetchData,fetchError,setOptions,options,setId}) => {
    const [position, setPosition] = useState<string>(options.position)
    const [gender, setGender] = useState<string>(options.gender)
    const [technology, setTechnology] = useState<string>(options.technology)
    const [searchValue, setSearchValue] = useState<string>(options.searchValue)

    return (
        <>   
            <Nav/> 
            <FilterMenu 
                position={position} 
                setPosition={setPosition} 
                gender={gender} 
                setGender={setGender}
                technology={technology} 
                setTechnology={setTechnology}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <SelectedFilters 
                position={position} 
                setPosition={setPosition} 
                gender={gender} 
                setGender={setGender}
                technology={technology} 
                setTechnology={setTechnology}
                setOptions={setOptions}
                searchValue={searchValue}
            />
            <Table 
                hasMore={hasMore} 
                userList={userList}
                loading={loading}
                noData={noData}
                error={error}
                fetchData={fetchData}
                fetchError={fetchError}
                setId={setId}
            />
        </>
    );
};

export default UserList;