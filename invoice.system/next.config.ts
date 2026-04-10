import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  transpilePackages: ['leaflet', 'react-leaflet'],
};

export default withNextIntl(nextConfig);