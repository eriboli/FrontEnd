import { useState, useEffect } from 'react';
import './style.css'
import Add from '../../assets/adduser.png'
import Remove from '../../assets/remove.png'
import Edit from '../../assets/edit.png'
import Api from '../../services/api';
import ModalDelUser from '../../components/del.user';
import ModalAddUser from '../../components/add.user';
import ModalEditUser from '../../components/edit.user';


function Home() {

  // Define useState para controlar a abertura do modal e armazenar nome e código do usuário
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const [openModalDelUser, setOpenModalDelUser] = useState(false);
  const [openModalEditUser, setOpenModalEditUser] = useState(false);

  // Fecha o modal ao pressionar a tecla "Escape"
  document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
      setOpenModalAddUser(false);
      setOpenModalDelUser(false);
      setOpenModalEditUser(false);
    }
  });
  
  // State para armazenar o usuário atualmente selecionado (para edição ou deleção)
  const [currentUser, setCurrentUser] = useState(null)

  // Inicia a variável users como um array vazio
  const [users, setUsers] = useState([])

  // Atualiza a variável users com a lista de usuários da API
  async function getUsers() {
    const apiUsers = await Api.get('/users')

    setUsers(apiUsers.data)
  }

  // Atualiza a página com a lista de usuários
  useEffect(() => {
    getUsers();
  }, [])

  async function editUsers(user) {
    //console.log(user)
    setCurrentUser(user);
    setOpenModalEditUser(true);
  }

  async function confirmDelUsers(user) {
    //console.log(user.name, user.codigo)
    setCurrentUser(user);
    setOpenModalDelUser(true)
  }

  // Renderiza o componente
  return (
    <>
      <div className='container'>
        <div className='header-container'>
          <div >
            <h1>Users list</h1>
            <p>Manage the registered users</p>
          </div>
          <button onClick={() => setOpenModalAddUser(!openModalAddUser)}><img src={Add} /></button>
        </div>

        {users.map(user => (

          <div key={user.codigo} className='user-card'>
            <div>
              <p>Name: <span>{user.name}</span></p>
              <p>Age: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <div>
              <button onClick={() => editUsers(user)}><img src={Edit} /></button>
              <button onClick={() => confirmDelUsers(user)}><img src={Remove} /></button>
            </div>
          </div>
        ))}
      </div>

      <ModalAddUser isOpen={openModalAddUser} setOpenModal={setOpenModalAddUser} getUsers={getUsers} />
      <ModalDelUser isOpen={openModalDelUser} setOpenModal={setOpenModalDelUser} user={currentUser} getUsers={getUsers} />
      <ModalEditUser isOpen={openModalEditUser} setOpenModal={setOpenModalEditUser} user={currentUser} getUsers={getUsers} />
    </>
  )
}

export default Home
