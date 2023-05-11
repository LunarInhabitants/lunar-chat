/** @type {import('next').NextConfig} */

// Need to pull in the .env variables from the parent directory.
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '/../.env') });

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        })
        return config
    },
    experimental: {
        externalDir: true
    }
};

module.exports = nextConfig
