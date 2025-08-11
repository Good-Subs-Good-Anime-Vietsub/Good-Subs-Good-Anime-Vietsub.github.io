import { h, type FunctionComponent } from 'preact';
import type { Status } from '../utils/project';

interface StatusIconProps extends h.JSX.SVGAttributes<SVGSVGElement> {
  status: Status;
}

const StatusIcon: FunctionComponent<StatusIconProps> = ({ status, ...props }) => {
  if (status === 'Tất cả') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fill-rule="evenodd" d="M2.25 4.5A.75.75 0 013 3.75h18a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM3 7.5a.75.75 0 000 1.5h18a.75.75 0 000-1.5H3zM3.75 12a.75.75 0 01.75-.75h18a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zM3 15.75a.75.75 0 000 1.5h18a.75.75 0 000-1.5H3zM3.75 19.5a.75.75 0 01.75-.75h18a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
      </svg>
    );
  }

  switch (status) {
    case 'Đang làm':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" />
        </svg>
      );
    case 'Hoàn thành':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
        </svg>
      );
    case 'Dự kiến':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
        </svg>
      );
    case 'Tạm ngưng':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0V8.25zm6.75 0a.75.75 0 00-1.5 0v7.5a.75.75 0 001.5 0V8.25z" clip-rule="evenodd" />
        </svg>
      );
    default:
      return null;
  }
};

export default StatusIcon;
