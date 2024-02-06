import { FC, memo } from 'react';
import './SelectedFilters.scss'
import { PositionRu,  GenderRu, TechnologyRu, OptionsType} from '../../vars';

interface TypeSelectedOptions {
    type:string, 
    set:React.Dispatch<React.SetStateAction<string>>
    id: number,
    ru:{ [k: string]: string }
}

const SelectedFilters:FC<{
    position:string, 
    setPosition:React.Dispatch<React.SetStateAction<string>>,
    gender:string, 
    setGender:React.Dispatch<React.SetStateAction<string>>,
    technology:string, 
    setTechnology:React.Dispatch<React.SetStateAction<string>>,
    searchValue:string, 
    setOptions:React.Dispatch<React.SetStateAction<OptionsType>>
}> = memo(({position, setPosition, gender, setGender, technology, setTechnology,searchValue,setOptions}) => {
    const ListSelectedOptions:TypeSelectedOptions[] = [
        {
            type:position,
            set:setPosition,
            id: 1,
            ru:PositionRu
        },
        {
            type:gender,
            set:setGender,
            id:2,
            ru: GenderRu
        },
        {
            type:technology,
            set:setTechnology,
            id:3,
            ru: TechnologyRu
        },
    ]
    return (
        <div className='selected'>
            <div className='selected-wrapper'>
                <div className='selected-filters'>
                    <h2>Выбранные фильтры:</h2>
                    <ul className='selected-filters-list'>
                        {ListSelectedOptions.map(option => {
                            if(option.type === ''){
                                return ''
                            }
                            return(
                                <li key={option.id}  className='selected-filters-list-item'>
                                    <button onClick={()=>option.set('')}><div className='close'/></button>
                                    <p>{option.ru[option.type].toLowerCase()}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button onClick={()=>{
                    const option:OptionsType = {
                        position:position,
                        gender:gender,
                        technology:technology,
                        searchValue:searchValue,
                    }
                    setOptions(option)
                }}  className='selected-btn'>Найти</button>
            </div>
        </div>
    );
});

export default SelectedFilters;