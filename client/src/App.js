import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from './components/jumbotron/jumbotron';
import Article from './components/article/article';
import NotesView from './components/notesView/notesView';

function App() {
  
  const [notesVisible, setNotesVisible] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState('');
  const [selectedArticleTitle, setSelectedArticleTitle] = useState('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, []);
  
  const scrape = () => {
    axios.get('/api/scrape').then(response => {
      getAllArticles();
    });
  }

  const getAllArticles = () => {
    axios.get('/api/articles').then(response => {
      setArticles(response.data);
      console.log('new articles set');
    });
  }

  const getNotes = (articleId, title) => {
    setSelectedArticleTitle(title);
    setSelectedArticleId(articleId);

    showNotes();
  }

  const showNotes = () => {
    setNotesVisible(true);
  }

  const hideNotes = () => {
    setSelectedArticleTitle('');
    setSelectedArticleId('');
    setNotesVisible(false);
  }

  const generateArticleList = () => {
    if (articles.length) {
      console.log('app should rerender');
      const list = articles.map(article => {
        let title = article.title;
        let link = article.link;
        let summary = article.summary;

        return (
          <Article title={title} link={link} summary={summary} key={article._id} id={article._id} notes={getNotes} />
        );
      });

      return (list);
    } else {
      return null;
    }
  }
  
  return (
    <div className='App'>
      <Jumbotron fetchArticles={scrape} />
      <div className='articles'>
        {generateArticleList()}
      </div>
      <NotesView title={selectedArticleTitle} id={selectedArticleId} modalIsOpen={notesVisible} closeModal={hideNotes} />
    </div>
  );
}

export default App;
