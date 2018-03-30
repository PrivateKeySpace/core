SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

.PHONY: install build run test test-ci typecheck lint lint-enforce

install:
	yarn install
	flow-typed install

build:
	rm -rf ./build
	babel ./src/ --out-dir ./build/ --ignore __tests__,__mocks__
	cp -r ./src/common/storage/migrations ./build/common/storage/migrations

run:
	NODE_ENV=development node ./build

test:
	NODE_ENV=test jest ./src  --runInBand --forceExit

test-ci:
	NODE_ENV=test jest ./src  --runInBand --forceExit --ci --coverage

typecheck:
	flow check ./src/

lint:
	standard "./src/**/*.js" "./src/**/*.test.js"

lint-enforce:
	standard "./src/**/*.js" "./src/**/*.test.js" --fix

migratedb-up:
	node ./build/common/storage/cli.js migratedb:up

migratedb-down:
	node ./build/common/storage/cli.js migratedb:down

migratedb-refresh:
	node ./build/common/storage/cli.js migratedb:refresh
