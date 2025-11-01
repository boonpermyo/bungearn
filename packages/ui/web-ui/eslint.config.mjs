import baseConfig from '@whisper-loop/eslint-config';
import storybookConfig from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig(...baseConfig, storybookConfig.configs['flat/recommended']);
