#!/bin/bash
export DOCKER_CONTEXT=remote
unset DOCKER_HOST
alias docker-compose='docker --context remote compose'
alias docker='docker --context remote'
rush "$@"

