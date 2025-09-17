import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

interface Platform {
  name: string;
  href: string;
  icon: ReactElement;
  available: boolean;
}

const platforms: Record<string, Platform> = {
  mac: {
    name: 'Download for Mac',
    href: 'https://github.com/pybash1/board',
    available: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    )
  },
  android: {
    name: 'Download for Android',
    href: 'https://github.com/pybash1/board',
    available: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zM20.5 8c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
      </svg>
    )
  },
  windows: {
    name: 'Windows - Coming Soon',
    href: '#',
    available: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
      </svg>
    )
  },
  ios: {
    name: 'iOS - Coming Soon',
    href: '#',
    available: false,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    )
  },
  linux: {
    name: 'Linux - Coming Soon',
    href: '#',
    available: false,
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        id="Linux--Streamline-Simple-Icons"
        height="20"
        width="20"
      >
        <path
          d="M12.504 0c-0.155 0 -0.315 0.008 -0.48 0.021 -4.226 0.333 -3.105 4.807 -3.17 6.298 -0.076 1.092 -0.3 1.953 -1.05 3.02 -0.885 1.051 -2.127 2.75 -2.716 4.521 -0.278 0.832 -0.41 1.684 -0.287 2.489a0.424 0.424 0 0 0 -0.11 0.135c-0.26 0.268 -0.45 0.6 -0.663 0.839 -0.199 0.199 -0.485 0.267 -0.797 0.4 -0.313 0.136 -0.658 0.269 -0.864 0.68 -0.09 0.189 -0.136 0.394 -0.132 0.602 0 0.199 0.027 0.4 0.055 0.536 0.058 0.399 0.116 0.728 0.04 0.97 -0.249 0.68 -0.28 1.145 -0.106 1.484 0.174 0.334 0.535 0.47 0.94 0.601 0.81 0.2 1.91 0.135 2.774 0.6 0.926 0.466 1.866 0.67 2.616 0.47 0.526 -0.116 0.97 -0.464 1.208 -0.946 0.587 -0.003 1.23 -0.269 2.26 -0.334 0.699 -0.058 1.574 0.267 2.577 0.2 0.025 0.134 0.063 0.198 0.114 0.333l0.003 0.003c0.391 0.778 1.113 1.132 1.884 1.071 0.771 -0.06 1.592 -0.536 2.257 -1.306 0.631 -0.765 1.683 -1.084 2.378 -1.503 0.348 -0.199 0.629 -0.469 0.649 -0.853 0.023 -0.4 -0.2 -0.811 -0.714 -1.376v-0.097l-0.003 -0.003c-0.17 -0.2 -0.25 -0.535 -0.338 -0.926 -0.085 -0.401 -0.182 -0.786 -0.492 -1.046h-0.003c-0.059 -0.054 -0.123 -0.067 -0.188 -0.135a0.357 0.357 0 0 0 -0.19 -0.064c0.431 -1.278 0.264 -2.55 -0.173 -3.694 -0.533 -1.41 -1.465 -2.638 -2.175 -3.483 -0.796 -1.005 -1.576 -1.957 -1.56 -3.368 0.026 -2.152 0.236 -6.133 -3.544 -6.139zm0.529 3.405h0.013c0.213 0 0.396 0.062 0.584 0.198 0.19 0.135 0.33 0.332 0.438 0.533 0.105 0.259 0.158 0.459 0.166 0.724 0 -0.02 0.006 -0.04 0.006 -0.06v0.105a0.086 0.086 0 0 1 -0.004 -0.021l-0.004 -0.024a1.807 1.807 0 0 1 -0.15 0.706 0.953 0.953 0 0 1 -0.213 0.335 0.71 0.71 0 0 0 -0.088 -0.042c-0.104 -0.045 -0.198 -0.064 -0.284 -0.133a1.312 1.312 0 0 0 -0.22 -0.066c0.05 -0.06 0.146 -0.133 0.183 -0.198 0.053 -0.128 0.082 -0.264 0.088 -0.402v-0.02a1.21 1.21 0 0 0 -0.061 -0.4c-0.045 -0.134 -0.101 -0.2 -0.183 -0.333 -0.084 -0.066 -0.167 -0.132 -0.267 -0.132h-0.016c-0.093 0 -0.176 0.03 -0.262 0.132a0.8 0.8 0 0 0 -0.205 0.334 1.18 1.18 0 0 0 -0.09 0.4v0.019c0.002 0.089 0.008 0.179 0.02 0.267 -0.193 -0.067 -0.438 -0.135"
          fill="#FFFFFF"
          strokeWidth="1"
        />
      </svg>
    )
  }
};

function detectPlatform(): string {
  if (typeof window === 'undefined') return 'mac';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('mac')) return 'mac';
  if (userAgent.includes('android')) return 'android';
  if (userAgent.includes('windows') || userAgent.includes('win32') || userAgent.includes('win64')) return 'windows';
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios';
  if (userAgent.includes('linux')) return 'linux';
  
  return 'mac';
}

export default function PlatformDownloadButton() {
  const [currentPlatform, setCurrentPlatform] = useState<string>('mac');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCurrentPlatform(detectPlatform());
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const platform = platforms[currentPlatform];
  const baseClasses = "rounded-full px-4 md:px-6 py-2 md:py-3 font-medium transition ease-in-out duration-500 flex items-center gap-2 text-sm md:text-base justify-center";
  
  if (platform.available) {
    return (
      <a
        href={platform.href}
        className={`${baseClasses} bg-black text-white hover:bg-black/80`}
      >
        {platform.icon}
        {platform.name}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} bg-gray-400 text-white cursor-not-allowed`}
      disabled
    >
      {platform.icon}
      {platform.name}
    </button>
  );
}