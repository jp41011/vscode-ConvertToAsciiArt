import * as path from 'path';
import { runTests } from '@vscode/test-electron';

// Launches vscode test environment

async function main() {
	const extensionDevelopmentPath = path.resolve(__dirname, '../../');
	const extensionTestsPath = path.resolve(__dirname, './suite/index');

	await runTests({ extensionDevelopmentPath, extensionTestsPath });
}

main().catch((error) => {
	console.error('Failed to run extension tests', error);
	process.exit(1);
});
