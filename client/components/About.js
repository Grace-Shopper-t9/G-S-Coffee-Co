import React from "react";

const About = () => {
  return (
    <div id="about" className="aboutpage">
      <div id="fordevs" className="devs">
        <h1>
          The perfect fuel for developers, designers, and anyone who's
          passionate about creating amazing things.
        </h1>
        <div className="containeraboutimg">
          <video src="/reactcoffeevideo.mp4" autoPlay muted loop></video>
        </div>
      </div>
      <div id="ourstory">
        <p>
          React Coffee is a premium coffee roaster that's dedicated to crafting
          the perfect cup of coffee. We believe that coffee is more than just a
          beverage - it's a ritual, a way of life, and a source of inspiration.
          That's why we use only the finest beans and carefully roast them to
          bring out their unique flavors and aromas.
        </p>
        <p>
          Our passion for coffee is matched only by our love of technology.
          That's why we've named our coffee after React, the popular JavaScript
          library for building user interfaces. We believe that React Coffee is
          the perfect fuel for developers, designers, and anyone who's
          passionate about creating amazing things.
        </p>
        <p>
          Whether you prefer a smooth and mellow brew or a bold and complex
          espresso, we've got you covered. Our expertly roasted coffee is
          available in a variety of blends and single-origin options, so you can
          find the perfect flavor to suit your taste. So why not join us on a
          journey of discovery and taste the difference with React Coffee.
        </p>
      </div>
    </div>
  );
};

export default About;
