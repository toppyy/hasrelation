
# Demo app for network "analysis"


Exeample running in [Heroku](http://hasrelation.herokuapp.com).

For example, to see if *6* and *2376* are have relation in the network, query: 
`http://hasrelation.herokuapp.com/hasrelation/6/2376`

This should return
```json
{"from":"6","to":"2376","hasRelation":{"result":true,"distance":104}}
```
meaning that they are related. The distance is **not** necessarily the minimum distance.