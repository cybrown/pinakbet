set -e
if [ -z "$CI_PULL_REQUEST" ]
then
  npm run test
  cat coverage/lcov.info | node_modules/.bin/coveralls || echo "Coveralls upload failed"
else
  npm run test
fi
