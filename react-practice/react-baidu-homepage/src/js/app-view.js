// Import React
import React from 'react';

import SearchView from './search-view';

// Create class called AppView that extends the base React Component class
class AppView extends React.Component {
  render() {
    let searchPrompt = '百度一下';
    return (
      <div className="container-search">
        <img className="img-logo" src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" alt="" />
        <SearchView searchPrompt={searchPrompt}/>
      </div>
    );
  }
}

export default AppView;
