
# Demo app for network "analysis"


Exeample running in [Heroku](http://hasrelation.herokuapp.com).

For example, to see if *7* and *9876* are have relation in the network, query: 
`http://hasrelation.herokuapp.com/hasrelation/7/9876`

This should return
```json
{"from":"7","to":"9876","hasRelation":{"result":true,"distance":489}}
```
meaning that they are related. The distance is **not** necessarily the minimum distance.