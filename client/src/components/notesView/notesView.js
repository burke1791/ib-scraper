import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '600px',
    minWidth: '400px'
  }
};

function NotesView(props) {

  useEffect(() => {
    fetchNotes();
  }, [props.id]);

  const [articleNotes, setArticleNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  const fetchNotes = () => {
    if (props.id) {
      console.log(props.id);
      console.log('fetchNotes called');
      axios.get('/api/articles/' + props.id).then(response => {
        console.log(response);
        setArticleNotes(response.data);
      });
    }
    
  }

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  }

  const saveNote = () => {
    // post to note save route
    let note = {
      content: noteText
    };
    axios.post('/api/articles/' + props.id, note).then(response => {
      setArticleNotes(articleNotes.concat(response.data));
      setNoteText('');
    });
  }

  const generateNotes = () => {
    console.log('notes length: ' + articleNotes.length);
    if (articleNotes.length) {
      const list = articleNotes.map(note => {
        let author = note.author;
        let content = note.content;

        return (
          <li className='list-group-item' key={note._id} style={{ paddingTop: '0', paddingBottom: '0' }}>
            <span className='author font-weight-bold'>{author}</span>
            <span className='content' style={{ float: 'right' }}>{content}</span>
          </li>
        );
      });

      return (list);
    } else {
      return null;
    }
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      contentLabel='Notes Modal'
      ariaHideApp={false}
    >
      <div className='modal-header'>
        <h5 className='modal-title'>{props.title}</h5>
        <button type='button' className='close' onClick={props.closeModal}>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='modal-body' style={{ paddingTop: '0', paddingBottom: '0' }}>
        <ul className='list-group list-group-flush'>
          {generateNotes()}
        </ul>
      </div>
      <div className='modal-footer'>
        <div className='container-fluid'>
          <div className='row'>
            <textarea className='form-control' value={noteText} onChange={handleNoteChange} style={{ height: '100px' }}></textarea>
          </div>
          <div className='row d-flex justify-content-between my-2'>
            <button className='btn btn-primary' type='button' onClick={saveNote}>Save Note</button>
            <button type='button' className='btn btn-secondary' onClick={props.closeModal}>Close</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NotesView;