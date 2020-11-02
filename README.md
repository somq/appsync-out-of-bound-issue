# appsync-out-of-bound

```sh
yarn
sls offline start
# $ sls offline start
# Serverless: Configuration warning:
# Serverless:   at 'service': unrecognized property 'publish'
# Serverless:   at 'resources': unrecognized property 'UserTable'
# Serverless:   at 'resources': unrecognized property 'TweetsTable'
# Serverless:   at 'resources': unrecognized property 'AppSyncDynamoDBServiceRole'
# Serverless:   at 'resources': unrecognized property 'AppSyncLambdaServiceRole'
# Serverless:   at 'resources': unrecognized property 'AppSyncESServiceRole'
# Serverless:
# Serverless: Learn more about configuration validation here: http://slss.io/configuration-validation
# Serverless:
# Serverless: Bundling with Webpack...
# Time: 499ms
#      Asset     Size  Chunks             Chunk Names
# handler.js  11.2 kB       0  [emitted]  handler
#    [0] ./handler.js 8.37 kB {0} [built]
#    [1] external "babel-polyfill" 42 bytes {0} [not cacheable]
#    [2] external "oauth" 42 bytes {0} [not cacheable]
#    [3] external "twitter" 42 bytes {0} [not cacheable]
# Serverless: Watching for changes...
# Index 0 is out of bound.
# AppSync Simulator: Index 0 is out of bound.
# offline: Starting Offline: dev/us-east-1.
# offline: Offline [http for lambda] listening on http://localhost:3002
# offline: Function names exposed for local invocation by aws-sdk:
#            * graphql: appsync-example-dev-graphql
```
