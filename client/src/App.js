import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Jumbotron from './components/jumbotron/jumbotron';
import Article from './components/article/article';
import NotesView from './components/notesView/notesView';

function App() {
  
  const [notesVisible, setNotesVisible] = useState(false);
  const [articleNotes, setArticleNotes] = useState([]);
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
    });
  }

  const getNotes = (articleId, title) => {
    setSelectedArticleTitle(title);
    // API call to get notes

    showNotes();
  }

  const showNotes = () => {
    setNotesVisible(true);
  }

  const hideNotes = () => {
    setArticleNotes([]);
    setSelectedArticleTitle('');
    setNotesVisible(false);
  }

  const generateArticleList = () => {
    if (articles.length) {
      const list = articles.map(article => {
        console.log(article);

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
      <NotesView title={selectedArticleTitle} notes={articleNotes} modalIsOpen={notesVisible} closeModal={hideNotes} />
    </div>
  );
}

export default App;
