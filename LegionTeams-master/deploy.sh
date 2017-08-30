#!/bin/bash

eval $(ssh-agent)
ssh-add
cd .deploy
mup deploy
cd ../
ssh-agent -k