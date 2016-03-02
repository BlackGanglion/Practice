import '../css/index.scss';

import React from 'react';
import { render, findDOMNode } from 'react-dom';
import { Router, Route, Link, IndexRoute, Redirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

const blogData = [{
  title: "Immutable 详解及 React 中实践",
},{
  title: "React 源码剖析系列 － 生命周期的管理艺术",
},{
  title: "React 源码剖析系列 － 解密 setState",
},{
  title: "React 源码剖析系列 － 不可思议的 react diff",
},{
  title: "Architecting Android with RxJava 程序亦非猿的Android旅程",
},{
  title: "学习 React Native for Android：React 基础 Android&iOS工程师之路",
},{
  title: "MVVM_Android-CleanArchitecture Rocko",
},{
  title: "使用 Go 开发一个 Slack 运维机器人 Java程序员",
}]

// 此处用于添加根路径
const history = useRouterHistory(createHashHistory)({
  queryKey: '_key',
  basename: '/blog-app',
});

const BlogApp = React.createClass({
  render() {
    let pathname = this.props.location.pathname;
    return (
      <div className="blog-app">
        <ul>
          {/* 可传入接受className */}
          <li><Link activeClassName="active" to="/archives">Archives</Link></li>
          <li><Link activeClassName="active" to="/about">About</Link></li>
          <li><Link activeClassName="active" to="/signIn">Sign in</Link></li>
          <li><Link activeClassName="active" to="/signOut">Sign out</Link></li>
        </ul>
        {React.cloneElement(this.props.children || <div/>, { key: pathname })}
      </div>
    )
  }
});

const About = React.createClass({
  render() {
    return (
      <div className="about">
        <h1>About author</h1>
      </div>
    )
  }
});

const Archives = React.createClass({
  render() {
    return (
      <div>
        原创：<br/> {this.props.original}
        转载：<br/> {this.props.reproduce}
      </div>
    );
  }
});

const Original = React.createClass({
  render() {
    return (
      <div className="archives">
        <ul>
          {blogData.slice(0, 4).map((item, index) => {
            return (
              <li key={index}>
                {/* to={`/article/${index}`} query={{type: 'Original'}} state={{title: item.title}} */}
                <Link to={{ pathname: `/article/${index}`, query: { type: 'Original' }, state: { title: item.title } }}>
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
});

const Reproduce = React.createClass({
  render() {
    return (
      <div className="archives">
        <ul>
          {blogData.slice(4, 8).map((item, index) => {
            return (
              <li key={index}>
                <Link to={{ pathname: `/article/${index}`, query: { type: 'Reproduce' }, hash: '#hash', state: { title: item.title } }} >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
});

const Article = React.createClass({
  render() {
    var id = this.props.params.id;
    var location = this.props.location;
    return (
      <div className="article">
        <h2>{location.state.title}</h2>
        <br/><br/>
        这是文档归档 {location.query.type} 类目下的第 {++id} 篇文章，欢迎你的访问！
      </div>
    )
  }
});

const SignIn = React.createClass({
  getInitialState() {
    return {message: null};
  },

  handleSubmit(e) {
    e.preventDefault();
    const email = findDOMNode(this.refs.name).value;
    const pass = findDOMNode(this.refs.pass).value;
    // 此处通过修改 localStorage 模拟了登录效果
    if (pass !== 'password') {
      this.setState({
        message: '密码错误！'
      });
      return;
    }
    localStorage.setItem('login', 'true');
    const location = this.props.location;
    if (location.state && location.state.nextPathname) {
      this.props.history.replaceState(null, location.state.nextPathname);
    } else {
      // 这里使用 replaceState 方法做了跳转，但在浏览器历史中不会多一条记录，因为是替换了当前的记录
      this.props.history.replaceState(null, '/about');
    }
  },

  render() {
    if (hasLogin()) {
      return <p>你已经登录系统！<Link to="/signOut">点此退出</Link></p>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.message}</p>
        <label><input ref="name"/></label><br/>
        <label><input ref="pass"/></label> (password)<br/>
        <button type="submit">登录</button>
      </form>
    );
  }
});

const SignOut = React.createClass({
  componentDidMount() {
    localStorage.setItem('login', 'false');
  },
  render() {
    return <p>已经退出！</p>;
  }
})

function hasLogin() {
  return localStorage.getItem('login') === 'true';
}

function requireAuth(nextState, replaceState) {
  if (!hasLogin()) {
    // replaceState
    replace({ nextPathname: nextState.location.pathname }, '/signIn');
  }
}

// 每个route中声明的组件在渲染前都要被传入props，包括 history，location
render((
  <Router history={history}>
    <Route path="/" component={BlogApp}>
      {/* 默认 / 路由 */}
      <IndexRoute component={SignIn}/>
      {/* path 属性表示路由组件所对应的路径，可以是绝对或相对路径，相对路径可继承 */}
      <Route path="signIn" component={SignIn}/>
      <Route path="signOut" component={SignOut}/>
      {/* 重定向，/archives -> /archives/posts */}
      <Redirect from="/archives" to="/archives/posts"/>
      {/* onEnter hook 用于拦截操作，验证权限 */}
      <Route onEnter={requireAuth} path="archives" component={Archives}>
        <Route path="posts" components={{
          original: Original,
          reproduce: Reproduce,
        }}/>
      </Route>
      <Route path="article/:id" component={Article}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
), document.getElementById('example'));
