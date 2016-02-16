
var amqp = require('amqplib');
amqp.connect('amqp://localhost').then(function(conn) {
  process.on('SIGINT', conn.close.bind(conn));
  // 创建一个通道
  return conn.createChannel().then(function(ch) {
    // 监听hello队列，false表示队列保存在内存中
    var ok = ch.assertQueue('hello', {durable: false});

    ok = ok.then(function(_qok) {
      // 通道消费hello队列
      return ch.consume('hello', function(msg) {
        console.log(" [x] Received '%s'", msg.content.toString());
      }, {noAck: true});
    });

    return ok.then(function(_consumeOK) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
}).then(null, console.warn);

/*
var open = amqp.connect('amqps://localhost');

open.then(function(conn) {
  process.on('SIGINT', conn.close.bind(conn));
  return conn.createChannel().then(function(ch) {
    ch.sendToQueue('foo', new Buffer('Hello World!'));
  });
}).then(null, console.warn);
*/
