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
    result: {}, //будем записывать данные
  };

  componentDidMount() {
    const { searchQuery } = this.state; //Вытягиваем значениe = ''
    this.fetchData(searchQuery);
    // fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}`) //страка запроса
    //   .then(res => res.json()) // обработка ответа
    //   .then(result => this.setNews(result)) //eсли ответ получен то передаем его в сетНьюс
    //   .catch(error => error);
  }

  //1.  добавляем логику на запрос

  fetchData = searchQuery => {
    fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}`) //страка запроса
      .then(res => res.json()) // обработка ответа
      .then(result => this.setNews(result)) //eсли ответ получен то передаем его в сетНьюс
      .catch(error => error);
  };

  //2.  добавляем поиск по инпуту который изменяет наш поисковой запрос
  //вытягиваем значение вписанное в инпут и записываем в стейт
  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  getSearch = ({ key }) => {
    // если нажат инпут то вытягиваем введенное значение из стейта и отправляем запрос
    if (key === 'Enter') {
      const { searchQuery } = this.state;
      this.fetchData(searchQuery);
    }
  };

  setNews = result => {
    this.setState({ result }); //добавляем в стейт
  };

  render() {
    const { searchQuery, result } = this.state;
    const { hits = [] } = result;
    //в result у нас объекты, мы делаем массив объектов и вытягиваем из него данные

    console.log(result);

    return (
      <div className="wrapper">
        <Title title="Hacker News" />
        <Input
          onKeyPress={this.getSearch}
          onChange={this.handleInputChange}
          value={searchQuery}
        />
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
