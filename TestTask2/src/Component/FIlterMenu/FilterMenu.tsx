import { FC, memo, useEffect, useRef, useState } from 'react';
import './FilterMenu.scss'
import { PositionRu, PositionList,  GenderRu, GenderList, TechnologyList, TechnologyRu} from '../../vars';

interface FilterType {
    ref:any,
    title: string,
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    list:Array<string>,
    listRu: { [k: string]: string },
    filter:string,
    setFilters:React.Dispatch<React.SetStateAction<string>>
}

const FilterMenu:FC<{
    position:string, 
    setPosition:React.Dispatch<React.SetStateAction<string>>,
    gender:string, 
    setGender:React.Dispatch<React.SetStateAction<string>>,
    technology:string, 
    setTechnology:React.Dispatch<React.SetStateAction<string>>,
    searchValue:string,
    setSearchValue:React.Dispatch<React.SetStateAction<string>>
    }> = memo(({position, setPosition, gender, setGender, technology, setTechnology, searchValue, setSearchValue}) => {

    const [isOpenPosition, setIsOpenPosition] = useState(false)
    const refPosition = useRef<any>() 
    const [isOpenGender, setIsOpenGender] = useState(false)
    const refGender = useRef<any>()
    const [isOpenTechnology, setIsOpenTechnology] = useState(false)
    const refTechnology = useRef<any>()
    
    const FiltersList:Array<FilterType> = [
        {
            ref:refPosition,
            title: 'Должность',
            isOpen:isOpenPosition,
            setIsOpen:setIsOpenPosition,
            list:PositionList,
            listRu: PositionRu,
            filter:position,
            setFilters:setPosition
        },
        {
            ref:refGender,
            title: 'Пол',
            isOpen:isOpenGender,
            setIsOpen:setIsOpenGender,
            list:GenderList,
            listRu: GenderRu,
            filter:gender,
            setFilters:setGender
        },
        {
            ref:refTechnology,
            title: 'Стек технологий',
            isOpen:isOpenTechnology,
            setIsOpen:setIsOpenTechnology,
            list:TechnologyList,
            listRu: TechnologyRu,
            filter:technology,
            setFilters:setTechnology
        },
    ]

    function handlerClick (e:any, ref:any, set:any) {
        if (ref.current && !ref.current.contains(e.target)){
          set(false)
        }
    };

    function handlerPositionClick(e:any){
        handlerClick(e, refPosition, setIsOpenPosition)
    }

    function handlerGenderClick(e:any){
        handlerClick(e, refGender, setIsOpenGender)
    }

    function handlerTechnologyClick(e:any){
        handlerClick(e, refTechnology, setIsOpenTechnology)
    }
    
    useEffect(()=>{
        if(isOpenPosition){
            document.addEventListener('mousedown', handlerPositionClick)
        }
        return ()=>{
            document.removeEventListener('mousedown', handlerPositionClick)
        }
    },[isOpenPosition])

    useEffect(()=>{
        if(isOpenGender){
            document.addEventListener('mousedown', handlerGenderClick)
        }
        return ()=>{
            document.removeEventListener('mousedown', handlerGenderClick)
        }
    },[isOpenGender])

    useEffect(()=>{
        if(isOpenTechnology){
            document.addEventListener('mousedown', handlerTechnologyClick)
        }
        return ()=>{
            document.removeEventListener('mousedown', handlerTechnologyClick)
        }
    },[isOpenTechnology])

    const positionHandler = (set:React.Dispatch<React.SetStateAction<boolean>>) =>{
        set(a => !a)
    }

    return (
        <div className='user-list'>
            <div className='main__filter'>
                <h1>Список сотрудников</h1>
                <ul className='filter-list'>
                    {FiltersList.map((FiltersOptions)=>
                        <li key={FiltersOptions.title} ref={FiltersOptions.ref} className={['filter-item', FiltersOptions.isOpen ? 'show-hidden-list' : ''].join(' ')}>
                            <div className='filter-item-wrapper'>
                                <p>{FiltersOptions.title}</p>
                                <button onClick={
                                    ()=>positionHandler(FiltersOptions.setIsOpen)
                                    } className='filter-item-bnt'></button>
                            </div>
                            <ul  className={['hidden-list', FiltersOptions.title==='Стек технологий'? 'mobile-left':''].join(' ')}>
                                {FiltersOptions.list.map((el)=>
                                    <li key={el} className='hidden-list-item'>
                                        <p>{FiltersOptions.listRu[el]} </p>
                                        <label>
                                            <input 
                                                checked={FiltersOptions.filter == el} 
                                                onChange={()=>{
                                                    if (FiltersOptions.filter === el){
                                                        FiltersOptions.setFilters('')
                                                    } else{                               
                                                        FiltersOptions.setFilters(el)
                                                    }
                                                }}  
                                                type='checkbox' 
                                            />
                                            <span></span>
                                        </label>
                                    </li>
                                )}
                            </ul>
                        </li>
                    )}
                </ul>
                <input value={searchValue} onChange={(e)=>{
                    setSearchValue(e.target.value)
                }} placeholder='Поиск' type="text" className='search' />
            </div>
        </div>
    );
});

export default FilterMenu;