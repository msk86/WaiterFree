#!/bin/bash

#export VELOCITY_DEBUG=1
#export JASMINE_LOG_LEVEL=debug
#export LONG_RUNNING_CHILD_PROCESS_LOG_LEVEL=debug
#export VELOCITY_USE_CHECKED_OUT_METEOR=1


export JASMINE_CLIENT_INTEGRATION=0
export JASMINE_BROWSER=Firefox
export JASMINE_PACKAGES_TO_INCLUDE_IN_UNIT_TESTS=package-to-include

meteor --test --once --verbose --release velocity:METEOR@1.1.0.2_3
