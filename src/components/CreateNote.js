import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('/api/users')
        this.setState({ users: res.data.map(user => user.username), userSelected: res.data[0].username });

        // Si es true, significa que se edita
        if (this.props.match.params.id) {
            const res = await axios.get('/api/notes/' + this.props.match.params.id);
            this.setState({
                editing: true,
                _id: this.props.match.params.id,
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
            });
        }
    }


    onSubmit = async (e) => {
        // Evita que se recarge la página por defecto al darle al botón del submit
        e.preventDefault();

        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }

        if (this.state.editing) {
            await axios.put('/api/notes/' + this.state._id, newNote);
        } else {
            await axios.post('/api/notes', newNote);
        }

        window.location.href = '/'
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    onChangeDate = (date) => {
        this.setState({ date: date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear una nota</h4>

                    {/** SELECT USER */}
                    <div className="form-group">
                        <select className="form-control" name="userSelected" onChange={this.onInputChange} value={this.state.userSelected}>
                            {
                                this.state.users.map(user =>
                                    (<option key={user} value={user}>
                                        {user}
                                    </option>))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Título" name="title" onChange={this.onInputChange} value={this.state.title} required />
                    </div>

                    <div className="form-group">
                        <textarea name="content" className="form-control" placeholder="Contenido" onChange={this.onInputChange} value={this.state.content} required></textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
