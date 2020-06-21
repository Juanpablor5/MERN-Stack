import React from 'react'
import { BrowserRouter as Router , Route} from 'react-router-dom'

import Navigation from './components/Navigation'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import NoteList from './components/NoteList'

function App() {
  return (
    <Router>
      <Navigation />
      
      <Route path="/" exact component={NoteList} />
      <Route path="/edit/:id" component={CreateNote} />
      <Route path="/create" component={CreateNote} />
      <Route path="/user" component={CreateUser} />

    </Router>
  );
}

export default App;
