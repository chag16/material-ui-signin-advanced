# material-ui-signin-advanced

Material UI functionalities in single page 
1. Sign In 
2. Sign Up 
3. Forgot Password 

The project works after installing Create React App https://github.com/facebook/create-react-app 
and Material UI https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/

---
# Installation

Install Create React App

```bash
npm install create-react-app
npx create-react-app my-app
```
Add Signin.js from repo into your my-app/src folder

Edit app.js 
1. Add 

```bash
import SignIn from './Signin';
```

2. Replace return()  

```bash
return ( 
                <SignIn /> 
        );
```

3. Install material-ui componenets and any other missing packages

```bash
cd my-app
npm install @material-ui/core
npm install @material-ui/icons
npm install universal-cookie
```

4. Start

```bash
npm start
```

## Reporting bugs
Please use the GitHub issue tracker for any bugs or feature suggestions:

https://github.com/chag16/material-ui-signin-advanced/issues

## Contributing
Please submit patches to code or documentation as GitHub pull requests! 
