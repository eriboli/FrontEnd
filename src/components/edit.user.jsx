import React from "react";
import { useRef, useState, useEffect } from 'react';
import Api from '../services/api';
import './style.css'

function ModalEditUser({ isOpen, setOpenModal, user, getUsers }) {

    // Refs para os campos do formulário
    // const inputCodigo = useRef()
    // const inputName = useRef()
    // const inputEmail = useRef()
    // const inputAge = useRef()

    // State para armazenar os dados do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [codigo, setCodigo] = useState('');

    // Popula o formulário quando o usuário a ser editado é passado para o modal
    useEffect(() => {
        if (user) {
            setCodigo(user.codigo || '');
            setName(user.name || '');
            setEmail(user.email || '');
            setAge(user.age || '');
        }
    }, [user]); // Roda o efeito sempre que o 'user' mudar

    async function updateUsers(codigo) {
        await Api.put(`/users/${codigo}`, { name, age, email })
        //console.log(codigo)

        setOpenModal(false)

        // Atualiza a lista de usuários
        getUsers()
    }

    if (isOpen) {
        return (
            <div id="myPopup" className="popup-container">
                <div className="popup-box">

                    <form action="">
                        <h1>Edição de usuário</h1>
                        <input type="hidden" placeholder='Nome' value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                        <input type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="number" placeholder='Idade' value={age} onChange={(e) => setAge(e.target.value)} />
                        <div className='modal-buttons'>
                            <button type="button" onClick={() => setOpenModal(false)}>Cancelar</button>
                            <button type="button" onClick={() => updateUsers(user.codigo)}>Salvar</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
    return null;
}

export default ModalEditUser;