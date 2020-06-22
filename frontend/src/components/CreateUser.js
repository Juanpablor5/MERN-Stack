import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    // Hace el método GET
    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({
            users: res.data
        });
    }

    onChangeUsername = (obj) => {
        this.setState({
            username: obj.target.value
        })
    }

    // Hace el método POST
    onSubmit = async (obj) => {
        // Evita que se recarge la página por defecto al darle al botón del submit
        obj.preventDefault();

        // let encontrado = false
        // this.state.users.forEach(user => {
        //     if (this.state.username === user.username && !encontrado) {
        //         encontrado = true
        //     } else {
        //         encontrado = false
        //     }
        // });

        // if (!encontrado) {
            await axios.post('http://localhost:4000/api/users', { username: this.state.username })
            this.getUsers();

            // Regresa el usuario a vacío luego de guardar
            this.setState({ username: '' });
        // } else {
        //     alert("Ya existe este nombre de usuario")
        // }
    }

    // Hace el método DELETE
    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id)
        this.getUsers();
    }

    render() {
        let c = 0
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear nuevo usuario</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" value={this.state.username} className="form-control" onChange={this.onChangeUsername} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <table className="table table-bordered bg-white">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "90px", textAlign: "center" }}>#</th>
                                <th scope="col">Nombre de usuario</th>
                                <th scope="col" style={{ width: "90px" }}>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(user => (
                                    <tr key={user._id}>
                                        <th scope="row" className="align-middle" style={{ textAlign: "center" }}>{c += 1}</th>
                                        <td className="align-middle">{user.username}</td>
                                        <td className="d-flex justify-content-center align-middle"><button type="button" className="btn btn-danger" onClick={() => this.deleteUser(user._id)}><svg className="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                                        </svg></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
