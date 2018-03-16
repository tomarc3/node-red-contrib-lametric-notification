module.exports = function(RED) {
  function LametricSendNotificationNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {

      // create LaMetric notification body. check API reference for details: 
      // http://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html
      //
      // {
      //   "priority": "[info|warning|critical]",
      //   "icon_type":"[none|info|alert]",
      //   "lifeTime":<milliseconds>,
      //   "model": {
      //    "frames": [
      //     {
      //        "icon":"<icon id or base64 encoded binary>",
      //        "text":"<text>"
      //     },
      //     {
      //       "icon":"i298",
      //       "text":"text"
      //     },
      //     {
      //         "icon":"i120",
      //         "goalData":{
      //             "start": 0,
      //             "current": 50,
      //             "end": 100,
      //             "unit": "%"
      //         }
      //     },
      //     {
      //         "chartData": [ <comma separated integer values> ]
      //     }
      //     ],
      //     "sound": {
      //       "category":"[alarms|notifications]",
      //         "id":"<sound_id>",
      //         "repeat":<repeat count>
      //     },
      //     "cycles":<cycle count>
      //   }
      // }

      var notification = {
        // "priority": "critical",
        // "icon_type": "alert",
        "model": {
            "frames": [
                {
                    "icon": "i555",
                    "text": msg.payload
                }
            ],
            "sound": {
                "category": "alarms",
                "id": "alarm3",
                "repeat": 1
            },
            "cycles": 0
        }
      };
      if (config.priority != "default") notification.priority = config.priority;
      if (config.icon != "default") notification.icon_type = config.icon;
      this.debug(notification);

      var notificationString = JSON.stringify(notification);

      // define http request options
      var username = 'dev';
      var password = config.apikey;
      var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
      var options = {
        hostname: config.host,  
        port: 8080,
        path: '/api/v2/device/notifications',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(notificationString),
            'Accept': 'applciation/json',
            'Authorization': auth
        }
      };
      this.debug(options);

      // create http client
      var http = require('http');

      // create http request and attach response callback
      var req = http.request(options, function(res) {
        node.warn('Status: ' + res.statusCode);
        node.warn('Headers: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (body) {
          node.warn('Body: ' + body);
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
  RED.nodes.registerType("send-notification",LametricSendNotificationNode);
}
