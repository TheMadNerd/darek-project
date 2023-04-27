
import React, { useEffect } from 'react'
import { Routes, Route, NavLink, } from 'react-router-dom';
import Article from './Article.js'

import './App.css';



function App() {
  
  const [article, setArticle] = React.useState([]);
  const [amount, setAmount] = React.useState(10);
  const [idName, setIdName] = React.useState(0);

  
  
useEffect(()=>{
  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${amount}`)
  .then(res => res.json())
  
  .then(articles => setArticle(articles.map(article => 
  <div className='box' key={article.id}>
    <div className='img'>
    <img className='articleImg' src={article.imageUrl}></img>
    </div>
    <div className='text'>
    <div className='title'>{article.title}</div> 
    <div className='content'>{article.summary}</div>
    </div>
    <div className='more' >
      <NavLink to="article" id={article.id} onClick={navLinkHandler}>MORE</NavLink>
    </div>
  </div>)

  ))
  .catch(err => console.log(`błąd ${err}` ))
});

  const buttonHandler = e => {
    setAmount(e.target.value)
    
  }

  const navLinkHandler = e => {
    setIdName(e.target.id)
  }
  
  return (
    <div>
    <Routes>
      <Route path='/article' element={<Article id={idName}/>}></Route>
      <Route path='/' element={App}></Route>
    </Routes>
    <div className='menu'>
      Articles amount:
      <div className='buttons'>
      <button value='5' onClick={buttonHandler}>5</button>
      <button value='15' onClick={buttonHandler}>15</button>
      <button value='30' onClick={buttonHandler}>30</button>
      </div>
    </div>
    <div className='boxes'>
      {article}
    </div>
    </div>
  );
}

export default App;
