import '@testing-library/jest-dom';

// Mock Inertia router
global.route = (name: string, params?: any) => {
    return `/${name.replace('.', '/')}${params ? '?' + new URLSearchParams(params).toString() : ''}`;
};
