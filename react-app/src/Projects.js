import React from 'react';
import Project from './Project'

export default function Projects({ items }) {
  return (
    <div>
      {
        items.map((item, index) => (<Project key={index} title={item.title} />))
      }
    </div>
  )
}
