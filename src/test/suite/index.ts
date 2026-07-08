import * as assert from 'assert';

// Set of test that are executed by runTest.ts

export function run(): Promise<void> {
	assert.strictEqual([1, 2, 3].indexOf(5), -1);
	assert.strictEqual([1, 2, 3].indexOf(0), -1);

	return Promise.resolve();
}
