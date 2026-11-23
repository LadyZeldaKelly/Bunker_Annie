#!/usr/bin/env bash
# One-time setup for a fresh machine/session: Remotion deps, whisperX (Python 3.12) and NLTK data.
set -euo pipefail
cd "$(dirname "$0")"
command -v ffmpeg >/dev/null || (apt-get update && apt-get install -y ffmpeg)
npm install
if [ ! -x .venv-whisperx/bin/whisperx ]; then
  uv venv --python 3.12 .venv-whisperx
  VIRTUAL_ENV="$PWD/.venv-whisperx" uv pip install whisperx
fi
NLTK_ALLOW_PROXIED_URLOPEN=1 .venv-whisperx/bin/python -c "import nltk,sys; nltk.download('punkt_tab', download_dir=sys.prefix+'/nltk_data', quiet=True)"
echo "Setup complete. Preview: npx remotion studio   Transcribe: ./transcribe.sh <audio> \"hints\""
