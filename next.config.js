module.exports = {
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/(.*)',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                    }
                ]
            }
        ];
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/sign-in',
                permanent: true
            }
        ];
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'en'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localstack',
                port: '4566',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'instagramm-profile.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
    exclude: ['backend']
};
