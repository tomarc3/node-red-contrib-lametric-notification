# node-red-contrib-lametric-notification

This module provides [Node-RED](https://nodered.org/) nodes to display notifications on a [LaMetric Time](https://lametric.com/) device using the [Notifications API](http://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html).


## "Hello World!" example flow
```javascript
[{"id":"24ea3a78.d4614e","type":"tab","label":"LaMetric Notification","disabled":false,"info":""},{"id":"7e99a1b3.0c963","type":"send-notification","z":"24ea3a78.d4614e","name":"","host":"192.168.1.51","priority":"critical","icontype":"alert","lifetime":"","icon":"i555","soundId":"alarm3","soundRepeat":"1","cycles":"0","x":430,"y":80,"wires":[]},{"id":"89e44901.619178","type":"inject","z":"24ea3a78.d4614e","name":"","topic":"","payload":"Alarm Example","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":80,"wires":[["7e99a1b3.0c963"]]},{"id":"a11c82ba.1272d8","type":"inject","z":"24ea3a78.d4614e","name":"","topic":"","payload":"Warning Example","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":160,"wires":[["f3e0952a.018d68"]]},{"id":"f3e0952a.018d68","type":"send-notification","z":"24ea3a78.d4614e","name":"","host":"192.168.1.51","priority":"warning","icontype":"alert","lifetime":"","icon":"i1077","soundId":"alarm4","soundRepeat":"1","cycles":"","x":430,"y":160,"wires":[]},{"id":"e70c7d40.a72ff","type":"send-notification","z":"24ea3a78.d4614e","name":"","host":"192.168.1.51","priority":"info","icontype":"info","lifetime":"","icon":"i620","soundId":"notification","soundRepeat":"1","cycles":"","x":430,"y":240,"wires":[]},{"id":"359c4a67.ee3a96","type":"inject","z":"24ea3a78.d4614e","name":"","topic":"","payload":"Info Example","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":170,"y":240,"wires":[["e70c7d40.a72ff"]]}]
```

# Changelog

#### 0.1.2 (2018-10-04)
* (Tom) extended error logs: The error message body will be logged. This fixes [issue #4](https://github.com/tomarc3/node-red-contrib-lametric-notification/issues/4).

#### 0.1.1 (2018-09-02)
* (Tom) fixed [issue #1 Client error: 400](https://github.com/tomarc3/node-red-contrib-lametric-notification/issues/1).

#### 0.1.0 (2018-03-17)
* (Tom) initial release.

#### 0.0.0 
* (Tom) not ready yet!
