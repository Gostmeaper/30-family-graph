import { defineConfig } from 'vite';

// Force a single copy of three.js across the app and 3d-force-graph.
// Without this, the app and the graph renderer can load different three
// versions, which breaks rendering ("Multiple instances of Three.js").
export default defineConfig({
    resolve: {
        dedupe: ['three'],
    },
});
