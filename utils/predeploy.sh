#!/bin/bash
set -e

README=README.md
if [ -n "$CI_COMMIT_REF_NAME" ]; then
  CURRENT_BRANCH=$CI_COMMIT_REF_NAME
else
  CURRENT_BRANCH=$CI_DEFAULT_BRANCH
fi

# generate image links in README.md that point to raw images in current release branch / master
npm run generateImageLinks -- $CI_PROJECT_URL $CURRENT_BRANCH

if [[ $(git status | grep $README) ]]; then
  echo "$README changed!"
  # set up git using Argo
  git_setup
  git checkout $CURRENT_BRANCH
  git add $README && git commit -m "updated image links for $README"
  if git push origin $CURRENT_BRANCH --follow-tags --no-verify; then
    echo "Changes to $README pushed."
  else
    echo "ERROR: Failed to push changes to $README."
    exit 1
  fi
fi