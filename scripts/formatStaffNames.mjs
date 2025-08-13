import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const projectsDir = './src/content/projects';

async function formatStaffNames() {
  try {
    const projectFolders = await readdir(projectsDir, { withFileTypes: true });

    for (const folder of projectFolders) {
      if (folder.isDirectory()) {
        const mdxFilePath = join(projectsDir, folder.name, 'index.mdx');
        try {
          let content = await readFile(mdxFilePath, 'utf8');
          let modified = false;

          // Use a regex to find 'name: [SomeName]' and wrap it in single quotes if not already
          // This regex looks for 'name: ' followed by an optional space, then an opening bracket,
          // then any characters (non-greedy), then a closing bracket.
          // It specifically avoids matching if the content is already quoted.
          content = content.replace(/^(.*name: )(?!\s*['"])(.*\[.*?\])(.*)$/gm, (match, p1, p2, p3) => {
            modified = true;
            return `${p1}'${p2}'${p3}`;
          });

          if (modified) {
            await writeFile(mdxFilePath, content, 'utf8');
            console.log(`Formatted staff names in: ${mdxFilePath}`);
          }
        } catch (readError) {
          if (readError.code === 'ENOENT') {
            // console.log(`Skipping non-existent file: ${mdxFilePath}`);
          } else {
            console.error(`Error reading or processing ${mdxFilePath}:`, readError);
          }
        }
      }
    }
    console.log('Staff name formatting complete.');
  } catch (dirError) {
    console.error('Error reading projects directory:', dirError);
  }
}

formatStaffNames();
