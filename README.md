# Pokédoro

## About our app

Welcome to the Pokédoro Pomodoro app!

## Installation and Usage

#### Github

- Fork the repo (top right of the page).
- Go to your forked repo, it will now say `<your-github-username>pokedoro`.
- Click the green "code" button and copy the **SSH** option if you have already setup git in your terminal, or the **HTTPS** option if not.

#### Terminal commands (GITBASH FOR WINDOW USERS OR TERMINAL FOR MAC USERS)

- Go to the directory you want to clone in.
- Run `git clone <SSH key or HTTPS key>`.
- Then, `cd pokedoro`.
- Check branch is main using `git branch` otherwise `git checkout main`.
- Run `ls` to check files & folders which should have a "server" folder, "client" folder and "README.md" file.
- To open VS code, `code .`.

#### How to install the server libraries

- Change directory into the server by running `cd server`
- Install the dependancies by running `npm install`
- If this did not install the nodemon package, run `npm install -D`

#### How to connect the database

- Create a `.env` file within the server folder
- Login to [elephantsql](https://www.elephantsql.com)
- Create a new instance, you can name it "pokedoro-db"
- In the details tab of your new db, copy the db URL
- Within your `.env` file, add `DB_URL={your copied URL}`
- Make sure the `.env` is in the `.gitignore` file!
- cd into the api folder if you aren't already, and run `npm run setup-db`
- You should see "Set-up complete." in your terminal
- Additionally, you can use the deployed server at [render](https://pokedoro-api.onrender.com/)

#### How to run the server (ignore if using render)

- To the `.env` file, add `PORT=3000`
- cd into the api folder if you aren't already, and run `npm run dev`
- You should see "API listening on 3000" in your terminal

**Make sure to leave the server running in the terminal for the next stages too.**

#### How to open the website

- cd into the client by running `cd client` from the pokedoro server
- run `npm install` again to install the client-side packages
- run `npm run dev` and click on the localhost link that appears in your terminal

#### How to use

- Create an account on the register page and login with it on the login page.
- You are now in the home page, you can use the search bar to search for a pokemon and its evolution and you can click on it to navigate to the timer page for that pokemon.
- On the timer page, you can change the study session and break times, once you complete a study session and a break, your pokemon will get added to your collection and will evolve.
- The about page displays information on the project and the collection page displays your collected pokemon.

#### If you wish to make a change

- Go to your terminal
- Run `git status` and check files are red.
- Run `git add .` to add **all** files
  OR `git add <folder-name>` to add a specific folder
  OR `git add <folder-name/file-name>` to add a specific file
- Run `git status` again and check files are green.
- Then, commit by `git commit -m "<message>"`.
- Finally, run `git push`.
- Make a "Pull Request" to merge it to the original repository and request a review.

## Technology used

- HTML
- CSS
- Node.js
- React.js
- Express.js
- Bootstrap
- MUI
- Figma
- Bcrypt encription
- Jest testing for the server
- React testing for the client

## License

ISC license

## Wins and challenges

Some functionality of the timer was tricky to implement, such as updating the pokemon with the users ID for the collection, which had to be gotten from the token. We got over these challenges by all coming up with different ideas to get around this. Also changing the time of the timer was a challenge and displaying the time in the correct format, a time converter function was used for this.

The search function was difficult as well as it needed to find what the searched pokemon evolved into as well, so we created a json that contains all the pokemon and what they evolve into.

The making of the chrome extension was hard as we needed to recreate the timer page but in a much smaller window, and we could not view our changes to the code live in the extension. This was solved by rebuilding the extension after every few changes in code to see what's happened.

## Future features

In the future we would add another reward system, in which every 10 pokemon collected, you would receive a shiny pokemon. We would also implement a leaderboard system, in which you can add friends and compare time studied and pokemon collected. An acheivements page would be good as you can receive digital trophies for completed milestones in study time and pokemon collected. Finally, we would add more pokemon to the database, allowing for more options.
