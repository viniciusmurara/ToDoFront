import useAuthContext from '@/Hooks/UseAuthContext';
import React from 'react'

const Header = () => {

  const {logOut} = useAuthContext();

  return (
    <header className='bg-sky-900 p-6'> 
      <nav>
        <ul className='flex justify-between mx-10'>
          <li>
            <img src="../logo.png" alt="Logo da Empresa" className='w-24'/>
          </li>
          <li>
            <a href="../auth/login" className='text-white text-lg cursor-pointer' onClick={logOut}>Sair</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
