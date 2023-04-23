import Title from 'components/title/title';
import React, { Component } from 'react';
import NewsPost from 'components/news/news';
import Input from 'components/input/input';
// 1. создаем 3 базовые константы, так делается всегда

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';

class News extends Component {
  state = {
    searchQuery: '',
    result: {},
  };

  componentDidMount() {
    const { searchQuery } = this.state;
    fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}`)
      .then(res => res.json())
      .then(result => this.setNews(result))
      .catch(error => error);
  }

  setNews = result => {
    this.setState({ result });
  };

  render() {
    const { searchQuery, result } = this.state;
    const { hits = [] } = result;
    return (
      <div className="wrapper">
        <Title title="Hacker News" />
        <ul className="newsList">
          {hits.map(
            ({
              author,
              created_at,
              num_comments,
              objectID,
              title,
              points,
              url,
            }) => (
              <NewsPost
                key={objectID}
                author={author}
                created_at={created_at}
                num_comments={num_comments}
                title={title}
                points={points}
                url={url}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

export default News;

//
