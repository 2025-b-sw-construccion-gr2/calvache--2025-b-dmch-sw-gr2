const { execFileSync } = require('child_process');
const path = require('path');

const projectDir = path.join(__dirname, '..');

function runCli(args) {
  const output = execFileSync('node', ['src/index.js', ...args], {
    cwd: projectDir,
  });
  return output.toString();
}

describe('CLI', () => {
  test('suma imprime el total', () => {
    const result = runCli(['sum', '1', '2', '3']);
    expect(result.trim()).toBe('Total: 6');
  });

  test('stats muestra valores agregados', () => {
    const result = runCli(['stats', '2', '4']);
    expect(result).toContain('Cantidad: 2');
    expect(result).toContain('Total: 6');
    expect(result).toContain('Promedio: 3.00');
  });

  test('muestra ayuda con --help', () => {
    const result = runCli(['--help']);
    expect(result).toContain('Uso:');
  });
});
