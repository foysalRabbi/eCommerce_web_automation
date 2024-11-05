# Introduction

## Tools
After analyzing the products and various automation tools, we selected [Playwright](https://playwright.dev). which is one of the popular open‐source functional and regression testing tools in recent time and very well suited for this product requirments. We went through the application, understood its functionality and work‐flow, and prepared our automation plan.

We developed sufficient sets of scripts to be simply run whenever there was a change in the application. 


### Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [excel-js](https://github.com/exceljs/exceljs)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [DotEnv](https://github.com/motdotla/dotenv)
- [faker](https://github.com/faker-js/faker)
 
## Getting Started

### Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```

**TODO:** Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references


### Installation

1. Clone the repo using below URL

```sh
https://sec-admin.nopextension.com/
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```
3. For first time installation run below command to download required browsers

```sh
npx playwright install
```

<!-- USAGE EXAMPLES-->

## Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire test suite on all available browsers simultaneously execute below command where "test_env" can be "DEV" or "UAT", `Test Cases are present in "tests" folder`:

```JS
npm run test_env:DEV
```


## For viewing trace files, go to folder where `trace.zip` is generated and execute :
```JS
npx playwright show-trace trace.zip
```


## Reports

- <b>Overall Report</b>
  ![Overall Report Screenshot][overall-report-screenshot]

- <b>Detailed Report</b>
  ![Detailed Report Screenshot][detailed-report-screenshot]

- <b>Failure Report</b>
  ![Failure Report Screenshot][failure-report-screenshot]

## Lighthouse(To do)
Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
I have configure Lighthouse for Performance in my Project. Please use version 9.6.8 as later versions are not compatible.
- To configure Lighthouse navigate to "tests/lighthouse/Lighthouse.js" and replace "https://www.google.com" with desired URL to test.
- To run test on Mobile devices, comment out desktop mode config line and uncomment the config line written for mobile devices, Default Device is Moto G4
- To run Lighthouse test use below command, reports will be generated in html format in root directory with name "LighthouseReport.html" 
```JS
npm run lighthouse
```

## Browser Configuration

### For now, This project has configured with one browser, we can easily create more browser later on.

1. Chrome

![browser, support!](https://playwright.dev/java/img/logos/Browsers.png)

## Environments Configuration

#### For now, This project has configured with three environment

1. DEV
2. UAT
3. PROD


## Build and Test with different environment

 *Below are command to run automation script with different environment:*

    npm run <environment name>
    (ex: npm run env:dev)