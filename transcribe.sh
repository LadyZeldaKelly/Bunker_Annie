#!/usr/bin/env bash
# Transcribe a voiceover with whisperX and get word-level timestamps.
# Usage: ./transcribe.sh <audio-file> ["Hint words like Remotion, YourChannelName"]
# Output: <audio-name>.json next to the audio file (see "word_segments" for per-word times).
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
IN="$1"; HINT="${2:-}"
export SSL_CERT_FILE="${SSL_CERT_FILE:-/root/.ccr/ca-bundle.crt}" REQUESTS_CA_BUNDLE="${REQUESTS_CA_BUNDLE:-/root/.ccr/ca-bundle.crt}"
[ -f "$SSL_CERT_FILE" ] || unset SSL_CERT_FILE REQUESTS_CA_BUNDLE
ARGS=(--model "${WHISPER_MODEL:-small}" --language en --device cpu --compute_type int8
      --output_dir "$(dirname "$IN")" --output_format json)
[ -n "$HINT" ] && ARGS+=(--initial_prompt "$HINT")
"$DIR/.venv-whisperx/bin/whisperx" "$IN" "${ARGS[@]}" 2>&1 | grep -vE "Warning|warn\(" || true
echo "Saved: $(dirname "$IN")/$(basename "${IN%.*}").json"
