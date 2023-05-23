
import React, { useEffect } from 'react'
import { Routes, Route, NavLink, } from 'react-router-dom';
import Article from './Article.js'

// import './App.css';



function App() {
  
  const [article, setArticle] = React.useState([]);
  const [amount, setAmount] = React.useState(10);
  const [idName, setIdName] = React.useState(0);

  
  
useEffect(()=>{
  fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${amount}`)
  .then(res => res.json())
  
  .then(articles => setArticle(articles.map(article => 

    
  <div className="col-lg-3 flex-column d-flex align-items-stretch">
  <div className="card h-100 card-spacer-y: 5px" key={article.id} style={{width: "18rem"}}>
  <img src={article.imageUrl} className="card-img-top" alt="imageApp" style={{width: "100%", height: "15vw", objectFit: "cover"}}></img>
  <div className="card-body d-flex flex-column">
    <h5 className="card-title">{article.title}</h5>
    <p className="card-text">{article.summary}</p>
    
    <button type="button" className="btn btn-warning mt-auto"><NavLink to={`/article/${article.id}`} id={article.id} onClick={navLinkHandler}>MORE</NavLink></button>

  </div>
  </div>
  </div>
  
  )

  ))
  .catch(err => console.log(`błąd ${err}` ))
}, [amount]);


  const buttonHandler = e => {
    setAmount(e.target.value)
    
  }

  const navLinkHandler = e => {
    setIdName(e.target.id)
  }
  
  return (
    <div className="container">
<nav class=" navbar-collapse text-center  justify-content-center bg-body-tertiary fixed-top" style={{padding: "10px"}} >
  <form class="container-fluid justify-content-start ">
    <button class="btn btn-sm btn-outline-secondary" type="button" value='5' onClick={buttonHandler}>5</button>
    <button class="btn btn-sm btn-outline-secondary" type="button" value='15' onClick={buttonHandler}>15</button>
    <button class="btn btn-sm btn-outline-secondary" type="button" value='30' onClick={buttonHandler}>30</button>
  </form>
</nav>

    <div>
      <div className='row g-5' style={{marginTop: "20px"}}>
    <Routes>
      <Route path={`/article/${idName}`} element={<Article id={idName}/>}></Route>
      <Route path='/' element={article}></Route>
    </Routes>
    </div>
    </div>
    </div>
  );
}

export default App;
