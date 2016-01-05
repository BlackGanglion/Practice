import React from 'react';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: 'initSearchQuery'
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event) => {
    console.log('handleChange', event.target.value);
    this.setState({
      searchQuery: event.target.value
    });
  }
  handleClick() {
    console.log('handleClick', this.state.searchQuery);
  }
  render() {
    return (
      <div>
        <div>
          {this.state.searchQuery}
        </div>
        <input
          onChange = {this.handleChange}
          className="input-search"
          type="text"
        ></input>
        <button
          onClick={this.handleClick}
          className="btn-search">
          {this.props.searchPrompt}
        </button>
      </div>
    );
  }
}

export default SearchView;
