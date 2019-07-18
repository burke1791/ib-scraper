import React from 'react';

function Article(props) {
  
  const addNote = () => {
    props.notes(props.id, props.title);
  }

  return (
    <div className='card my-4' style={{ width: '90%', margin: 'auto' }}>
      <div className='card-header d-flex justify-content-between'>
        <h4 className='d-flex align-items-center' style={{ margin: '0' }}>
          <a href={props.link} target='_blank'>{props.title}</a>
        </h4>
        <button type='button' className='btn btn-primary' onClick={addNote}>View/Add Note</button>
      </div>
      <div className='card-body'>
        <p>{props.summary}</p>
      </div>
    </div>
  );
}

export default Article;