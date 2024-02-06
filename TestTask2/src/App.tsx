import { useEffect, useState } from 'react'
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import { getUsers} from './api/request';
import Menu from './Component/Menu/Menu';
import UserList from './Component/UserList/UserList';
import User from './Component/User/User';
import {OptionsType, UserType} from './vars'

const defaultOptions = {
  position:'',
  gender:'',
  technology:'',
  searchValue:'',
}


function App() {
  const [isMobile] = useState<boolean>(window.screen.width < 500)
  const [loading, setLoading] = useState<boolean>(true)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [noData, setNoData] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [userList, setUserList] = useState<Array<UserType>>([])
  const [options, setOptions] = useState<OptionsType>(defaultOptions)
  const [id, setId] = useState<number>(-1)
 
  const fetchData = () => {
    setFetchError(false)
    getUsers(page, options)
    .then((response)=>{
      setPage(page=>page+1)
      setUserList((old)=>[...old, ...response.data])
      if (response.data.length < 10){
        setHasMore(false)
      }
    }).catch(()=>{
      setFetchError(true)
    })
  }


  useEffect(()=>{
    setHasMore(true)
    setLoading(true)
    setNoData(false)
    setError(false)
    getUsers(1,options).then((response)=>{
      setPage(2)
      setUserList(response.data)
      if (response.data.length < 10){
        if (response.data.length === 0){
          setNoData(true)
        } else {
          setHasMore(false)
        }
      }

    }).catch((err)=>{  
      console.log(err);
      setError(true)
    }).finally(()=>{
      setLoading(false)
    })
  },[options])



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={
        <Menu mobile={isMobile}/>
      }>
        <Route path='' element={
          <UserList 
            noData={noData} 
            hasMore={hasMore} 
            fetchData={fetchData} 
            loading={loading} 
            userList={userList} 
            options={options}
            setOptions={setOptions}
            setId={setId}
            error={error}
            fetchError={fetchError}
          />
          }
        />
        <Route path='user' element={
          <User 
            id={id}
            mobile={isMobile}
            />  
          }
        />
      </Route>
    )
  )

  return (
    <>
      {<RouterProvider router={router} />}   
    </>
  )
}

export default App
