@echo off
setlocal
cd /d "%~dp0"
where bun >nul 2>nul
if %errorlevel% neq 0 (
    echo Bun is not installed or not in PATH. Please install Bun first ^(https://bun.sh^).
    exit /b 1
)
bun run packages/cli/src/index.tsx %*
endlocal
