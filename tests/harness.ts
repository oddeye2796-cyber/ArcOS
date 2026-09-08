/**
 * A test harness small enough to not be a dependency.
 *
 * The project ships no test runner and its whole check step is `tsc --noEmit`.
 * Rather than pull in a framework for two suites, this provides the three
 * things they actually need — grouping, assertions, and a non-zero exit — on
 * top of `tsx`, which is already a devDependency.
 */

interface Failure {
  suite: string;
  name: string;
  message: string;
}

const failures: Failure[] = [];
let currentSuite = '(root)';
let passed = 0;

export function suite(name: string, body: () => void): void {
  currentSuite = name;
  console.log(`\n${name}`);
  body();
  currentSuite = '(root)';
}

export function test(name: string, body: () => void): void {
  try {
    body();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push({ suite: currentSuite, name, message });
    console.log(`  ✗ ${name}\n      ${message.replace(/\n/g, '\n      ')}`);
  }
}

export function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

export function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}\n  expected: ${String(expected)}\n  actual:   ${String(actual)}`);
  }
}

export function assertIncludes(haystack: readonly string[], needle: string, message: string): void {
  if (!haystack.includes(needle)) {
    throw new Error(`${message}\n  looked for: ${needle}\n  got:        [${haystack.join(', ')}]`);
  }
}

/** Prints the summary and sets the exit code. Called once, by the runner. */
export function report(): void {
  console.log(`\n${'─'.repeat(60)}`);
  if (failures.length === 0) {
    console.log(`${passed} passed`);
    return;
  }
  console.log(`${passed} passed, ${failures.length} failed:\n`);
  for (const failure of failures) {
    console.log(`  ${failure.suite} › ${failure.name}`);
  }
  process.exitCode = 1;
}
