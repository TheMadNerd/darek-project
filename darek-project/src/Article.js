import React, { useEffect } from "react";

function Article(props) {
    const [articles, setArticles] = React.useState([]);

  //  useEffect(() => {
        fetch(`https://api.spaceflightnewsapi.net/v3/articles/${props.id}`)
            .then(res => res.json())
            .then(article => setArticles([article]))
            .catch(err => console.log(`błąd ${err}` ))
  //  }, [props.id]);

    
    // console.log(articles); 
    return (
        <div>
           
        </div>
    );
}

export default Article;
