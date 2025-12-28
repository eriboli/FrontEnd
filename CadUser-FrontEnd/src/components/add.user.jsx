import React from "react";
import { useRef, useState } from 'react';
import Api from '../services/api';
import './style.css'

function ModalAddUser({ isOpen, setOpenModal, getUsers }) {
    const inputName = useRef()
    const inputEmail = useRef()
    const inputAge = useRef()

    async function createUsers() {
        await Api.post('/users', {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        })

        getUsers()
        // Fecha o modal
        setOpenModal(!isOpen)
    }

    if (isOpen) {
        return (

            <div id="myPopup" className="popup-container">
                <div className="popup-box">

                    <form action="">
                        <h1>Cadastro de usuário</h1>
                        <input type="text" placeholder='Nome' ref={inputName} />
                        <input type="email" placeholder='Email' ref={inputEmail} />
                        <input type="number" placeholder='Idade' ref={inputAge} />
                        <div className='modal-buttons'>
                            <button onClick={() => setOpenModal(!isOpen)}>Cancelar</button>
                            <button type='button' onClick={createUsers}>Cadastrar</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
    return null;
}

export default ModalAddUser;