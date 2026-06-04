#!/usr/bin/env bash
set -euo pipefail

# Guard against hardcoded hex colours in Tailwind arbitrary values
# (e.g. bg-[#fff], text-[#142D36]). These are forbidden — use design tokens.
#
# The `\[#` prefix only matches Tailwind arbitrary-value syntax, so SVG
# attributes (fill="#...") and bare comments (#...) are not flagged.
#
# JSDoc/line comments that *quote* the forbidden syntax as documentation
# examples (e.g. ` * Example: "bg-[#d77655]"`) are excluded so the guard
# only fails on real className usage, not docs.

matches="$(grep -rnE '\[#[0-9A-Fa-f]{3,8}' packages/ui/src \
  | grep -vE ':[0-9]+:[[:space:]]*(\*|//|/\*)' \
  || true)"

if [ -n "$matches" ]; then
  echo "✗ hardcoded hex found in Tailwind classes — use design tokens instead:"
  echo "$matches"
  exit 1
fi

echo "✓ no hardcoded hex in Tailwind classes"
exit 0
