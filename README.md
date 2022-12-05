# School Collab

## Introduction
School Collab is a web-application students can use to collaborate on.
Features like sharing info about upcoming assignments, providing data about certain topics as well as a account system for users to register are included.
<br>
[![Deploy](https://github.com/Elias-Traunbauer/school_collab/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/Elias-Traunbauer/school_collab/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/Elias-Traunbauer/school_collab/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/Elias-Traunbauer/school_collab/actions/workflows/codeql.yml)

<br>

# How to verify tasks

- Visit the [live-dev website](https://school-collab.ga) and navigate to the given location
- Check if the DOD-(Definition of Done)'s requirements are met

<br>

# Development

### Dependencies
* NodeJS Server >= 16
* Visual Studio Code
* ApacheHaus x64
* PHP x64 >= 8
* Configure ApacheHaus to use php (make sure to change php7 to php) [tutorial](https://www.tutorialspoint.com/php7/php7_installation_windows_apache.htm)
* Use the `php.ini` from the repo (replace existing php-ini file with this one)

## Dev-environment setup
### Set up next run command
Create a run-option in `package.json`, the name can be anything (just make sure you use this option when developing)
```bash
next build && next export && mkdir .\\out\\api && xcopy /s api out\\api
```

### Configure ApacheHaus
* In your ApacheHaus directory, navigate to `\conf` <br>
* In this folder you should see a file called `httpd.conf`, open it <br>
* In this file look for `DocumentRoot` and change it to the `out` directory of your next app <br>
* The `out` directory consists of the path of your next app and `\out` <br>
* For example `C:\Path\To\Your\Next\App` + `\out` <br>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
