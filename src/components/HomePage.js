import Home from "./Home/Home";
import About from "./About";
import Library from "./Library/Library";


const HomePage = ({ wishlistState, triggerLogin }) => {
  return (
    <>
      <section id="home"><Home triggerLogin={triggerLogin} /></section>
      <section id="about"><About /></section>
      <section id="library"><Library wishlistState={wishlistState} triggerLogin={triggerLogin} /></section>
    </>
  );
};

export default HomePage;
