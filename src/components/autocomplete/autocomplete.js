import React, { Component } from 'react';
import styles from './autocomplete.css';

class Autocomplete extends Component {
  state = {
    query: '',
    results: []
  };

  getInfo() {
    if (this.state.query.length >= 3) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=${
          this.state.query
        }&page=1&include_adult=false`
      )
        .then(results => results.json())
        .then(result => {
          this.setState({ results: result.results.splice(0, 8) });
        });
    }
  }
  clearInfo = () => {
    this.setState(() => ({ results: [] }));
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getInfo();
        } else if (!this.state.query) {
          this.clearInfo();
        }
      }
    );
  };

  suggestionSelect(title) {
    this.setState({
      query: title,
      results: []
    });
  }

  Suggestions() {
    var options = this.state.results.map(r => (
      <li onClick={() => this.suggestionSelect(r.original_title)} key={r.id}>
        {r.original_title}
        <p>{r.vote_average + ' Rating, ' + r.release_date.slice(0, 4)} </p>
      </li>
    ));
    return <ul>{options}</ul>;
  }

  render() {
    return (
      <form>
        <div className="autocomplete">
          <input
            placeholder="Enter movie name"
            ref={input => (this.search = input)}
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          {this.Suggestions()}
        </div>
      </form>
    );
  }
}
export default Autocomplete;
