# How to verify tasks

- Visit the [live-dev website](https://school-collab.ga) and navigate to the given location
- Check if the DOD-(Definition of Done)'s requirements are met

<br>
<br>

# Development

### Dependencies
* NodeJS Server >= 16
* Visual Studio Code
* ApacheHaus x64
* PHP x64 >= 8
* [PHP for ApacheHaus](https://www.tutorialspoint.com/php7/php7_installation_windows_apache.htm)
* Use the `php.ini` from the repo (replace existing php-ini file with this one)

## Dev-environment setup
### Set up next run command
Create a run-option in `package.json`
```bash
next build && next export && mkdir \out\api && xcopy /s \api \out\api
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
