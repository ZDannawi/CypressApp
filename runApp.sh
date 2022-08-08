#!/usr/bin/env bash

case $1 in
    "--help") # display Help
        echo "Welcome to the Cypress Runner"
        echo "You may pass in the following options: "
        echo -e '\t1. Pass --chrome to run on Chrome.'
        echo -e '\t2. Pass --firefox to run on Firefox.'
        ;;
    "--chrome")
        docker run -it -v $PWD:/e2e -w /e2e cypress/included:10.4.0 --browser $1
        ;;
    "--firefox")
        docker run -it -v $PWD:/e2e -w /e2e cypress/included:10.4.0 --browser $1
        ;;
    *)
        echo "You have failed to specify a parameter. Pass the --help flag for options."
        exit 1
    ;;
esac
# docker run -it -v $PWD:/e2e -w /e2e cypress/included:10.4.0