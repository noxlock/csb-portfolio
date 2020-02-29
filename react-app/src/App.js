import React from 'react';
import Projects from './Projects';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      newProject: {
        name: null,
        isCompleted: null
      }
    }
    this.handleCompleted = this.handleCompleted.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(json => {
        this.setState({ projects: json });
      })
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

  handleFormChange(e) {
    e.persist();
    console.dir(e);
    // this.setState(prevState => ({
    //   projects: prevState.projects,
    //   newProject: {
    //     // isCompleted: ...
    //     // title: ...
    //   }
    // }));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { projects } = this.state;
    return (
      <div className="App">
        <h1>Projects</h1>
        <div>
          {
            !!projects ? (
              <Projects items={projects} onCompleted={this.handleCompleted} />
            ) : (
              "Loading..."
            )
          }
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              <input
                type="checkbox"
                name="isCompleted"
                checked={this.state.newProject.isCompleted}
                onChange={this.handleFormChange}
              />
              Completed
            </label>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="project title"
              value={this.state.newProject.title}
              onChange={this.handleFormChange}
            />
            <input type="submit" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
