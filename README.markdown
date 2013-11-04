# Hack Week Fall 2013 - Photoshare

## Pre-Installation
### Mac

Go to [this link](https://developer.apple.com/downloads/index.action) and
download the Command Line Tools for XCode, taking care to download the correcte
version for your current operating system version (i.e., Mavericks, Mountain
Lion, etc.).

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
    cinst nodejs.command
    cinst mongodb

Close and reopen your command prompt.

### Linux (Ubuntu and Debian)

Open a terminal and enter the following command:

    sudo apt-get install git nodejs mongodb

## Setting up the Application

1. Navigate to a folder where you would like to store the code.

#### Mac/Linux

    cd
    mkdir repos && cd repos

#### Windows

    cd %USERPROFILE%
    mkdir repos
    cd repos

2. Clone the source code into a local folder.

    git clone https://github.com/euclio/hack-week-fall-2013.git
    cd hack-week-fall-2013

3. Install the node dependencies.

    npm install

## Running the application

Assuming that you are in the main directory of the application,

1. Start up the database

#### Mac/Linux

    sudo mongod

If you get an error, you may need to run

    sudo service mongodb stop

#### Windows

    mongod

2. Start nodejs

    nodejs app.js

3. Open up your browser and navigate to `http://localhost:3000`.
