set -e
if [ -z "$CI_PULL_REQUEST" ]
then
  - ./node_modules/karma/bin/karma start
  - cat coverage/lcov.info | node_modules/.bin/coveralls || echo "Coveralls upload failed"
   - node node_modules/lcov-filter/index.js lcov.info config | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage
else
  npm test
fi
