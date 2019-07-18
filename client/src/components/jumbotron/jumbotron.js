import React from 'react';

function Jumbotron(props) {
  return (
    <div className='jumbotron jumbotron-fluid'>
      <div className='container'>
        <h1 className='display-4'>Welcome to the Illiniboard Scraper</h1>
        <p className='lead'>Click on the articles below and view/add comments to your heart's content</p>
        <button type='button' className='btn btn-primary' onClick={props.fetchArticles}>Check For New Articles</button>
      </div>
    </div>
  );
}

export default Jumbotron;