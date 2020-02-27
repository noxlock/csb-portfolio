import React from 'react';
import Projects from './Projects';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: null }
    // this.state = { projects: [] } ??
  }

  componentDidMount() {
    fetch('/api/projects')
      .then(res => res.json())
      .then(json => {
        this.setState({ projects: json });
      })
  }

  render() {
    const { projects } = this.state;
    return (
      <div className="App">
        <h1>Projects</h1>
        <h2>
        {
          !!projects ? (
            <Projects items={projects} />
          ) : (
            "Loading..."
          )
        }
        </h2>
      </div>
    );
  }
}

export default App;
