# Other installation methods

Ubuntu / Debian apt-get

```cmd
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

This installation method is required for users on ARM and BSD. You must have node and npm installed already.
(Acredito que se já tiver o Node instalado, poderá optar por instalar deste outro modo:)

```cmd
npm install -g heroku
```

## Removes previous heroku

```cmd
git remote rm heroku
```

## Sets git remote heroku to https://example-example.git

```cmd
git remote add heroku git:remote -a nlw4-calcjob
```

basicamente foi o seguinte:
no package.json coloquei: "start": "node src/server.js",
e no serve.js: var porta = process.env.PORT || 8080; e isso server.listen(porta, () => console.log('rodando'));

# 🚀

## Install the Heroku CLI

(Após a instalação no WSL2... )

Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```cmd
$ heroku login
```

Create a new Git repository
Initialize a git repository in a new or existing directory

```cmd
$ cd my-project/
$ git init
$ heroku git:remote -a nlw4-calcjob
```

Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

```cmd
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

You can now change your main deploy branch from "master" to "main" for both manual and automatic deploys, please follow the instructions here.

Existing Git repository
For existing repositories, simply add the heroku remote

```cmd
$ heroku git:remote -a nlw4-calcjob
```
