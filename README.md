 # Playwright Typescript Automation Framework
This is a sample automation framework using Playwright, Typescript and PageObject Model (POM).
The framework is designed to run UI tests. 

## Getting started
## Installing Dependencies

```bash
npm install
```
## Running the tests

```bash
npm run test - Run all tests in headed mode
npm run test:headless - Run all tests in headless mode
```
## Running the tests with docker container locally
```bash
docker build -t origin-energy-tests . && docker run --rm origin-energy-tests
```
## Default github actions workflow added for CI/CD 
working

## Issues/Limitations as of today
There is an issue with opening pdf URL rendering with Chromium headless (playwrihght limitation)
Also seeing issues with Firefox browser and are commented 



