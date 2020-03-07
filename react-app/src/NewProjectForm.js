import React from 'react';

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => {
      const newProject = Object.assign(
        {}, prevState.newProject, { [name]: value }
      );
      return {
        projects: prevState.projects,
        newProject
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newProject),
    })
    .then(res => res.json())
    .then(json => {
      this.setState(prevState => {
        const projects = prevState.projects.concat(json)
        return { projects };
      });
    });
  }

  return (
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
          name="title"
          placeholder="project title"
          value={this.state.newProject.title}
          onChange={this.handleFormChange}
        />
        <input type="submit" value="Create" />
      </div>
    </form>
  )
}
