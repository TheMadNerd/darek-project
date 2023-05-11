import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Article.css'

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
		<div className="article">
			<div className="head">
				<div className="articleTitle">{articles.title}</div>
				<img className="photo" src={articles.imageUrl} alt="imageArticle"></img>
				<div className="summary">{articles.summary}</div>

				<div className="footer">
					Published by: {articles.newsSite} at {formattedDate}
					<div>
						Link to original website: <Link to={articles.url}>{articles.newsSite}</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Article
