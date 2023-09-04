import React from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../atom'

export default function logout() {
    const [, setUserState] = useAtom(userAtom)

    const handleLogout = () => {
        setUserState({ isLogged: false });
        console.log('vous etes déconnecter');
    };
  
  
    return (
    <button className='btn btn-danger' onClick={handleLogout}>Se Déconnecter</button>
  )
}
