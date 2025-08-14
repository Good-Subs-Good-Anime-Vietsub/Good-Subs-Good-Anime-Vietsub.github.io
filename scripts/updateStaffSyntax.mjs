import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const membersFilePath = path.join(process.cwd(), 'src/data/members.json');
const projectsDirPath = path.join(process.cwd(), 'src/content/projects');

// Custom stringify function to prevent arrays from being created for single-line strings
const customStringify = (data) => {
  return yaml.dump(data, {
    styles: {
      '!!str': 'literal',
    },
    lineWidth: -1,
  });
};

async function updateProjectFiles() {
  try {
    const membersFileContent = await fs.readFile(membersFilePath, 'utf8');
    const members = JSON.parse(membersFileContent);
    const linkableMembers = new Set(
      members.filter(m => m.githubUrl && m.githubUrl.trim() !== '').map(m => m.name)
    );

    const projectFolders = await fs.readdir(projectsDirPath, { withFileTypes: true });

    for (const dirent of projectFolders) {
      if (dirent.isDirectory()) {
        const mdxFilePath = path.join(projectsDirPath, dirent.name, 'index.md');

        try {
          const fileContent = await fs.readFile(mdxFilePath, 'utf8');
          const { data: frontmatter, content } = matter(fileContent);

          if (!frontmatter.staffs || !Array.isArray(frontmatter.staffs)) {
            continue;
          }

          let hasChanged = false;
          frontmatter.staffs.forEach(staff => {
            let currentName = staff.name;
            // Handle case where name is an array
            if (Array.isArray(currentName)) {
              currentName = currentName.join(', ');
            }

            if (typeof currentName !== 'string') {
              return;
            }
            
            const originalName = currentName;

            // Clean up the string: remove existing brackets, quotes, and then split
            const names = currentName
              .replace(/\[|\]/g, '')
              .replace(/'/g, '')
              .split(',')
              .map(n => n.trim())
              .filter(n => n); // Remove empty strings

            const newNames = names.map(name => {
              // Check for linkable members and wrap with brackets
              if (linkableMembers.has(name)) {
                return `[${name}]`;
              }
              return name;
            });

            const newNameString = newNames.join(', ');

            if (newNameString !== originalName) {
              staff.name = newNameString;
              hasChanged = true;
            }
          });

          if (hasChanged) {
            // Use a custom stringify function to ensure correct YAML output
            const newContent = `---
${customStringify(frontmatter)}---
${content}`;
            await fs.writeFile(mdxFilePath, newContent, 'utf8');
            console.log(`Updated: ${mdxFilePath}`);
          }
        } catch (err) {
          // Ignore if file doesn't exist
          if (err.code !== 'ENOENT') {
            console.error(`Error processing file ${mdxFilePath}:`, err);
          }
        }
      }
    }
    console.log('Finished updating project files.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

updateProjectFiles();
