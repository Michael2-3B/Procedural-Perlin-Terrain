const factor = 255;
const worldBorder = 29999984;

// Define a function to initialize the range inputs and spans
function initializeRangeInput() {

  // Get references to the range inputs and the spans

  var persistenceInput = document.getElementById('persistence-input');
  var persistenceValue = document.getElementById('persistence-value');

  var octavesInput = document.getElementById('octaves-input');
  var octavesValue = document.getElementById('octaves-value');

  var wavelengthInput = document.getElementById('wavelength-input');
  var wavelengthValue = document.getElementById('wavelength-value');

  var waterLevel = document.getElementById('water-level');
  var waterValue = document.getElementById('water-value');

  var exponentInput = document.getElementById('exponent-input');
  var exponentValue = document.getElementById('exponent-value');

  var peaksInput = document.getElementById('peaks-input');
  var peaksValue = document.getElementById('peaks-value');

  var zoomInput = document.getElementById('zoom-input');
  var zoomValue = document.getElementById('zoom-value');

  var beachInput = document.getElementById('beach-input');
  var beachValue = document.getElementById('beach-value');

  var lightInput = document.getElementById('light-input');
  var lightValue = document.getElementById('light-value');

  var lightPositionInput = document.getElementById('light-position');
  var lightPositionValue = document.getElementById('light-position-value');

  var lightHeightInput = document.getElementById('light-height');
  var lightHeightValue = document.getElementById('light-height-value');

  // Set the initial value of the spans to the value of the range input

  persistenceValue.innerHTML = "Persistence: " + persistenceInput.value;
  octavesValue.innerHTML = "Octaves: " + octavesInput.value;
  wavelengthValue.innerHTML = "Wavelength: " + wavelengthInput.value;
  waterValue.innerHTML = "Water Level: " + waterLevel.value;
  exponentValue.innerHTML = "Exponent: " + exponentInput.value;
  peaksValue.innerHTML = "Peaks: " + peaksInput.value;
  beachValue.innerHTML = "Beach Size: " + beachInput.value;
  lightValue.innerHTML = "World Light: " + lightInput.value;
  lightPositionValue.innerHTML = "Light Position: " + lightPositionInput.value;
  lightHeightValue.innerHTML = "Light Height: " + lightHeightInput.value;

  lightHeightInput.addEventListener('input', function() {
    lightHeightValue.innerHTML = "Light Height: " + document.getElementById('light-height').value;
    generateMap();
  });

  lightPositionInput.addEventListener('input', function() {
    lightPositionValue.innerHTML = "Light Position: " + document.getElementById('light-position').value;
    generateMap();
  });

  lightInput.addEventListener('input', function() {
    lightValue.innerHTML = "World Light: " + document.getElementById('light-input').value;
    generateMap();
  });

  beachInput.addEventListener('input', function() {
    beachValue.innerHTML = "Beach Size: " + document.getElementById('beach-input').value;
    generateMap();
  });

  persistenceInput.addEventListener('input', function() {
    persistenceValue.innerHTML = "Persistence: " + document.getElementById('persistence-input').value;
    generateMap();
  });

  octavesInput.addEventListener('input', function() {
    octavesValue.innerHTML = "Octaves: " + document.getElementById('octaves-input').value;
    generateMap();
  });

  wavelengthInput.addEventListener('input', function() {
    wavelengthValue.innerHTML = "Wavelength: " + document.getElementById('wavelength-input').value;
    generateMap();
  });

  waterLevel.addEventListener('input', function() {
    waterValue.innerHTML = "Water Level: " + document.getElementById('water-level').value;
    generateMap();
  });

  exponentInput.addEventListener('input', function() {
    exponentValue.innerHTML = "Exponent: " + document.getElementById('exponent-input').value;
    generateMap();
  });

  peaksInput.addEventListener('input', function() {
    peaksValue.innerHTML = "Peaks: " + document.getElementById('peaks-input').value;
    generateMap();
  });

  zoomInput.addEventListener('input', function() {
    generateMap();
  });

  // Get a reference to the canvas element
  const canvas = document.getElementById("my-canvas");

  // Set up variables to track the current mouse position and whether the mouse button is being held down
  let isMouseDown = false;
  let currentX = 0;
  let currentY = 0;

  // Set up variables to store the offset values
  let offsetX = 0;
  let offsetY = 0;

  // Add event listeners for the mouseenter and mouseleave events
  canvas.addEventListener("mouseenter", function(event) {
    canvas.style.cursor = "grab";
  });

  canvas.addEventListener("mouseleave", function(event) {
    canvas.style.cursor = "default";
    isMouseDown = false;
    document.getElementById('coordX').innerHTML = "Coord X:";
    document.getElementById('coordZ').innerHTML = "Coord Z:";
  });

  // Add event listeners for the mousedown, mousemove, and mouseup events
  canvas.addEventListener("mousedown", function(event) {
    // When the mouse button is held down, set the isMouseDown flag to true and update the current mouse position
    isMouseDown = true;
    canvas.style.cursor = "grabbing";
    currentX = event.offsetX;
    currentY = event.offsetY;
  });

  canvas.addEventListener("mousemove", function(event) {

    let myZoom = document.getElementById('zoom-input').value;

    if (document.getElementById('isometricRendering').checked) {

      //document.getElementById('coordX').innerHTML = "Coord X: ---";
      //document.getElementById('coordZ').innerHTML = "Coord Z: ---";

    } else {

      let zoom = Math.floor(99 * parseFloat(myZoom)/2);
      let tileCount = (99 - zoom) - zoom;

      let x = zoom + Math.floor(event.offsetX/(canvas.width/tileCount)) + parseInt(document.getElementById('offset-x-input').value);
      let z = zoom + Math.floor(event.offsetY/(canvas.height/tileCount)) + parseInt(document.getElementById('offset-z-input').value);

      document.getElementById('coordX').innerHTML = "Coord X: " + x;
      document.getElementById('coordZ').innerHTML = "Coord Z: " + z;
      
    }

    // If the mouse button is being held down, update the offset values based on the change in mouse position
    if (isMouseDown) {
      const scaleX = 0.2;
      const scaleY = 0.2;
      let transformedX;
      let transformedY;

      if (document.getElementById('isometricRendering').checked){
        // Set up the scale and rotation factors for the transformation
        const rotation = 45;

        // Calculate the sin and cos of the rotation angle
        const sinR = Math.sin(rotation * Math.PI / 180);
        const cosR = Math.cos(rotation * Math.PI / 180);

        // Calculate the transformed offset values based on the change in mouse position
        const dx = event.offsetX - currentX;
        const dy = event.offsetY - currentY;
        transformedX = dx * sinR * scaleX + dy * cosR * scaleY;
        transformedY = -(dx * cosR * scaleX - dy * sinR * scaleY);

        // Update the offset values and the current mouse position
        offsetX += transformedX;
        offsetY += transformedY;
        currentX = event.offsetX;
        currentY = event.offsetY;

      } else {

        transformedX = scaleX * (event.offsetX - currentX);
        transformedY = scaleY * (event.offsetY - currentY);

        offsetX += transformedX;
        offsetY += transformedY;

        currentX = event.offsetX;
        currentY = event.offsetY;

      }

      // Update the input elements with the new offset values
      document.getElementById('offset-x-input').value = parseInt(document.getElementById('offset-x-input').value) - parseInt(transformedX);
      document.getElementById('offset-z-input').value = parseInt(document.getElementById('offset-z-input').value) - parseInt(transformedY);

      document.getElementById('offset-x-input').value = Math.max(-worldBorder,Math.min(worldBorder,parseInt(document.getElementById('offset-x-input').value)));
      document.getElementById('offset-z-input').value = Math.max(-worldBorder,Math.min(worldBorder,parseInt(document.getElementById('offset-z-input').value)));

      generateMap();
    }
  });

  canvas.addEventListener("mouseup", function(event) {
    // When the mouse button is released, set the isMouseDown flag to false
    isMouseDown = false;
    canvas.style.cursor = "grab";
  });

  const numInputs = document.querySelectorAll('input[type="number"]');

  numInputs.forEach(input => {
    let intervalId;

    input.addEventListener('mousedown', () => {
      intervalId = setInterval(generateMap, 100); // Call the generateMap() function every 100 milliseconds (0.1 seconds)
    });

    input.addEventListener('mouseup', () => {
      clearInterval(intervalId);
    });
  });

  generateMap();

}

