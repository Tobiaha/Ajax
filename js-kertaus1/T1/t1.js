'use strict';

function tempconverter() {
  const celsius = parseFloat(document.getElementById('celsiusInput').value);

  const fahrenheit = (celsius * 9 / 5) + 32;

  const kelvin = celsius + 273.15;

  document.getElementById('result').innerHTML = '' + `
<p>Celsius: ${celsius}C</p>
<p>Fahrenheit: ${fahrenheit.toFixed(1)}F</p>
<p>Kelvin: ${kelvin.toFixed(1)}K</p>`;
}