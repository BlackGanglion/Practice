import React from 'react';

class SearchView extends React.Component {
  render() {
    return (
      <div>
        <input className="input-search" type="text" name="name" value="" />
        <button className="btn-search" type="button" name="button">百度一下</button>
      </div>
    );
  }
}

export default SearchView;