// Call the initializeRangeInput function when the page is loaded
window.onload = initializeRangeInput;

let stepperInterval;
let theChange = 0;

function stepperPressed(elementId, spanId, direction) {
  changeSlider(elementId, spanId, direction);

  stepperInterval = setInterval(() => changeSlider(elementId, spanId, direction), 50);
}

function changeSlider(elementId, spanId, direction) {
  const theElement = document.getElementById(elementId);
  const theSpan = document.getElementById(spanId);

  if (theChange == 0) {
    theChange += theElement.step/2;
    theElement.value = Math.max(theElement.min, Math.min(theElement.max, parseFloat(theElement.value) + (direction * theElement.step)));
  } else {
    theChange += theElement.step/2;
    theElement.value = Math.max(theElement.min, Math.min(theElement.max, parseFloat(theElement.value) + (direction * theChange)));
  }

  if (elementId == 'persistence-input') {
    theSpan.innerHTML = 'Persistence: ' + theElement.value;
  } else if (elementId == 'octaves-input') {
    theSpan.innerHTML = 'Octaves: ' + theElement.value;
  } else if (elementId == 'wavelength-input') {
    theSpan.innerHTML = 'Wavelength: ' + theElement.value;
  } else if (elementId == 'exponent-input') {
    theSpan.innerHTML = 'Exponent: ' + theElement.value;
  } else if (elementId == 'peaks-input') {
    theSpan.innerHTML = 'Peaks: ' + theElement.value;
  } else if (elementId == 'water-level') {
    theSpan.innerHTML = 'Water Level: ' + theElement.value;
  } else if (elementId == 'beach-input') {
    theSpan.innerHTML = 'Beach Size: ' + theElement.value;
  } else if (elementId == 'light-input') {
    theSpan.innerHTML = 'World Light: ' + theElement.value;
  } else if (elementId == 'light-position') {
    theSpan.innerHTML = 'Light Position: ' + theElement.value;
  } else if (elementId == 'light-height') {
    theSpan.innerHTML = 'Light Height: ' + theElement.value;
  }

  generateMap();
}

function stepperReleased() {
  clearInterval(stepperInterval);
  theChange = 0;
}

function resetAll() {
  // Select the buttons using their class
  const buttons = document.getElementsByClassName('reset');

  // Iterate over the buttons and call the click method for each button
  for (const button of buttons) {
    button.click();
  }
}

