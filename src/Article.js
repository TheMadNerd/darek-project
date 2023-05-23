import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'



function Article(props) {
	const [articles, setArticles] = React.useState([])

	const url = window.location.href
	const parts = url.split('/')
	const lastPart = parts.pop()
	console.log(lastPart)

	useEffect(() => {
		fetch(`https://api.spaceflightnewsapi.net/v3/articles/${lastPart}`)
			.then(res => res.json())
			.then(article => setArticles(article))
			.catch(err => console.log(`błąd ${err}`))
	}, [])

	const dateString = `${articles.publishedAt}`
	const date = new Date(dateString)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	const formattedDate = `${year}-${month}-${day}`

	return (
		
		
<div className="card flex-column d-flex align-items-stretch">
<img src={articles.imageUrl} className="card-img-top mx-auto img-fluid" alt="articleImage" style={{width: "100%", height: "30vw", objectFit: "cover"}}></img>
<div className="card-body h-100">
  <h5 className="card-title">{articles.title}</h5>
  <p className="card-text">{articles.summary}</p>
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Published by: <span style={{fontWeight: "bold"}}>{articles.newsSite}</span></li>
  <li className="list-group-item">Date of publish: <span style={{fontWeight: "bold"}}>{formattedDate}</span></li>
  <li className="list-group-item">Link to original website: <span style={{fontWeight: "bold"}}><Link to={articles.url}>{articles.newsSite}</Link></span></li>
</ul>
</div>
	)
}

export default Article
