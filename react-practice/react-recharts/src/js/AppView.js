import React from 'react';
import Header from './Header/Nav';
import GoodsShow from './GoodsShow';

class AppView extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <GoodsShow />
      </div>
    )
  }
}

export default AppView;
