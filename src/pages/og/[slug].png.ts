import { ImageResponse } from '@vercel/og';
import { getCollection } from 'astro:content';
import anilistCache from '../../data/anilist-cache.json';
import type { AnilistCache } from '../../types/anilist-cache';
import OGImage from '../../components/OGImage';
import { h } from 'preact';

export const prerender = true;

// Get all projects for the image routes
const projects = await getCollection('projects');

// Map projects to a simpler object for the OG image generator
const pages = Object.fromEntries(
  projects.map((project) => [project.slug, project])
);

// Fetch font data
const fontRegularData = await fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff'
).then((res) => res.arrayBuffer());
const fontBoldData = await fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff'
).then((res) => res.arrayBuffer());

export async function GET({ params }: { params: { slug: string } }) {
  const project = pages[params.slug];

  if (!project) {
    return new Response('Not found', { status: 404 });
  }

  const anilistData = ((anilistCache as unknown) as AnilistCache)[String(project.data.anilistId)];
  const title = anilistData?.title?.romaji || project.data.title_vietnamese || 'Untitled Project';
  const coverImage = anilistData?.coverImage?.extraLarge || '';
  const seasonYear = anilistData?.seasonYear;
  const status = project.data.status;
  const studios = anilistData?.studios?.nodes?.map(s => s.name).join(', ');

  // @ts-ignore
  const imageElement = h(OGImage, {
    title,
    coverImage,
    seasonYear,
    status,
    studios,
  });

  return new ImageResponse(
    imageElement,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontRegularData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: fontBoldData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}

export async function getStaticPaths() {
  return projects.map((project) => ({
    params: { slug: project.slug },
  }));
}