SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

.PHONY: install build run test test-ci typecheck lint lint-enforce

install:
	yarn install
	flow-typed install

build:
	babel ./src/ --out-dir ./build/ --ignore ./src/**/*.test.js

run: build
	node build

test:
	NODE_ENV=test jest ./src --maxWorkers=1 --watch

test-ci:
	NODE_ENV=test jest ./src --maxWorkers=1 --ci --coverage

typecheck:
	flow check ./src/

lint:
	standard "./src/**/*.js" "./src/**/*.test.js"

lint-enforce:
	standard "./src/**/*.js" "./src/**/*.test.js" --fix
