import React from 'react';

class Search extends React.Component{
  render() {
    return (
      <div className="search">
        <from>
          <input placeholder="输入商品、类别、店铺"></input>
          <button type="submit">查询</button>
        </from>
        <button className="search-button">帮我选</button>
        <button className="search-button">收藏夹</button>
      </div>
    );
  }
}

export default Search;
