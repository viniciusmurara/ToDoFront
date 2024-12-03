import React from 'react'

const header = () => {
  return (
    <header className='bg-blue-500 p-6'> 
      <nav>
        <ul className='flex justify-between mx-10'>
          <li>
            <img src="../logo.png" alt="Logo da Empresa" className='w-24'/>
          </li>
          <li>
            <a href="../auth/login" className='text-white text-lg'>Sair</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default header