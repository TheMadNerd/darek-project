import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parseISO, format } from 'date-fns'

function Article(props) {
	const [articles, setArticles] = React.useState([])

	console.log(props.id)

	useEffect(() => {
		fetch(`https://api.spaceflightnewsapi.net/v3/articles/${props.id}`)
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
		<div>
			<h1 className="display-4 text-center">{articles.title}</h1>
			<p className="lead mb-7 text-center text-muted">{articles.summary}</p>
			<div className="row align-items-center py-5 border-top border-bottom">
				<div className="col ms-n5">
					<h6 className="text-uppercase mb-0">{articles.newsSite}</h6>
					<div className="fs-sm text-muted">Published on: {formattedDate}</div>
				</div>
				<div className="col-auto">
					<span className="h6 text-uppercase text-muted d-none d-md-inline me-4">
						Original website: <Link to={articles.url}>{articles.newsSite}</Link>
					</span>
				</div>
			</div>

			<div className="row justify-content-center" style={{ marginTop: '30px' }}>
				<div className="col-12 col-md-10 col-lg-9 col-xl-8">
					<figure className="figure mb-7">
						<img className="figure-img img-fluid rounded lift lift-lg" src={articles.imageUrl} alt="photo"></img>
					</figure>
				</div>
			</div>
		</div>
	)
}

export default Article
