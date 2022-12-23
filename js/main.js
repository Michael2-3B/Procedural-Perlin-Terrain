const factor = 255;
const worldBorder = 29999984;

// Define a function to initialize the range input and span
function initializeRangeInput() {

  // Get a reference to the range input and the span
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

  // Set the initial value of the span to the value of the range input
  persistenceValue.innerHTML = "Persistence: " + persistenceInput.value;
  octavesValue.innerHTML = "Octaves: " + octavesInput.value;
  wavelengthValue.innerHTML = "Wavelength: " + wavelengthInput.value;
  waterValue.innerHTML = "Water Level: " + waterLevel.value;
  exponentValue.innerHTML = "Exponent: " + exponentInput.value;
  peaksValue.innerHTML = "Peaks: " + peaksInput.value;
  beachValue.innerHTML = "Beach Size: " + beachInput.value;
  lightValue.innerHTML = "World Light: " + lightInput.value;
  lightPositionValue.innerHTML = "Block Light Position: " + lightPositionInput.value;

  lightPositionInput.addEventListener('input', function() {
    lightPositionValue.innerHTML = "Block Light Position: " + document.getElementById('light-position').value;
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

  // Listen for changes to the range input and update the value of the span
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

    if (document.getElementById('isometricRendering').checked) {

      document.getElementById('coordX').innerHTML = "Coord X: i dunno";
      document.getElementById('coordZ').innerHTML = "Coord Z: math is hard";

    } else {

      document.getElementById('coordX').innerHTML = "Coord X: " + (Math.floor(event.offsetX/(canvas.width/100)) + parseInt(document.getElementById('offset-x-input').value));
      document.getElementById('coordZ').innerHTML = "Coord Z: " + (Math.floor(event.offsetY/(canvas.height/100)) + parseInt(document.getElementById('offset-z-input').value));
      
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

function resetAll() {
  // Select the buttons using their class
  const buttons = document.getElementsByClassName('reset');

  // Iterate over the buttons and call the click method for each button
  for (const button of buttons) {
    button.click();
  }
}

function randomizeInputs() {
  document.getElementById('exponent-input').value = parseFloat(.1+.05*Math.floor(Math.random()*199));
  document.getElementById('exponent-value').innerHTML = "Exponent: " + document.getElementById('exponent-input').value;

  document.getElementById('peaks-input').value = parseFloat(.01*Math.floor(Math.random()*51));
  document.getElementById('peaks-value').innerHTML = "Peaks: " + document.getElementById('peaks-input').value;

  document.getElementById('water-level').value = Math.floor(Math.random()*128);
  document.getElementById('water-value').innerHTML = "Water Level: " + document.getElementById('water-level').value;

  document.getElementById('beach-input').value = parseFloat(.01*Math.floor(Math.random()*101));
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
    myCanvas.style.boxShadow = '10px 10px 30px rgba(0, 0, 0, 0.5)';
  }
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
    }
  }

  // Return the Perlin noise values
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
  const waterLevel = document.getElementById('water-level').value;
  const beachSize = 1 + parseFloat(document.getElementById('beach-input').value);
  const light = parseInt(document.getElementById('light-input').value) - 255;
  const zoom = 1 - parseFloat(document.getElementById('zoom-input').value);

  function colorLookup(elevation) {
    let color = Math.max(0, Math.min(254, Math.floor(Math.pow((elevation + 1) / 2 + parseFloat(myPeaks), myExponent) * factor)));

    let colors = new Array(3);

    if (color < waterLevel/1.5) {
      colors = [color, Math.min(color+44,255), Math.min(color+128,255)];
    } else if (color < waterLevel/1.25) {
      colors = [color, Math.min(color+66,255), Math.min(color+192,255)];
    } else if (color < waterLevel) {
      colors = [color, Math.min(color+88,255), 255];
    } else if (color <  Math.min(Math.floor(waterLevel*beachSize),factor/(2-beachSize)-waterLevel)) {
      colors = [Math.min(color+150,255), Math.min(color+100,255), color];
    } else if (color < 100) {
      colors = [color, color+88, color];
    } else if (color < 130) {
      colors = [color, color+58, color];
    } else if (color < 160) {
      colors = [color, Math.min(color+29), color];
    } else if (color < 190) {
      colors = [color-10,color-10,color];
    } else if (color < 220) {
      colors = [color-40,color-40,color-30];
    } else {
      colors = [Math.min(255,color+10), Math.min(255,color+10), Math.min(255,color+20)];
    }

    for(let i=0; i<3; i++){
      colors[i] = Math.max(0,Math.min(255,colors[i]+light));
    }

    return colors;
  }

  const map = perlinNoise(width, height, persistence, octaves, wavelength, prng);

  // Generate a height map visualization of the Perlin noise values

  if (document.getElementById('isometricRendering').checked) {
    const isoHeight = 20 / zoom;  // adjust this value to control the height of the isometric view
    const isoWidth = zoom;   // adjust this value to control the width of the isometric view
    const isoLength = zoom;  // adjust this value to control the length of the isometric view

    const lightPosition = parseInt(document.getElementById('light-position').value);
    const lightOffset = 30;

    // Set the size of the canvas
    canvas.width = 173*5;
    canvas.height = 138*5;

    const ang = 6;

    // Translate the context so that the terrain is centered in the canvas
    context.translate(382,-200/zoom+275);

    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {

        let mapvalue = map[x][y];
        let mapvalue1 = map[x+1][y];
        let mapvalue2 = map[x][y+1];
        let mapvalue3 = map[x+1][y+1];

        /*
        if (mapvalue < (waterLevel/(factor/2)-1)) {
          mapvalue = waterLevel/(factor/2)-1;
        }
        if (mapvalue1 < (waterLevel/(factor/2)-1)) {
          mapvalue1 = waterLevel/(factor/2)-1;
        }
        if (mapvalue2 < (waterLevel/(factor/2)-1)) {
          mapvalue2 = waterLevel/(factor/2)-1;
        }
        if (mapvalue3 < (waterLevel/(factor/2)-1)) {
          mapvalue3 = waterLevel/(factor/2)-1;
        }
        */

        if (document.getElementById('blockRendering').checked) {

          //Draw blocks

          let blockSize = 1/(Math.max(1,isoHeight)*zoom);
          let blockHeight = (mapvalue + mapvalue1 + mapvalue2 + mapvalue3) / 4;

          // Calculate the remainder of blockHeight divided by blockSize
          let remainder = blockHeight % blockSize;

          // If the remainder is not equal to 0, add the difference to blockHeight to make it a multiple of blockSize
          if (remainder !== 0) {
            blockHeight += (blockSize - remainder);
          }

          const isoX1 = (x-y) * Math.cos(Math.PI/ang) / isoWidth;
          const isoY1 = (x+y) * Math.sin(Math.PI/ang) / isoLength - (blockHeight + blockSize) * isoHeight;

          const isoX2 = (x + 1 - y) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY2 = (x + 1 + y) * Math.sin(Math.PI / ang) / isoLength - (blockHeight + blockSize) * isoHeight;

          const isoX3 = (x - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY3 = (x + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - (blockHeight + blockSize) * isoHeight;

          const isoX4 = (x + 1 - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY4 = (x + 1 + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - (blockHeight + blockSize) * isoHeight;

          const isoX5 = (x - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY5 = (x + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - (blockHeight - blockSize) * isoHeight;

          const isoX6 = (x + 1 - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY6 = (x + 1 + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - (blockHeight - blockSize) * isoHeight;

          const isoX7 = (x + 1 - y) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY7 = (x + 1 + y) * Math.sin(Math.PI / ang) / isoLength - (blockHeight - blockSize) * isoHeight;

          const pixelX1 = Math.floor(5 * isoX1 + width / 2);
          const pixelY1 = Math.floor(5 * isoY1 + height / 2);
          const pixelX2 = Math.floor(5 * isoX2 + width / 2);
          const pixelY2 = Math.floor(5 * isoY2 + height / 2);
          const pixelX3 = Math.floor(5 * isoX3 + width / 2);
          const pixelY3 = Math.floor(5 * isoY3 + height / 2);
          const pixelX4 = Math.floor(5 * isoX4 + width / 2);
          const pixelY4 = Math.floor(5 * isoY4 + height / 2);
          const pixelX5 = Math.floor(5 * isoX5 + width / 2);
          const pixelY5 = Math.floor(5 * isoY5 + height / 2);
          const pixelX6 = Math.floor(5 * isoX6 + width / 2);
          const pixelY6 = Math.floor(5 * isoY6 + height / 2);
          const pixelX7 = Math.floor(5 * isoX7 + width / 2);
          const pixelY7 = Math.floor(5 * isoY7 + height / 2);

          const color = colorLookup(blockHeight);

          //Draw Left Face
          context.fillStyle = `rgba(${Math.min(255,Math.max(0,color[0]-lightOffset-lightPosition))}, ${Math.min(255,Math.max(0,color[1]-lightOffset-lightPosition))}, ${Math.min(255,Math.max(0,color[2]-lightOffset-lightPosition))},1)`;
          context.strokeStyle = context.fillStyle;
          context.beginPath();
          context.moveTo(pixelX3, pixelY3);
          context.lineTo(pixelX4, pixelY4);
          context.lineTo(pixelX6, pixelY6);
          context.lineTo(pixelX5, pixelY5);
          context.stroke();
          context.fill();

          //Draw Right Face
          context.fillStyle = `rgba(${Math.min(255,Math.max(0,color[0]-lightOffset+lightPosition))}, ${Math.min(255,Math.max(0,color[1]-lightOffset+lightPosition))}, ${Math.min(255,Math.max(0,color[2]-lightOffset+lightPosition))},1)`;
          context.strokeStyle = context.fillStyle;
          context.beginPath();
          context.moveTo(pixelX4, pixelY4);
          context.lineTo(pixelX2, pixelY2);
          context.lineTo(pixelX7, pixelY7);
          context.lineTo(pixelX6, pixelY6);
          context.stroke();
          context.fill();

          //Draw Top Face
          context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]},1)`;
          context.strokeStyle = context.fillStyle;
          context.beginPath();
          context.moveTo(pixelX1, pixelY1);
          context.lineTo(pixelX2, pixelY2);
          context.lineTo(pixelX4, pixelY4);
          context.stroke();
          context.lineTo(pixelX3, pixelY3);
          context.stroke();
          context.fill();

        } else {

          //Draw tiles

          // Calculate the isometric coordinates of the current point and its neighbors
          const isoX1 = (x - y) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY1 = (x + y) * Math.sin(Math.PI / ang) / isoLength - mapvalue * isoHeight;
          const isoX2 = (x + 1 - y) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY2 = (x + 1 + y) * Math.sin(Math.PI / ang) / isoLength - mapvalue1 * isoHeight;
          const isoX3 = (x - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY3 = (x + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - mapvalue2 * isoHeight;
          const isoX4 = (x + 1 - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
          const isoY4 = (x + 1 + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - mapvalue3 * isoHeight;

          // Calculate the pixel coordinates of the isometric points
          const pixelX1 = Math.floor(5 * isoX1 + width / 2);
          const pixelY1 = Math.floor(5 * isoY1 + height / 2);
          const pixelX2 = Math.floor(5 * isoX2 + width / 2);
          const pixelY2 = Math.floor(5 * isoY2 + height / 2);
          const pixelX3 = Math.floor(5 * isoX3 + width / 2);
          const pixelY3 = Math.floor(5 * isoY3 + height / 2);
          const pixelX4 = Math.floor(5 * isoX4 + width / 2);
          const pixelY4 = Math.floor(5 * isoY4 + height / 2);


          // Calculate the color of the current point
          const color = colorLookup(map[x][y]);

          // Begin a new path and draw the polygon formed by the current point and its neighbors
          context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]},1)`;
          context.strokeStyle = context.fillStyle;
          context.beginPath();
          context.moveTo(pixelX2, pixelY2);
          context.lineTo(pixelX4, pixelY4);
          context.lineTo(pixelX3, pixelY3);
          context.stroke();
          context.lineTo(pixelX1, pixelY1);
          context.stroke();
          context.fill();
        }
        
      }
    }
  } else {
    canvas.width = 690;
    canvas.height = 690;
    let newZoom = (1-(1-zoom)/2);
    let tileCount = (width - Math.floor(100*(1-newZoom))) - Math.floor(100*(1-newZoom));
    for (let y = Math.floor(100*(1-newZoom)); y < height - Math.floor(100*(1-newZoom)); y++) {
      for (let x = Math.floor(100*(1-newZoom)); x < width - Math.floor(100*(1-newZoom)); x++) {
        const color = colorLookup(map[x][y]);

        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]},1)`;

        let xDiff = x - Math.floor(100*(1-newZoom));
        let yDiff = y - Math.floor(100*(1-newZoom));

        context.fillRect(Math.floor(xDiff*(canvas.width/tileCount)), Math.floor(yDiff*(canvas.height/tileCount)), Math.round(0.5+canvas.width/tileCount), Math.round(0.5+canvas.height/tileCount));
      }
    }
  }
   
}