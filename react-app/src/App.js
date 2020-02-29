import React from 'react';
import Projects from './Projects';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: null }
    // this.state = { projects: [] } ??
    this.handleCompleted = this.handleCompleted.bind(this);
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
      </div>
    );
  }
}

export default App;
