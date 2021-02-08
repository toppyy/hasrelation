
# Demo app for network "analysis"


Exeample running in [Heroku](http://hasrelation.herokuapp.com).

For example, to see if *1* and *2376* are have relation in the network, query: 
`http://hasrelation.herokuapp.com/hasrelation/1/2376`

This should return
```json
{"from":"1","to":"2376","hasRelation":{"result":true,"distance":41}}
```
meaning that they are related. The distance is **not** necessarily the minimum distance.