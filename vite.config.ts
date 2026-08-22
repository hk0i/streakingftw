import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const dev = process.env.NODE_ENV !== 'production';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Static build for GitHub Pages — no server-side rewrites available.
			adapter: adapter(),
			paths: {
				// GitHub Pages serves project pages under /<repo-name>/.
				base: dev ? '' : '/wintracker'
			}
		})
	]
});
