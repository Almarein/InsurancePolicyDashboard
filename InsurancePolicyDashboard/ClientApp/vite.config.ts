import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { env } from 'process';

const baseFolder = `${env.HOME}/.aspnet/https`;

const certificateName = "insurancepolicydashboard";
const certFilePath = env.SSL_CRT_FILE || path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = env.SSL_KEY_FILE || path.join(baseFolder, `${certificateName}.key`);

const target = 'https://localhost:3001';

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api/*': {
                target,
                secure: false
            }
        },
        port: parseInt(env.DEV_SERVER_PORT || '5000'),
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
})
