// File: scripts/generate-search-data.mjs (Bản Hoàn chỉnh Cuối cùng)
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function getDataFromMd(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const frontmatterMatch = content.match(/---([\s\S]*?)---/);
    if (!frontmatterMatch || !frontmatterMatch[1]) return null; // Đảm bảo lấy nhóm capture thứ nhất
    const frontmatterContent = frontmatterMatch[1]; // Lấy nội dung frontmatter là một chuỗi
    const data = {};

    const extractMatch = (regex, type = 'string') => {
      const match = frontmatterContent.match(regex);
      if (match && match[1]) { // Đảm bảo lấy nhóm capture thứ nhất
        if (type === 'number') return parseInt(match[1], 10);
        if (type === 'boolean') return match[1] === 'true';
        return match[1];
      }
      return undefined;
    };

    data.mal_id = extractMatch(/mal_id:\s*(\d+)/, 'number');
    data.viet_title = extractMatch(/viet_title:\s*"(.*?)"/);
    data.status = extractMatch(/status:\s*"(.*?)"/);
    data.featured = extractMatch(/featured:\s*(true|false)/, 'boolean');
    data.banner_image = extractMatch(/banner_image:\s*"(.*?)"/); // Thêm dòng này để đọc banner_image

    const slug = path.basename(path.dirname(filePath));
    data.slug = slug;

    // Tự động tìm banner.jpg/png/jpeg/webp trong cùng thư mục nếu không có trong frontmatter
    if (!data.banner_image) {
      const animeDir = path.dirname(filePath);
      const possibleBannerNames = ['banner.jpg', 'banner.png', 'banner.jpeg', 'banner.webp'];
      for (const bannerName of possibleBannerNames) {
        const bannerPath = path.join(animeDir, bannerName);
        try {
          await fs.access(bannerPath); // Kiểm tra xem file có tồn tại không
          data.banner_image = `/anime/${data.slug}/${bannerName}`; // Đảm bảo đường dẫn đầy đủ
          break; // Tìm thấy một file, thoát vòng lặp
        } catch (e) {
          // File không tồn tại, tiếp tục tìm kiếm
        }
      }
    }
    
    return data;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    console.error(`Error reading file: ${filePath}`, error);
    return null;
  }
}

async function fetchWithRetry(url, retries = 9, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise(res => setTimeout(res, 500));
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          console.warn(`  - Rate limited. Retrying in ${delay / 1000}s...`);
          await new Promise(res => setTimeout(res, delay));
          continue;
        }
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.warn(`  - Fetch failed. Retrying... (${i + 1}/${retries})`);
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const animeContentDir = path.join(projectRoot, 'src', 'content', 'anime');
const cacheDir = path.join(__dirname, '.api-cache');

const shouldForceRefresh = process.argv.includes('--force-refresh');

console.log('Generating full dataset (with caching)...');
if (shouldForceRefresh) {
  console.log('Force refresh requested: Clearing API cache...');
  await fs.rm(cacheDir, { recursive: true, force: true });
}
await fs.mkdir(cacheDir, { recursive: true });

const animeDirs = await fs.readdir(animeContentDir);
const localAnimeFiles = (await Promise.all(
  animeDirs.map(dir => getDataFromMd(path.join(animeContentDir, dir, 'index.md')))
)).filter(Boolean);

const allApiData = [];
for (const localFile of localAnimeFiles) {
  if (!localFile.mal_id) continue;
  
  console.log(`\nProcessing MAL ID: ${localFile.mal_id} (${localFile.slug})`);
  const cacheFile = path.join(cacheDir, `${localFile.mal_id}.json`);
  try {
    let apiResponse = null;
    let cachedData = null; // Khai báo một lần duy nhất

    try {
        cachedData = await fs.readFile(cacheFile, 'utf-8');
        apiResponse = JSON.parse(cachedData);
        console.log(`  - [Cache Found] Using cached data for MAL ID: ${localFile.mal_id}.`);
    } catch (e) {
        console.log(`  - [No Cache] No existing data in cache for MAL ID: ${localFile.mal_id}. Fetching from API...`);
        try {
            apiResponse = await fetchWithRetry(`https://api.jikan.moe/v4/anime/${localFile.mal_id}`);
            await fs.writeFile(cacheFile, JSON.stringify(apiResponse, null, 2));
            console.log(`  - Saved NEW data to cache for MAL ID: ${localFile.mal_id}.`);
        } catch (error) { // Đã xóa kiểu 'any'
            console.error(`  - FAILED to fetch NEW data for MAL ID: ${localFile.mal_id}. Reason: ${error.message}`);
        }
    }
    
    if (apiResponse && apiResponse.data) {
        // Đảm bảo trường 'year' được cập nhật chính xác cho cả searchData và detailsData
        apiResponse.data.year = apiResponse.data.year || apiResponse.data.aired?.prop?.from?.year || null;
        allApiData.push({ localData: localFile, apiData: apiResponse.data });
    } else {
        console.error(`  - FINAL FAILED to get valid data for MAL ID: ${localFile.mal_id}.`);
    }
  } catch(error) {
      console.error(`  - FAILED to process MAL ID: ${localFile.mal_id}. Reason: ${error.message}`);
  }
}

const searchData = [];
const detailsData = {};
for (const item of allApiData) {
  const { localData, apiData } = item;
  
  // Dữ liệu cho tìm kiếm và trang chủ
  searchData.push({
    slug: localData.slug,
    href: `/anime/${localData.slug}`,
    title: apiData.title,
    smallImageUrl: apiData.images.webp.image_url,
    largeImageUrl: apiData.images.webp.large_image_url,
    banner_image: localData.banner_image || undefined, // Thêm banner_image vào searchData
    status: localData.status,
    score: apiData.score,
    year: apiData.year || apiData.aired?.prop?.from?.year || null,
    featured: localData.featured || false,
    synopsis: apiData.synopsis || '',
    viet_title: localData.viet_title || '',
    studios: apiData.studios.map(s => s.name),
    genres: apiData.genres.map(g => g.name),
  });
  
  // Dữ liệu cho trang chi tiết
  detailsData[localData.slug] = apiData;
  if (localData.banner_image) {
    detailsData[localData.slug].banner_image = localData.banner_image; // Đảm bảo banner_image cũng có sẵn trong detailsData
  }
}

const outputDir = path.join(projectRoot, 'public', 'data');
await fs.mkdir(outputDir, { recursive: true });

const searchOutputFile = path.join(outputDir, 'search-data.json');
await fs.writeFile(searchOutputFile, JSON.stringify(searchData, null, 2));

const detailsOutputFile = path.join(outputDir, 'anime-details.json');
await fs.writeFile(detailsOutputFile, JSON.stringify(detailsData, null, 2));

console.log(`\nSuccessfully generated data for ${allApiData.length} out of ${localAnimeFiles.length} animes.`);
