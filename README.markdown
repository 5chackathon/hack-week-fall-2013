# Hack Week Fall 2013 - Photoshare

## Pre-Installation
### Mac

Go to [this link](https://developer.apple.com/downloads/index.action) to
register as an Apple Developer and download the Command Line Tools for XCode,
taking care to download the correct version for your current operating system
version (i.e., Mavericks, Mountain Lion, etc.).

Press Command+Spacebar to open search, then search and open Terminal.

Now we will install [Homebrew](http://brew.sh) to manage the dependencies for
this project. Copy and paste the following command into the terminal, then press
enter.

    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"

Then, run the following commands:

    brew install nodejs
    brew install mongodb


### Windows
We will be using [Chocolatey](http://chocolatey.org/) to manage the dependencies
for this project.

Type `Win+R` and enter `cmd` to open the command prompt. Copy the following
command, right click on the command prompt, paste the command, and press enter.

    @powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%systemdrive%\chocolatey\bin

Now, type the following commands, pressing enter after each one:

    cinst git.install
    cinst nodejs.install
    cinst nodejs.commandline
    cinst mongodb

Close and reopen your command prompt.

### Linux (Ubuntu and Debian)

Open a terminal and enter the following command:

    sudo apt-get install git nodejs mongodb

## Setting up the Application

First, navigate to a folder where you would like to store the code.

#### Mac/Linux

    cd
    mkdir repos && cd repos

#### Windows

    cd %USERPROFILE%
    mkdir repos
    cd repos

Now, clone the source code into a local folder.

    git clone https://github.com/euclio/hack-week-fall-2013.git
    cd hack-week-fall-2013

Lastly, Install the node dependencies.

    npm install

If would like to set up Facebook integration, you should navigate to the
[Facebook developers site](http://developers.facebook.com) and register as a
developer. Then, create a new application
[here](https://developers.facebook.com/apps). Go to the page created for your
new app, and copy down the app ID and app secret. Then, edit `app.js` and change
`FB_ID` and `FB_APP_SECRET` to the values for your application.

## Running the application

Assuming that you are in the main directory of the application,

First, start up the database.

#### Mac/Linux

    sudo mongod

If you get an error, you may need to run

    sudo service mongodb stop

#### Windows

MongoDB runs as a service on startup, so you shoudn't have to start any programs
to use the database.

Next, start nodejs.

    node app.js

Lastly, open up your browser and navigate to `http://localhost:3000`. You should
see the website running locally.
