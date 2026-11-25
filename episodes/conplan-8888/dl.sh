#!/bin/bash
# usage: echo "name url" | ./dl.sh  → public/conplan-8888/img/name.png
while read -r n u; do [ -z "$n" ] && continue; curl -sf -o "/home/user/public/conplan-8888/img/$n.png" "$u" && echo "ok $n" || echo "FAIL $n"; done
