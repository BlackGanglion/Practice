import React from 'react';
import SimpleLineChart from './Charts/SimpleLineChart';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getData("http://127.0.0.1:3000/src/api/SimpleLineChartData1.json");
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
    console.log('dfds');
    this.getData("http://127.0.0.1:3000/src/api/SimpleLineChartData2.json");
  };
  render() {
    return (
      <div>
        <SimpleLineChart data = {this.state.data} />
        <button onClick = {this.handleClick} >测试按钮</button>
      </div>
    )
  }
}

export default AppView;
