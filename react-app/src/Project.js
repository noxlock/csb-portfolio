import React from 'react';

export default function Project({ id, title, isCompleted, onCompleted }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={onCompleted} />
        {title}
      </label>
    </div>
  )
}
