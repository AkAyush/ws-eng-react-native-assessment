#!/bin/bash

# Stage and commit all changes (including untracked files)
git add --all
git commit --allow-empty -am "chore(conduit): Generates patch."

# Generate the diff
NAME=$(git config user.name | sed s/[^[:alnum:]+._-]//g)
git diff b6fa5f078c312cc68e8c78634f1d3c7c5b23c491 5fe866a325d1d7b29297ae3aa659b3784400d005 -- . ':!*.patch' ':!yarn.lock' ':!package-lock.json' ':!**/tsconfig*.json' > "submission_${NAME:-code}.patch"
