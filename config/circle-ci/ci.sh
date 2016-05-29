set -e
if [ -z "$CI_PULL_REQUEST" ]
then
  npm run test
else
  npm run test
fi
