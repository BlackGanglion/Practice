import React from 'react';
import Search from './Search';
import Login from './Login';

class Nav extends React.Component{
  render() {
    return (
      <header>
        <a className="logo">
          <h3>OOSA</h3>
        </a>
        <div className="header-main">
          <Login></Login>
          <Search></Search>
        </div>
        <nav>
          <ul>
            <li>全部分类</li>
            <li>首页</li>
            <li>促销活动</li>
            <li>优惠券</li>
            <li>海涛值得买</li>
            <li>价格比比看</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Nav;