function randomizeInputs() {
  document.getElementById('exponent-input').value = parseFloat(.5+.05*Math.floor(Math.random()*191));
  document.getElementById('exponent-value').innerHTML = "Exponent: " + document.getElementById('exponent-input').value;

  document.getElementById('peaks-input').value = parseFloat(.01*Math.floor(Math.random()*31));
  document.getElementById('peaks-value').innerHTML = "Peaks: " + document.getElementById('peaks-input').value;

  document.getElementById('water-level').value = Math.floor(Math.random()*192);
  document.getElementById('water-value').innerHTML = "Water Level: " + document.getElementById('water-level').value;

  document.getElementById('beach-input').value = Math.min(255, Math.max(0, parseInt(document.getElementById('water-level').value) + Math.floor(Math.random()*256 - 200)));
  document.getElementById('beach-value').innerHTML = "Beach Size: " + document.getElementById('beach-input').value;

  generateMap();
}

function changeMargin() {
  let myCanvasDiv = document.getElementById('canvas-div');
  let myCanvas = document.getElementById('my-canvas');

  if (document.getElementById('isometricRendering').checked){
    myCanvasDiv.style.marginLeft = '40px';
    myCanvas.style.boxShadow = 'none';
  } else {
    myCanvasDiv.style.marginLeft = '10px';
    if (document.getElementById('darkMode').checked) {
      myCanvas.style.boxShadow = '10px 10px 30px rgba(255, 255, 255, 0.5)';
    } else {
      myCanvas.style.boxShadow = '10px 10px 30px rgba(0, 0, 0, 0.5)';
    }
  }
}

function changeBackground() {
  if (document.getElementById('darkMode').checked) {
    document.body.style.backgroundColor = "#111111";
    document.getElementById('myInputDiv').style.backgroundColor = "#222222";

    document.querySelector('a').style.color = 'white';

    let spanElements = document.getElementsByTagName("span");
    for (let i = 0; i < spanElements.length; i++) {
        spanElements[i].style.color = "white";
    }

    let buttonElements = document.getElementsByTagName("button");
    for (let i = 0; i < buttonElements.length; i++) {
        buttonElements[i].style.color = "white";
        buttonElements[i].style.backgroundColor = "#333333";
        buttonElements[i].style.border = "1px solid #cccccc";
    }

  } else {
    document.body.style.backgroundColor = "#dddddd";
    document.getElementById('myInputDiv').style.backgroundColor = "#eeeeee";

    document.querySelector('a').style.color = 'black';

    let spanElements = document.getElementsByTagName("span");
    for (let i = 0; i < spanElements.length; i++) {
        spanElements[i].style.color = "black";
    }

    let buttonElements = document.getElementsByTagName("button");
    for (let i = 0; i < buttonElements.length; i++) {
        buttonElements[i].style.color = "black";
        buttonElements[i].style.backgroundColor = "#eeeeee";
        buttonElements[i].style.border = "1px solid #111111";
    }

  }

  changeMargin();
}

class SeedablePRNG {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

function perlinNoise(width, height, persistence, octaves, wavelengthValue, prng) {

  const offsetX = document.getElementById('offset-x-input').value;
  const offsetZ = document.getElementById('offset-z-input').value;

  const myPeaks = document.getElementById('peaks-input').value;
  const myExponent = document.getElementById('exponent-input').value;

  // Create a grid of random gradient vectors with dimensions (width + 1) x (height + 1)
  
  const gradients = new Array(width + 1);
  for (let i = 0; i < width + 1; i++) {
    gradients[i] = new Array(height + 1);
    for (let j = 0; j < height + 1; j++) {
      gradients[i][j] = [prng.next() * 2 - 1, prng.next() * 2 - 1];
    }
  }

  // Create an array to store the Perlin noise values
  const noise = new Array(width);
  for (let i = 0; i < width; i++) {
    noise[i] = new Array(height);
  }

  // Generate the Perlin noise
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Initialize the Perlin noise value to 0
      noise[x][y] = 0;

      let k = x+parseInt(offsetX)+worldBorder;
      let j = y+parseInt(offsetZ)+worldBorder;

      // Calculate the wavelength and amplitude for each octave
      for (let o = 0, wavelength = wavelengthValue; o < octaves; o++) {
        wavelength = Math.max(wavelength / 2, 1);
        const amplitude = persistence / (o+1);

        // Calculate the coordinates of the grid cell that the point is in
        const x0 = Math.floor(k / wavelength);
        const x1 = x0 + 1;
        const y0 = Math.floor(j / wavelength);
        const y1 = y0 + 1;

        // Calculate the dot products of the gradients at each corner of the grid cell with the distance vector from each corner to the point
        const dot00 = dotProduct(gradients[(x0 + width) % width][(y0 + height) % height], [k / wavelength - x0, j / wavelength - y0]);
        const dot01 = dotProduct(gradients[(x0 + width) % width][(y1 + height) % height], [k / wavelength - x0, j / wavelength - y1]);
        const dot10 = dotProduct(gradients[(x1 + width) % width][(y0 + height) % height], [k / wavelength - x1, j / wavelength - y0]);
        const dot11 = dotProduct(gradients[(x1 + width) % width][(y1 + height) % height], [k / wavelength - x1, j / wavelength - y1]);


        // Interpolate the values using bilinear interpolation
        const tx = easeInOutQuad(k / wavelength - x0);
        const ty = easeInOutQuad(j / wavelength - y0);
        const nx0 = lerp(dot00, dot10, tx);
        const nx1 = lerp(dot01, dot11, tx);
        const nxy = lerp(nx0, nx1, ty);

        // Add the value to the Perlin noise value
        noise[x][y] += nxy * amplitude;
      }

      // Convert the Perlin noise value to a terrain value
      noise[x][y] = Math.max(0, Math.min(254, Math.floor(Math.pow((noise[x][y] + 1) / 2 + parseFloat(myPeaks), myExponent) * factor)));
    }
  }

  // Return the array of terrain
  return noise;
}

