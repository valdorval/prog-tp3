const { spawn } = require('child_process');

async function run() {
    const backendInitialBuild = spawn('tsc.cmd', ['-b', '--verbose', '--preserveWatchOutput', 'common', 'backend'], { cwd: `${__dirname}` });
    await new Promise(resolve => { backendInitialBuild.on('close', resolve); });
    startBackend();
    const backendBuild = spawn('tsc.cmd', ['-b', '--verbose', '--watch', '--preserveWatchOutput', 'common', 'backend'], { cwd: `${__dirname}` });
    setTypescriptActions(backendBuild, 'back-build', '\x1b[33m');

    const frontendServe = spawn('webpack-dev-server.cmd', ['--config', 'webpack.dev.js'], { cwd: `${__dirname}/frontend` });
    setActions(frontendServe, 'front-serve');
}

function setActions(proc, name, color) {
    proc.stdout.setEncoding('utf8');
    proc.stderr.setEncoding('utf8');
    proc.stdout.on('data', (chunk) => {
        color ? process.stdout.write(`${color}${chunk}\x1b[0m`) : process.stdout.write(`${chunk}`);
    });
    proc.stderr.on('data', (chunk) => {
        process.stderr.write(`\x1b[31m${name} ${chunk}\x1b[0m`);
    });
    proc.on('close', (code) => {
        process.stdout.write(`${name} exited with code ${code}\n`);
    });
}

let currentBuild;
function setTypescriptActions(proc, name, color) {
    proc.stdout.setEncoding('utf8');
    proc.stdout.on('data', (chunk) => {
        const foundStartingBuild = chunk.toString().match(/Project '([^']+)\/tsconfig.json' is out of date/);
        if (foundStartingBuild) {
            currentBuild = foundStartingBuild[1];
        }
        if (chunk.toString().includes('Found 0 errors. Watching for file changes.')) {
            if (currentBuild === 'backend') { startBackend(); }
        }
        color ? process.stdout.write(`${color}${chunk}\x1b[0m`) : process.stdout.write(`${chunk}`);
    });
    proc.on('close', (code) => {
        process.stdout.write(`${name} exited with code ${code}\n`);
    });
}


let backendDebug;
function startBackend() {
    if (backendDebug) {
        backendDebug.kill();
    }
    backendDebug = spawn('node', ['--inspect=9228', 'dist/main.js'], { cwd: `${__dirname}/backend` });
    setActions(backendDebug, 'backend');
}

run();
