var amqp = require('amqplib/callback_api');

function bail(err, conn) {
  console.error(err);
  if(conn) conn.close(function() { process.exit(1); });
}

function on_connect(err, conn) {
  if(err !== null) return bail(err);

  var q = 'task_queue';

  conn.createChannel(function(err, ch){
    if(err !== null) return bail(err, conn);
    ch.assertQueue(q, {durable: true}, function(err, _ok) {
      if(err !== null) return bail(err, conn);
      for(var i = 1; i <= 10; i++) {
        var msg = i;
        ch.sendToQueue(q, new Buffer(msg), {persistent: true});
        console.log(" [x] Sent '%s'", msg);
      }
      /*
      var msg = process.argv.slice(2).join(' ') || "Hello World!";
      ch.sendToQueue(q, new Buffer(msg), {persistent: true});
      console.log(" [x] Sent '%s'", msg);
      */
      ch.close(function() { conn.close(); })
    });
  });
}

amqp.connect('amqp://localhost', on_connect);
