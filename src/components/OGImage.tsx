import { h } from 'preact';

interface Props {
  title: string;
  coverImage: string;
  status?: string;
  studios?: string;
  seasonYear?: number;
}

export default function OGImage({
  title,
  coverImage,
  status,
  studios,
  seasonYear,
}: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '1200px',
        height: '630px',
        fontFamily: '"Inter"',
        color: 'white',
        backgroundColor: '#111',
      }}
    >
      {/* Left Panel with Blurred BG */}
      <div style={{
        display: 'flex',
        width: '60%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Blurred BG Image */}
        <img
          src={coverImage}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px) brightness(0.6)',
          }}
        />
        {/* Content */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
          padding: '60px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
          {/* Top Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '28px', color: '#d4d4d8', fontWeight: 500 }}>
              {studios}{seasonYear && ` • ${seasonYear}`}
            </p>
            <h1 style={{
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              display: '-webkit-box',
              '-webkit-line-clamp': 3,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {title}
            </h1>
          </div>

          {/* Bottom Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <p style={{ fontSize: '38px', color: '#e4e4e7', fontWeight: 500 }}>
              Vietsub • {status}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '16px' }}>
              <img src="https://gsga.moe/GSGA-logo.png" width={48} height={48} style={{ borderRadius: '8px' }} />
              <span style={{ fontSize: '32px', fontWeight: 700 }}>GSGA Fansub</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Clear Cover Image */}
      <div style={{
        width: '40%',
        height: '100%',
        display: 'flex',
      }}>
        <img
          src={coverImage}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}