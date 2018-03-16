# node-red-contrib-lametric-notification

This module provides [Node-RED](https://nodered.org/) nodes to display notifications on a [LaMetric Time](https://lametric.com/) device using the [Notifications API](http://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html).


## "Hello World!" example flow
```javascript
[{"id":"24ea3a78.d4614e","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"7e99a1b3.0c963","type":"send-notification","z":"24ea3a78.d4614e","name":"","host":"192.168.1.xxx","apikey":"xxx","priority":"critical","icon":"alert","x":470,"y":80,"wires":[]},{"id":"89e44901.619178","type":"inject","z":"24ea3a78.d4614e","name":"","topic":"","payload":"Hello World!","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":170,"y":80,"wires":[["7e99a1b3.0c963"]]}]```
