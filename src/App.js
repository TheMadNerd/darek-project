import React, { useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { parseISO, format } from 'date-fns'
import Article from './Article.js'
import './App.css'

// import './App.css';

function App() {
	const [article, setArticle] = React.useState([])
	const [amount, setAmount] = React.useState(10)
	const [idName, setIdName] = React.useState(0)

	useEffect(() => {
		fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${amount}`)
			.then(res => res.json())

			.then(articles =>
				setArticle(
					articles.map(article => (
						<div className="col-lg-3 flex-column d-flex align-items-stretch">
							<NavLink
								className="lift lift-lg shadow-light-lg card h-100 card-spacer-y: 5px"
								key={article.id}
								to={`/article/${article.id}`}
								onClick={() => navLinkHandler(article.id)}
								style={{ textDecoration: 'none', width: '18rem' }}>
								<div className="img-top">
									<img
										src={article.imageUrl}
										className="card-img-top"
										alt="imageApp"
										style={{ width: '100%', height: '15vw', objectFit: 'cover' }}></img>

									<div className="position-relative">
										<div className="shape shape-bottom shape-fluid-x text-white">
											<svg viewBox="0 0 2100 480" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
													fill="currentColor"></path>
											</svg>{' '}
										</div>
									</div>
								</div>

								<div className="card-body d-flex flex-column">
									<h5 className="card-title">{article.title}</h5>

									<p
										className="card-text"
										style={{
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											overflowWrap: 'break-word',
											textOverflow: 'ellipsis',
											width: '250px',
											color: '#869ab8',
										}}>
										{article.summary}
									</p>
								</div>
								<div className="card-meta mt-auto">
									<hr className="card-meta-divider"></hr>
									<h6 className="text-uppercase text-muted me-2 mb-0"> {article.newsSite}</h6>
									<p className="h6 text-uppercase text-muted mb-0 ms-auto">
										{format(parseISO(article.publishedAt), 'dd MMMM')}
									</p>
								</div>
							</NavLink>
						</div>
					))
				)
			)
			.catch(err => console.log(`błąd ${err}`))
	}, [amount])

	const buttonHandler = e => {
		setAmount(e.target.value)
	}

	const navLinkHandler = key => {
		setIdName(key)
	}

	const navBar = (
		<nav
			class=" my-navbar navbar-collapse text-center  justify-content-center bg-body-tertiary fixed-top"
			style={{ padding: '10px' }}>
			<form class="container-fluid justify-content-start ">
				<button class="my-button btn btn-sm btn-outline-secondary" type="button" value="5" onClick={buttonHandler}>
					5
				</button>
				<button class="my-button btn btn-sm btn-outline-secondary" type="button" value="15" onClick={buttonHandler}>
					15
				</button>
				<button class="my-button btn btn-sm btn-outline-secondary" type="button" value="30" onClick={buttonHandler}>
					30
				</button>
			</form>
		</nav>
	)

	const emptyNavBar = (
		<nav
			class=" my-navbar navbar-collapse text-center  justify-content-center bg-body-tertiary fixed-top"
			style={{ padding: '10px' }}>
			<form class="container-fluid justify-content-start "></form>
		</nav>
	)

	return (
		<div className="container">
			<Routes>
				<Route path={`/article/${idName}`} element={emptyNavBar}></Route>
				<Route path="/" element={navBar}></Route>
			</Routes>

			<div>
				<div className="row g-5" style={{ marginTop: '20px' }}>
					<Routes>
						<Route path={`/article/${idName}`} element={<Article id={idName} />}></Route>
						<Route path="/" element={article}></Route>
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App
