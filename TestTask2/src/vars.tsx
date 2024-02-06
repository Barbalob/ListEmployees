import { useEffect } from "react"
type ListType = { [k: string]: string }

export const GenderRu:ListType = {
  'Male':"Мужчина", 
  'Female':"Женщина"
}

export const GenderList = ['Male',  'Female']

export const TechnologyRu:ListType = {
'CSharp':'CSharp',
'React':'React',
'Java':'Java',
'PHP':'PHP',
'Figma':'Figma',
'Word':'Word'
}

export const TechnologyList = [
  'CSharp',
  'React',
  'Java',
  'PHP',
  'Figma',
  'Word'
]

export const PositionRu:ListType = {
  'Backend':"Backend-разработчик", 
  'Frontend':"Frontend-разработчик", 
  'Analyst':"Аналитик", 
  'Manager':"Менеджер",
  'Designer': "Дизайнер"
}

export const PositionList = [
  'Backend', 
  'Frontend', 
  'Analyst', 
  'Manager',
  'Designer'
]

export interface UserType{
id:number,
birthdate:string,
dateOfEmployment:string,
name:string,
phone:string,
photo:string,
gender:string,
position:string,
stack:Array<string>
}

export interface OptionsType {
  position:string,
  gender:string,
  technology:string,
  searchValue:string,
}


const DateList:ListType = {
  'января':"01",
  'февраля':"02",
  'марта':"03",
  'апреля':"04",
  'мая':"05",
  'июня':"06",
  'июля':"07",
  'августа':"08",
  'сентября':"09",
  'октября':'10',
  'ноября':"11",
  'декабря':'12'
}

export const createDate = (date:string)=>{
  const list = date.split(' ')
  return [list[0], DateList[list[1]], list[2]].join('.')
}