import { Header } from "../../components";
import './index.css'
export default function About() {
  return (
    <div className="aboutbackground"> 
      <Header />
      <div className="about-page">
        
        <div className="about-container"><h1 className="about-header">About</h1>
        <h2>What is Pokédoro?</h2>
        <p>
          This website is a Pokémon themed pomodoro app, allowing your study to
          feel more fun and rewarding. We specifically only cover the Pokémon
          franchise. Using this website, you can build your collection of
          pokemon and watch them evolve through your hard work.
        </p>
        <h2>What is a Pomodoro App?</h2>
        <p>
          A pomodoro app is designed to boost productivity and reduce
          procrastination. Having a timer and reward makes you want to study for
          the whole session time and including mandatory short breaks reduces
          stress and boosts productivity.
        </p>
        <h2>How much information is stored on this app?</h2>
        <p>
          We currently have the pokemon from the first 3 generations, with a few
          extras to add to evolution chains. We aim to add all pokemon to the
          database.
        </p>
        <img className="ash"src="/src/pages/About/ash.gif"/>
      </div>
      </div>
      </div>
  );
}
