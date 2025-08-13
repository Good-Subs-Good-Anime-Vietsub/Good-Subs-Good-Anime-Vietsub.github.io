import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import yaml from 'js-yaml'; // Import js-yaml

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANILIST_CACHE_PATH = path.resolve(__dirname, '../src/data/anilist-cache.json');
const PROJECTS_CONTENT_PATH = path.resolve(__dirname, '../src/content/projects');

const query = `
  query ($ids: [Int]) {
    Page(page: 1, perPage: 100) {
      media(id_in: $ids, type: ANIME, sort: SEARCH_MATCH) {
        id
        title { romaji native english }
        coverImage { extraLarge }
        bannerImage
        startDate { year }
        seasonYear
        format
        episodes
        duration
        averageScore
        source
        genres
        studios(isMain: true) { nodes { name siteUrl } }
        staff(sort: RELEVANCE, perPage: 5) {
          edges {
            role
            node { name { full } siteUrl }
          }
        }
      }
    }
  }
`;

async function fetchAnilistData() {
  console.log('Fetching AniList data...');
  try {
    const projectDirs = await fs.readdir(PROJECTS_CONTENT_PATH, { withFileTypes: true });
    const allAniListIds = [];

    for (const dirEntry of projectDirs) {
      if (dirEntry.isDirectory()) {
        const indexPath = path.join(PROJECTS_CONTENT_PATH, dirEntry.name, 'index.md');
        try {
          const fileContent = await fs.readFile(indexPath, 'utf-8');
          const frontmatterMatch = fileContent.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
          if (frontmatterMatch && frontmatterMatch[1]) {
            const frontmatter = yaml.load(frontmatterMatch[1]);
            if (frontmatter && typeof frontmatter.anilistId === 'number' && !isNaN(frontmatter.anilistId)) {
              allAniListIds.push(frontmatter.anilistId);
            }
          }
        } catch (readError) {
          console.warn(`Could not read or parse frontmatter for ${indexPath}:`, readError.message);
        }
      }
    }

    if (allAniListIds.length === 0) {
      console.log('No AniList IDs found in local projects. Skipping API fetch.');
      await fs.mkdir(path.dirname(ANILIST_CACHE_PATH), { recursive: true });
      await fs.writeFile(ANILIST_CACHE_PATH, JSON.stringify({}), 'utf-8');
      return;
    }

    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ query, variables: { ids: allAniListIds } })
    });

    if (!response.ok) {
      throw new Error(`AniList API responded with status ${response.status}: ${response.statusText}`);
    }

    const anilistResult = await response.json();

    if (anilistResult.errors) {
      console.error("Errors from AniList API:", anilistResult.errors);
      throw new Error("AniList API returned errors.");
    }

    const anilistDataMap = new Map(anilistResult.data.Page.media.map(item => [item.id, item]));

    // Convert Map to a plain object for JSON serialization
    const dataToCache = Object.fromEntries(anilistDataMap);

    await fs.mkdir(path.dirname(ANILIST_CACHE_PATH), { recursive: true });
    await fs.writeFile(ANILIST_CACHE_PATH, JSON.stringify(dataToCache, null, 2), 'utf-8');
    console.log(`AniList data cached successfully to ${ANILIST_CACHE_PATH}`);
  } catch (error) {
    console.error('Error fetching or caching AniList data:', error);
    // Exit with a non-zero exit code to indicate failure, preventing the CI from proceeding with a bad build.
    // Do not write an empty file, so the old cache can be used as a fallback.
    console.error('Failed to fetch AniList data. The existing cache (if any) will be used. Aborting script.');
    process.exit(1);
  }
}

fetchAnilistData();
