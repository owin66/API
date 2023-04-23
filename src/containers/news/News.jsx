import Title from 'components/title/title';
import React, { Component } from 'react';

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
    fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}`) //страка запроса
      .then(res => res.json()) // обработка ответа
      .then(result => this.setNews(result)) //eсли ответ получен то передаем его в сетНьюс
      .catch(error => error);
  }

  setNews = result => {
    this.setState({ result }); //добавляем в стейт
  };

  render() {
    return (
      <div className="wrapper">
        <Title title="Hacker News" />
      </div>
    );
  }
}

export default News;

//