// Helper function to calculate the dot product of two vectors
function dotProduct(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
}

// Helper function to interpolate between two values using a quadratic easing function
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Helper function to interpolate between two values using linear interpolation
function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

function generateMap(){

  let worldSeed = document.getElementById('seed-input').value;
  if (worldSeed < 0){
    worldSeed = 0;
    document.getElementById('seed-input').value = 0;
  }

  document.getElementById('offset-x-input').value = Math.max(-worldBorder,Math.min(worldBorder, document.getElementById('offset-x-input').value));
  document.getElementById('offset-z-input').value = Math.max(-worldBorder,Math.min(worldBorder, document.getElementById('offset-z-input').value));

  const prng = new SeedablePRNG(worldSeed);

  // Get the canvas element and its context
  const canvas = document.getElementById('my-canvas');
  const context = canvas.getContext('2d');

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  const width = 100;
  const height = 100;
  const persistence = document.getElementById('persistence-input').value;
  const octaves = document.getElementById('octaves-input').value;
  const wavelength = document.getElementById('wavelength-input').value;
  const myExponent = document.getElementById('exponent-input').value;
  const myPeaks = document.getElementById('peaks-input').value;
  const waterLevel = parseInt(document.getElementById('water-level').value);
  const beachSize = parseInt(document.getElementById('beach-input').value);
  const light = parseInt(document.getElementById('light-input').value) - 255;
  const zoom = 1 - parseFloat(document.getElementById('zoom-input').value);

  const lightPosition = parseInt(document.getElementById('light-position').value);
  const lightHeight = parseInt(document.getElementById('light-height').value);
  let lightHeightChange = (90-lightHeight);
  lightHeightChange /= 3-(lightHeight+90)/90;

  let red = 221;
  let green = 221;
  let blue = 221;

  if (document.getElementById('darkMode').checked) {
    red = 17;
    green = 17;
    blue = 17;
  }

  if (document.getElementById('dynamicMode').checked) {
    // Calculate the red, green, and blue values based on the light-height value
    let myLight1 = 3 * (lightHeight+90)/180 + 1;
    let myLight2 = 5 - myLight1;
    let myLightHeightChange = (90-lightHeight);

    red = Math.max(0,221-myLightHeightChange/myLight1+Math.min(0,lightHeight));
    green = Math.max(0,221-myLightHeightChange/2+Math.min(0,lightHeight));
    blue = Math.max(0,221-myLightHeightChange/myLight2+Math.min(0,lightHeight));

    // Set the body background color using the calculated red, green, and blue values
    document.body.style.backgroundColor = 'rgb('+red+','+green+','+blue+')';

    if (lightHeight >= 0) {
      document.querySelector('a').style.color = "black";
      document.getElementById('footerText').style.color = "black";
    } else {
      document.querySelector('a').style.color = "white";
      document.getElementById('footerText').style.color = "white";
    }

    if (!document.getElementById('isometricRendering').checked)
      canvas.style.boxShadow = '10px 10px 30px rgba('+(255-red)+','+(255-green)+','+(255-blue)+',0.5)';
  }

  function waterColorLookup(depth) {

    let colors = new Array(3);

    colors = [0, 180-depth/2, 255-depth/4, 0.7];

    let light1 = 3 * (lightHeight+90)/180 + 1;
    let light2 = 5 - light1;

    colors[0] = Math.max(0,colors[0]-lightHeightChange/light1+Math.min(0,lightHeight));
    colors[1] = Math.max(0,colors[1]-lightHeightChange/2+Math.min(0,lightHeight));
    colors[2] = Math.max(0,colors[2]-lightHeightChange/light2+Math.min(0,lightHeight));

    for(let i=0; i<3; i++){
      colors[i] = Math.max(0,Math.min(255,colors[i]+light));
    }

    return colors;

  }

  function terrainColorLookup(elevation, slopeDirection, slopeX, slopeZ) {

    let colors = new Array(3);

    if (elevation < waterLevel+beachSize) {
      colors = [Math.min(elevation/3+150*1.3,255), Math.min(elevation/3+110*1.3,215), Math.min(elevation/3*1.3,105), 1];
    } else if (elevation < 100) {
      colors = [elevation, elevation+88, elevation, 1];
    } else if (elevation < 130) {
      colors = [elevation, elevation+58, elevation, 1];
    } else if (elevation < 160) {
      colors = [elevation, Math.min(elevation+29), elevation, 1];
    } else if (elevation < 190) {
      colors = [elevation-10,elevation-10,elevation, 1];
    } else if (elevation < 220) {
      colors = [elevation-40,elevation-40,elevation-30, 1];
    } else {
      colors = [Math.min(255,elevation+10), Math.min(255,elevation+10), Math.min(255,elevation+20), 1];
    }

    colors = addShading(colors, slopeDirection, slopeX, slopeZ);

    for(let i=0; i<3; i++){
      colors[i] = Math.max(0, Math.min(255,colors[i]+light));
    }

    return colors;
  }

  function addShading(colors, slopeDirection, slopeX, slopeZ) {

    let light1 = 3 * (lightHeight+90)/180 + 1;
    let light2 = 5 - light1;

    colors[0] = Math.max(0,colors[0]-lightHeightChange/light1+Math.min(0,lightHeight));
    colors[1] = Math.max(0,colors[1]-lightHeightChange/2+Math.min(0,lightHeight));
    colors[2] = Math.max(0,colors[2]-lightHeightChange/light2+Math.min(0,lightHeight));

    let diff = Math.abs(lightPosition - slopeDirection);
    diff = diff > 180 ? 360 - diff : diff;

    if (slopeX == 0 && slopeZ == 0)
      diff = -(lightHeight - 90);

    for(let i=0; i<3; i++){
      colors[i] = Math.min(255, Math.max(0, colors[i] - diff * Math.abs((lightHeight-90)/90)));
    }

    return colors;

  }

  function calculateSlopeDirection(y0, y1, y2, y3) {
    let slopeX0 = y1 - y0;
    let slopeZ0 = y2 - y0;
    let slopeX1 = y3 - y2;
    let slopeZ1 = y3 - y1;

    let averageSlopeX = (slopeX0 + slopeX1) / 2;
    let averageSlopeZ = (slopeZ0 + slopeZ1) / 2;

    // Calculate the slope direction in radians and convert to degrees
    let slopeDirection = Math.atan2(averageSlopeZ, averageSlopeX) * 180 / Math.PI;

    // Make sure slopeDirection is within the range 0-359
    slopeDirection = (slopeDirection + 360) % 360;

    return [slopeDirection, averageSlopeX, averageSlopeZ];
  }

  let map = perlinNoise(width, height, persistence, octaves, wavelength, prng);

  // Generate a height map visualization of the Perlin noise values

  if (document.getElementById('isometricRendering').checked) {
    const isoHeight = 20 / zoom;  // adjust this value to control the height of the isometric view
    const isoWidth = zoom;   // adjust this value to control the width of the isometric view
    const isoLength = zoom;  // adjust this value to control the length of the isometric view

    // Set the size of the canvas
    canvas.width = 173*5;
    canvas.height = 138*5;

    context.translate(382,-200/zoom+250);

    function coordToPixel(coordX, coordY, coordHeight) {
      return [Math.floor(5 * ((coordX - coordY) * Math.cos(Math.PI / 6) / isoWidth) + width / 2),
              Math.floor(5 * ((coordX + coordY) * Math.sin(Math.PI / 6) / isoLength - coordHeight * isoHeight) + height / 2)];
    }

    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {

        let mapvalue0 = map[x][y];
        let mapvalue1 = map[x+1][y];
        let mapvalue2 = map[x][y+1];
        let mapvalue3 = map[x+1][y+1];

        let perlinmapvalue0 = (2*map[x][y]/factor)-1;
        let perlinmapvalue1 = (2*map[x+1][y]/factor)-1;
        let perlinmapvalue2 = (2*map[x][y+1]/factor)-1;
        let perlinmapvalue3 = (2*map[x+1][y+1]/factor)-1;

        let terrainAverageHeight = Math.floor(((mapvalue0 + mapvalue1 + mapvalue2 + mapvalue3) / 4));
        let terrainHighestHeight = Math.max(Math.max(mapvalue0, mapvalue1), Math.max(mapvalue2, mapvalue3));
        let terrainLowestHeight = Math.min(Math.min(mapvalue0, mapvalue1), Math.min(mapvalue2, mapvalue3));

        let perlinAverageHeight = (perlinmapvalue0 + perlinmapvalue1 + perlinmapvalue2 + perlinmapvalue3) / 4;
        let perlinHighestHeight = Math.max(Math.max(perlinmapvalue0, perlinmapvalue1), Math.max(perlinmapvalue2, perlinmapvalue3));
        let perlinWaterLevel = 2*(waterLevel/255)-1;

        let slopeValues = calculateSlopeDirection(mapvalue0, mapvalue1, mapvalue2, mapvalue3);

        // Draw Tiles

        function drawTile(height0, height1, height2, height3, isWater) {

          // Calculate the pixel coordinates of the isometric points
          const pixel0 = coordToPixel(x, y, height0);
          const pixel1 = coordToPixel(x + 1, y, height1);
          const pixel2 = coordToPixel(x, y + 1, height2);
          const pixel3 = coordToPixel(x + 1, y + 1, height3);

          // Calculate the color of the current point
          let color;
          if (isWater) {
            color = waterColorLookup(waterLevel - terrainAverageHeight);
          } else {
            color = terrainColorLookup(terrainHighestHeight, slopeValues[0], slopeValues[1], slopeValues[2]);
          }

          // Begin a new path and draw the polygon formed by the current point and its neighbors
          context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
          context.strokeStyle = context.fillStyle;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(pixel1[0], pixel1[1]);
          context.lineTo(pixel3[0], pixel3[1]);
          context.lineTo(pixel2[0], pixel2[1]);
          context.lineTo(pixel0[0], pixel0[1]);
          context.fill();

          if (isWater) context.lineWidth = 0.5;
          context.beginPath();
          context.moveTo(pixel1[0], pixel1[1]);
          context.lineTo(pixel3[0], pixel3[1]);
          context.lineTo(pixel2[0], pixel2[1]);
          context.stroke();

        }

        function drawBorder(height0, height1, height2, height3, isWater, x1, y1, x2, y2, isLeftBorder) {

          const pixel0 = coordToPixel(x1, y1, height0);
          const pixel1 = coordToPixel(x2, y2, height1);
          const pixel2 = coordToPixel(x1, y1, height2);
          const pixel3 = coordToPixel(x2, y2, height3);

          // Calculate the color of the current point
          let color;
          if (isWater) {
            let colorDiff = 15;
            if (isLeftBorder)
              colorDiff = 25;

            color = waterColorLookup(waterLevel - terrainAverageHeight + colorDiff);
            context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
          } else {
            if (document.getElementById('sideFill').checked) {
              const colorGradient = context.createLinearGradient(0, (pixel2[1]+pixel3[1])/2, 0, (pixel2[1]+pixel3[1])/2 - 255);
              
              let color1 = [150+light, 110+light, 0+light];
              let color2 = [255+light, 215+light, 105+light];

              let light1 = 3 * (lightHeight+90)/180 + 1;
              let light2 = 5 - light1;

              color1[0] = Math.max(0,color1[0]-lightHeightChange/light1+Math.min(0,lightHeight));
              color1[1] = Math.max(0,color1[1]-lightHeightChange/2+Math.min(0,lightHeight));
              color1[2] = Math.max(0,color1[2]-lightHeightChange/light2+Math.min(0,lightHeight));

              color2[0] = Math.max(0,color2[0]-lightHeightChange/light1+Math.min(0,lightHeight));
              color2[1] = Math.max(0,color2[1]-lightHeightChange/2+Math.min(0,lightHeight));
              color2[2] = Math.max(0,color2[2]-lightHeightChange/light2+Math.min(0,lightHeight));

              colorGradient.addColorStop(0, `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 1)`);
              colorGradient.addColorStop(1, `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 1)`);
              context.fillStyle = colorGradient;
            } else {
              color = [red, green, blue, 1];

              context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
            }
          }

          // Begin a new path and draw the polygon formed by the current point and its neighbors
          context.beginPath();
          context.moveTo(pixel1[0], pixel1[1]);
          context.lineTo(pixel3[0], pixel3[1]);
          context.lineTo(pixel2[0], pixel2[1]);
          context.lineTo(pixel0[0], pixel0[1]);
          context.fill();
        }

        if (terrainHighestHeight < waterLevel || terrainLowestHeight >= waterLevel)
          drawTile(perlinmapvalue0, perlinmapvalue1, perlinmapvalue2, perlinmapvalue3, false);

        if (terrainHighestHeight < waterLevel) {

          // Draw water tile
          drawTile(perlinWaterLevel, perlinWaterLevel, perlinWaterLevel, perlinWaterLevel, true);

          if (y == height - 2) drawBorder(perlinWaterLevel, perlinWaterLevel, perlinmapvalue2, perlinmapvalue3, true, x, y + 1, x + 1, y + 1, true);

          if (x == width - 2) drawBorder(perlinWaterLevel, perlinWaterLevel, perlinmapvalue3, perlinmapvalue1, true, x + 1, y + 1, x + 1, y, false);

        } else if (mapvalue0 < waterLevel || mapvalue1 < waterLevel || mapvalue2 < waterLevel || mapvalue3 < waterLevel) {

          // 1, 2, or 3 of the points are underwater
          // So draw the water tile dynamically so it wraps to the terrain

          // Convert waterLevel which has a range of 0 to 255, to a range of -1 to 1
          let perlinWaterLevel = 2*(waterLevel/255)-1;

          // calculate slope of the points between each tile vertex
          let slope1 = mapvalue1 - mapvalue0;
          let slope2 = mapvalue2 - mapvalue0;
          let slope3 = mapvalue3 - mapvalue1;
          let slope4 = mapvalue3 - mapvalue2;

          // calculate b for each slope
          let b1 = mapvalue0 - slope1 * x;
          let b2 = mapvalue0 - slope2 * y;
          let b3 = mapvalue1 - slope3 * y;
          let b4 = mapvalue2 - slope4 * x;

          // calculate where each slope intersects with the water level
          let x1 = (waterLevel - b1) / slope1;
          let y1 = (waterLevel - b2) / slope2;
          let y2 = (waterLevel - b3) / slope3;
          let x2 = (waterLevel - b4) / slope4;

          let vertexList = [];
          let tileList = [];
          let tileList2 = [];
          let coastList = [];
          let coastVertices = 0;

          if (mapvalue0 <= waterLevel) {
            vertexList.push(
              [
                (x - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue0 * isoHeight
              ]
            );

            if (mapvalue0 == waterLevel && ((mapvalue1 >= waterLevel) || (mapvalue2 >= waterLevel))) {
              coastList.push(vertexList.length-1);
              coastVertices++;
            }
            if (mapvalue0 < waterLevel) coastList.push(-1);
          }

          if (mapvalue0 >= waterLevel) {
            tileList2.push(
              [
                (x - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue0 * isoHeight
              ]
            );
          }

          if (x1 > x && x1 < x+1) {
            vertexList.push(
              [
                (x1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList2.push(
              [
                (x1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            coastList.push(vertexList.length-1);
            coastVertices++;
          }

          if (mapvalue1 <= waterLevel) {
            vertexList.push(
              [
                (x + 1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x + 1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue1 * isoHeight
              ]
            );

            if (mapvalue1 == waterLevel && ((mapvalue0 >= waterLevel) || (mapvalue3 >= waterLevel))) {
              coastList.push(vertexList.length-1);
              coastVertices++;
            }
            if (mapvalue1 < waterLevel) coastList.push(-1);
          }

          if (mapvalue1 >= waterLevel) {
            tileList2.push(
              [
                (x + 1 - y) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue1 * isoHeight
              ]
            );
          }

          if (y2 > y && y2 < y+1) {
            vertexList.push(
              [
                (x + 1 - y2) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y2) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x + 1 - y2) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y2) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList2.push(
              [
                (x + 1 - y2) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + y2) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            coastList.push(vertexList.length-1);
            coastVertices++;
          }

          if (mapvalue3 <= waterLevel) {
            vertexList.push(
              [
                (x + 1 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x + 1 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue3 * isoHeight
              ]
            );

            if (mapvalue3 == waterLevel && ((mapvalue1 >= waterLevel) || (mapvalue2 >= waterLevel))) {
              coastList.push(vertexList.length-1);
              coastVertices++;
            }
            if (mapvalue3 < waterLevel) coastList.push(-1);
          }

          if (mapvalue3 >= waterLevel) {
            tileList2.push(
              [
                (x + 1 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + 1 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue3 * isoHeight
              ]
            );
          }

          if (x2 > x && x2 < x+1) {
            vertexList.push(
              [
                (x2 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x2 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x2 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x2 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList2.push(
              [
                (x2 - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x2 + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            coastList.push(vertexList.length-1);
            coastVertices++;
          }

          if (mapvalue2 <= waterLevel) {
            vertexList.push(
              [
                (x - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue2 * isoHeight
              ]
            );

            if (mapvalue2 == waterLevel && ((mapvalue0 >= waterLevel) || (mapvalue3 >= waterLevel))) {
              coastList.push(vertexList.length-1);
              coastVertices++;
            }
            if (mapvalue2 < waterLevel) coastList.push(-1);
          }

          if (mapvalue2 >= waterLevel) {
            tileList2.push(
              [
                (x - (y + 1)) * Math.cos(Math.PI / 6) / isoWidth,
                (x + (y + 1)) * Math.sin(Math.PI / 6) / isoLength - perlinmapvalue2 * isoHeight
              ]
            );
          }

          if (y1 > y && y1 < y+1) {
            vertexList.push(
              [
                (x - y1) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y1) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList.push(
              [
                (x - y1) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y1) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            tileList2.push(
              [
                (x - y1) * Math.cos(Math.PI / 6) / isoWidth,
                (x + y1) * Math.sin(Math.PI / 6) / isoLength - perlinWaterLevel * isoHeight
              ]
            );

            coastList.push(vertexList.length-1);
            coastVertices++;
          }

          if (tileList2.length > 2) {

            // Draw dynamic tile that is partially above water

            let tileColor = terrainColorLookup(terrainHighestHeight, slopeValues[0], slopeValues[1], slopeValues[2]);
            context.fillStyle = `rgba(${tileColor[0]}, ${tileColor[1]}, ${tileColor[2]}, ${tileColor[3]})`;
            context.strokeStyle = context.fillStyle;
            context.lineWidth = 1;

            context.beginPath();

            context.moveTo(Math.floor(5 * tileList2[0][0] + width / 2), Math.floor(5 * tileList2[0][1] + height / 2));

            for(let tI = 1; tI < tileList2.length; tI++){
              context.lineTo(Math.floor(5 * tileList2[tI][0] + width / 2), Math.floor(5 * tileList2[tI][1] + height / 2));
            }

            context.lineTo(Math.floor(5 * tileList2[0][0] + width / 2), Math.floor(5 * tileList2[0][1] + height / 2));

            context.stroke();
            context.fill();
          }

          if (vertexList.length > 2) {

            // Draw dynamic terrain tile that is partially under water

            let tileColor = [Math.min(terrainHighestHeight/3+150*1.3,255), Math.min(terrainHighestHeight/3+110*1.3,215), Math.min(terrainHighestHeight/3*1.3,105), 1];

            tileColor = addShading(tileColor, slopeValues[0], slopeValues[1], slopeValues[2]);

            context.fillStyle = `rgba(${tileColor[0] + light}, ${tileColor[1] + light}, ${tileColor[2] + light}, ${tileColor[3]})`;
            context.strokeStyle = context.fillStyle;
            context.lineWidth = 1;

            context.beginPath();

            context.moveTo(Math.floor(5 * tileList[0][0] + width / 2), Math.floor(5 * tileList[0][1] + height / 2));

            for(let tI = 1; tI < tileList.length; tI++){
              context.lineTo(Math.floor(5 * tileList[tI][0] + width / 2), Math.floor(5 * tileList[tI][1] + height / 2));
            }

            context.lineTo(Math.floor(5 * tileList[0][0] + width / 2), Math.floor(5 * tileList[0][1] + height / 2));

            context.stroke();
            context.fill();


            // Draw dynamic water tile

            // Calculate the color of the current point
            let color = waterColorLookup(waterLevel - terrainAverageHeight);

            // Begin a new path and draw the polygon formed by the current point and its neighbors
            context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
            context.strokeStyle = context.fillStyle;
            context.lineWidth = 0.5;
            context.beginPath();

            context.moveTo(Math.floor(5 * vertexList[0][0] + width / 2), Math.floor(5 * vertexList[0][1] + height / 2));

            for(let vI = 1; vI < vertexList.length; vI++){
              context.lineTo(Math.floor(5 * vertexList[vI][0] + width / 2), Math.floor(5 * vertexList[vI][1] + height / 2));
            }

            context.lineTo(Math.floor(5 * vertexList[0][0] + width / 2), Math.floor(5 * vertexList[0][1] + height / 2));

            context.stroke();
            context.fill();
          }

          // Fill left water border

          if (y == height - 2 && (mapvalue2 < waterLevel || mapvalue3 < waterLevel)) {

            let xP1 = x;
            let xP2 = x+1;

            let p1 = perlinmapvalue2;
            let p2 = perlinmapvalue3;

            if (x2 > x && x2 < x+1){
              if (mapvalue2 > waterLevel) {
                xP1 = x2;
                p1 = perlinWaterLevel;
              } else if (mapvalue3 > waterLevel) {
                xP2 = x2;
                p2 = perlinWaterLevel;
              }
            }

            drawBorder(perlinWaterLevel, perlinWaterLevel, p1, p2, true, xP1, y + 1, xP2, y + 1, true);

          }

          // Fill right water border

          if (x == width - 2 && (mapvalue1 < waterLevel || mapvalue3 < waterLevel)) {

            let yP1 = y;
            let yP2 = y+1;

            let p1 = perlinmapvalue1;
            let p2 = perlinmapvalue3;

            if (y2 > y && y2 < y+1){
              if (mapvalue1 > waterLevel) {
                yP1 = y2;
                p1 = perlinWaterLevel;
              } else if (mapvalue3 > waterLevel) {
                yP2 = y2;
                p2 = perlinWaterLevel;
              }
            }

            drawBorder(perlinWaterLevel, perlinWaterLevel, p2, p1, true, x + 1, yP2, x + 1, yP1, false);

          }

          // Draw coast line

          if (coastVertices > 1 && document.getElementById('coastline').checked) {

            let linkedPoints = [];
            for(let cI=1; cI<coastList.length; cI++){
              if (coastList[cI] != -1 && coastList[cI-1] != -1)
                linkedPoints.push(coastList[cI-1],coastList[cI]);
            }
            if (coastList[coastList.length-1] != -1 && coastList[0] != -1)
              linkedPoints.push(coastList[coastList.length-1], coastList[0]);

            context.strokeStyle = `rgba(255, 255, 255, 0.3)`;
            context.lineWidth = 3;
            context.lineCap = 'round';

            for(let cV=0; cV<linkedPoints.length; cV+=2){

              context.beginPath();

              context.moveTo(Math.floor(5 * vertexList[linkedPoints[cV]][0] + width / 2), Math.floor(5 * vertexList[linkedPoints[cV]][1] + height / 2));
              context.lineTo(Math.floor(5 * vertexList[linkedPoints[cV+1]][0] + width / 2), Math.floor(5 * vertexList[linkedPoints[cV+1]][1] + height / 2));

              context.stroke();
            }

          }

        }

        // Draw Left Land Border
        if (y == height - 2 && (mapvalue2 > 0 || mapvalue3 > 0)) drawBorder(perlinmapvalue2, perlinmapvalue3, -1, -1, false, x, y + 1, x + 1, y + 1, true);

        // Draw Right Land Border
        if (x == width - 2 && (mapvalue1 > 0 || mapvalue3 > 0)) drawBorder(perlinmapvalue3, perlinmapvalue1, -1, -1, false, x + 1, y + 1, x + 1, y, false);
        
      }
    }
  } else {
    canvas.width = 690;
    canvas.height = 690;
    let newZoom = (1-(1-zoom)/2);
    let tileCount = (99 - Math.floor(99*(1-newZoom))) - Math.floor(99*(1-newZoom));
    for (let y = Math.floor(99*(1-newZoom)); y < height - 1 - Math.floor(99*(1-newZoom)); y++) {
      for (let x = Math.floor(99*(1-newZoom)); x < width - 1 - Math.floor(99*(1-newZoom)); x++) {

        let terrainAverageHeight = Math.floor(((map[x][y] + map[x+1][y] + map[x][y+1] + map[x+1][y+1]) / 4));
        let terrainHighestHeight = Math.max(Math.max(map[x][y], map[x+1][y]), Math.max(map[x][y+1], map[x+1][y+1]));
        let terrainLowestHeight = Math.min(Math.min(map[x][y], map[x+1][y]), Math.min(map[x][y+1], map[x+1][y+1]));

        let slopeValues = calculateSlopeDirection(map[x][y], map[x+1][y], map[x][y+1], map[x+1][y+1]);

        // Draw terrain color

        let color = terrainColorLookup(terrainAverageHeight, slopeValues[0], slopeValues[1], slopeValues[2]);

        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;

        let xDiff = x - Math.floor(99*(1-newZoom));
        let yDiff = y - Math.floor(99*(1-newZoom));

        context.fillRect(Math.floor(xDiff*(canvas.width/tileCount)), Math.floor(yDiff*(canvas.height/tileCount)), Math.round(0.5+canvas.width/tileCount), Math.round(0.5+canvas.height/tileCount));

        // Overlay water color

        if (terrainAverageHeight < waterLevel) {

          color = waterColorLookup(waterLevel - terrainAverageHeight);

          context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;

          xDiff = x - Math.floor(99*(1-newZoom));
          yDiff = y - Math.floor(99*(1-newZoom));

          context.fillRect(Math.floor(xDiff*(canvas.width/tileCount)), Math.floor(yDiff*(canvas.height/tileCount)), Math.round(0.5+canvas.width/tileCount), Math.round(0.5+canvas.height/tileCount));
        }
      }
    }
  }
   
}