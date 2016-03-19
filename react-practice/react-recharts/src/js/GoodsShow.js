import React from 'react';
import SimpleLineChart from './Charts/SimpleLineChart';

class GoodsShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getData("/api/SimpleLineChartData1.json");
  };
  getData = (url) => {
    let that = this;
    fetch(url).then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          that.setState({
            data: data
          })
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });
  };
  handleClick = () => {
    this.getData("/api/SimpleLineChartData2.json");
  };
  render() {
    return(
      <section className="goodsShow">
        <div>
          <a href="#">首页</a>>
          <a href="#">全部分类</a>>
          <a href="#">母婴</a>>
          <a href="#">奶粉</a>> 商品详情
        </div>
        <h3>美素力（frisolac）金装婴儿配方奶粉 1段0-6个月婴儿适用900克荷兰原装进口</h3>
        <div className="goodsInfo">
          <div className="pic">
            <img src="/img/msl.jpg"></img>
          </div>
          <div className="content">
            <div className="content-pirce">￥ <span>235.0</span> 起</div>
            <a href="#">4家商城有售</a>
            <p>品牌：FRISO/美素佳儿</p>
            <button>收藏并降价提醒</button>
          </div>
        </div>
        <div className="goodsChart">
          <SimpleLineChart data = {this.state.data} />
          <button onClick = {this.handleClick} >测试按钮</button>
        </div>
      </section>
    );
  }
}

export default GoodsShow;
