#!/usr/bin/env bash
#
# runs GitHub actions workflows locally
#   - requires act to be installed (https://nektosact.com)
#   - if using podman, be sure to run `systemctl --user start podman.socket` first
#   - WARNING: this downloads a huge (18GB) docker image!

act -P ubuntu-latest=catthehacker/ubuntu:full-latest --artifact-server-path /tmp/artifacts pull_request
