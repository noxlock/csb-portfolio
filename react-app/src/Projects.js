import React from 'react';
import Project from './Project'

export default function Projects({ items, onCompleted }) {
  return (
    <ol>
      {
        items.map(item => (
          <li key={item.id} >
            <Project
              id={item.id}
              isCompleted={item.isCompleted}
              title={item.title}
              onCompleted={() => { onCompleted(item.id) }}
            />
          </li>
        ))
      }
    </ol>
  )
}
