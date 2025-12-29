import React from "react";
import Api from '../services/api';
import './style.css'

function ModalDelUser({ isOpen, setOpenModal, user, getUsers }) {

    async function deleteUsers(codigo) {
        await Api.delete(`/users/${codigo}`)
        //console.log(codigo)

        setOpenModal(false)

        // Atualiza a lista de usuários
        getUsers()
    }

    if (isOpen) {
        return (
            <div id="myPopup" className="popup-container">
                <div className="popup-box">
                    <p>Excluir o usuário {user.name}?</p>
                    <div className='modal-buttons'>
                        <button onClick={() => setOpenModal(!isOpen)}>Cancelar</button>
                        <button onClick={() => deleteUsers(user.codigo)}>Excluir</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default ModalDelUser;