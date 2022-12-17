import React, { useEffect } from 'react';
import '../css/BeerPour.css';

export function BeerPour(props) {
  const beerRef = React.useRef(null);
  const pourRef = React.useRef(null);
  const headRef = React.useRef(null);
  useEffect(() => {
    function beerRise() {
      beerRef.current.classList.add("fill");
      headRef.current.classList.add("active");
    }
    function pourBeer() {
      pourRef.current.classList.add("pouring");
      beerRise();
      setTimeout(function () {
        pourRef.current.classList.add("end");
      }, 1500);
    }
    setTimeout(function () {
      pourBeer();
    }, 3000);
  });
  return (
    <div id="container">
      <div class="glass">
        <div ref={beerRef} class="beer"></div>
      </div>
      <div ref={headRef} class="head"></div>
      <div ref={pourRef} class="pour"></div>
    </div>
  );
}

export default BeerPour;
