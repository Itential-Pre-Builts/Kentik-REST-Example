/**
 * THIS SCRIPT IS GITLAB SPECIFIC
 * 
 * @description This script is intended to be run in a pipeline before deployment to NPM.
 * The script will replace any relative image links for <img> tags in README with links
 * to the absolute path of the raw file on GitLab for the provided branch.
 */

const path = require('path');
const fs = require('fs');

const url = process.argv[2];
const branch = process.argv[3];
const src = path.join(path.resolve(__dirname, '..'), 'README.md');

if (!url || !branch) {
  console.error('ERROR: Failed to provide repo information!\n');
  process.exit(1);
}

try {
  const readme = fs.readFileSync(src, 'utf-8');

  const repl = readme.replace(/(<img.*)(images\/.*>)/g, (match, p1, p2, offset, str) => {
    const suffix = `${url}/raw/${branch}/${p2}`;

    if (match.includes(url)) {
      // split is used to get the prefix before the URL, e.g. <img style="width: 400px;" src="
      // then reconstruct string using whatever branch name is provided
      return `${p1.split(url)[0]}${suffix}`;
    }

    return `${p1}${suffix}`;
  });

  fs.writeFileSync(src, repl);
} catch (error) {
  console.error(error);
  process.exit(1);
}
