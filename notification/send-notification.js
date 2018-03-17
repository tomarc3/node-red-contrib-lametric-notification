module.exports = function(RED) {
  function LametricSendNotificationNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {

      // create LaMetric notification body. check API reference for details: 
      // http://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html
      var notification = {
        "model": {
            "frames": [
                {
                    "text": msg.payload
                }
            ],
        }
      };
      if (config.priority != "default") notification.priority = config.priority;
      if (config.icontype != "default") notification.icon_type = config.icontype;
      if (config.lifetime.length > 0) notification.lifeTime = Number(config.lifetime);
      if (config.icon.length > 0) notification.model.frames[0].icon = config.icon;
      if (config.soundId != "none") {
        var sound = {};
        sound.category = (config.soundId.startsWith("alarm")) ? "alarms" : "notifications";
        sound.id = config.soundId;
        sound.repeat = Number(config.soundRepeat);
        notification.model.sound = sound;
      }
      if (config.cycles.length > 0) notification.model.cycles = Number(config.cycles);
      var notificationString = JSON.stringify(notification);
      this.log(notificationString);

      // define http request options
      var options = {
        hostname: config.host,  
        port: 8080,
        path: '/api/v2/device/notifications',
        method: 'POST',
        auth: 'dev:' + this.credentials.apikey,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(notificationString),
            'Accept': 'applciation/json'
        }
      };
      this.log(JSON.stringify(options));

      // create http client
      var http = require('http');

      // create http request and attach response callback
      var req = http.request(options, function(res) {
        node.log('Status: ' + res.statusCode);
        node.log('Headers: ' + JSON.stringify(res.headers));

        // eval http error code
        if (res.statusCode == 401) {
          node.warn('Client error: Unathorized --> Invalid API Key!')
        } else if (res.statusCode >= 400 && res.statusCode < 500) {
          node.warn('Client error: ' + res.statusCode);
        } else if (res.statusCode >= 500 && res.statusCode < 600) {
          node.warn('Client error: ' + res.statusCode);
        }

        // eval LaMetric Time response
        res.setEncoding('utf8');
        res.on('data', function (body) {
          node.log('Body: ' + body);
        });
      });
      req.on('error', function(e) {
        node.error('problem with request: ' + e.message);
      });      
      
      // write data to request body and send request
      req.write(notificationString);
      req.end();
    });
  }
  RED.nodes.registerType("send-notification",LametricSendNotificationNode,{
    credentials: {
        apikey: {type:"password"}
    }
  });
}
