# reneos.auth
Applications for authorization and user authentication, optimized for microservices architecture.

How to use:
- install node.js
- clone repo
- use "npm i"
- edit /config.js
- edit /configs/default.config.js
- run "node."

On russian https://habr.com/ru/post/591319/

Request processing queue configurations define the stages of request processing. In the "workers" folder, each script is a link in the processing chain. The result returned from each "link" is passed to the next "link". If the "link" did not return a result (or returned null), processing ends.
You can make "links" in any order in a "chain". If you have not found the required processing option - write your "link".
