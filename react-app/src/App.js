import React from 'react';
import Projects from './Projects';
// import NewProjectForm from './NewProjectForm';
import LoginForm from './LoginForm';
import { login, getToken, getDecodedToken } from './api/auth';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getDecodedToken(),
      projects: null,
      newProject: {
        title: '',
        isCompleted: false
      }
    }
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    return !!this.state.user
  }

  componentDidMount() {
    if (this.isLoggedIn()) {
      console.log({ isLoggedIn: this.isLoggedIn() });
      fetch('/api/projects', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ projects: json });
        })
    }
  }

  handleLogin({ username, password }) {
    login({ username, password })
      .then(user => {
        this.setState(prevState => {
          return Object.assign({}, prevState, { user })
        })
      })
      .then(() => {
        return fetch('/api/projects', {
          headers: { 'Authorization': `Bearer ${getToken()}` }
        })
      })
      .then(res => res.json())
      .then(json =>
        this.setState(
          prevState => { return Object.assign({}, prevState, { projects: json })}
        ));
  }

  handleCompleted(id) {
    fetch('/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        this.setState(prevState => {
          const projects = prevState.projects.map(project => (
            project.id === id ? (
              Object.assign({}, project, { isCompleted: !project.isCompleted })
            ) : (
              project
            )
          ))
          return { projects: projects };
        });
      });
  }

  render() {
    const { token, projects } = this.state;
    return (
      <div className="App">
        <h1>Projects</h1>
        <div>
          {
            !this.isLoggedIn() ? (
              <LoginForm onLogin={this.handleLogin} />
            ) : (
              !!projects ? (
                <Projects items={projects} onCompleted={this.handleCompleted} />
              ) : (
                "No Projects"
              )
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
