
# Demo app for network "analysis"


Exeample running in [Heroku](http://networkdemo.herokuapp.com).

# Are two nodes connected?

To see if *7* and *9876* are have relation in the network, query: 
`http://networkdemo.herokuapp.com/hasrelation/7/9876`

This should return
```json
{"from":"9876","to":"7","hasRelation":true,"distance":4}
```
meaning that they are related and the distance between nodes is 4.

# What nodes are connected to x?

To see what nodes are connect to node *7*, query: 
`http://networkdemo.herokuapp.com/related/7/`


To see what nodes are connect to node *7* with a maximum distance of 2 edges: 
`http://networkdemo.herokuapp.com/related/7/2`

