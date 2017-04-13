# Servitium.Auth

Enterprise portal project.

## Deployment

After shipping Servitium to your server `npm i` to install all required npm packages.

Create `config.json` in `./config/` folder :

```$xslt
{
  "serverHost": "",
  "serverPort": "",
  "mongodbHost": "",
  "mongodbPort": "",
  "mongodbDatabase": ""
}
```

## Building Servitium App

Run `ng build` to compile Angular project from `./src/`. 

For Production use I recommend `ng build --prod --aot`

Visit [Angular CLI](https://github.com/angular/angular-cli) for more help.

## Starting server

Run `npm run start-servitium`.


