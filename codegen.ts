import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://instagramm-backend.vercel.app/graphql/',
    documents: ['src/api/queries/**/*.ts'],
    generates: {
        'src/api/queries/types.ts': {
            plugins: ['typescript']
        },
        'src/': {
            preset: 'near-operation-file',
            presetConfig: {
                extension: '.generated.tsx',
                baseTypesPath: 'types.ts'
            },
            plugins: ['typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true
            }
        },
        './graphql.schema.json': {
            plugins: ['introspection']
        }
    }
};

export default config;
