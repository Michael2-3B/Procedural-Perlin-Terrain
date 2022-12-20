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

  var factorInput = document.getElementById('factor-input');
  var factorValue = document.getElementById('factor-value');

  var exponentInput = document.getElementById('exponent-input');
  var exponentValue = document.getElementById('exponent-value');

  var peaksInput = document.getElementById('peaks-input');
  var peaksValue = document.getElementById('peaks-value');

  var scaleInput = document.getElementById('scale-input');
  var scaleValue = document.getElementById('scale-value');

  var zoomInput = document.getElementById('zoom-input');
  var zoomValue = document.getElementById('zoom-value');

  var beachInput = document.getElementById('beach-input');
  var beachValue = document.getElementById('beach-value');

  var lightInput = document.getElementById('light-input');
  var lightValue = document.getElementById('light-value');

  var isoHeightInput = document.getElementById('iso-height-input');
  var isoHeightValue = document.getElementById('iso-height-value');

  // Set the initial value of the span to the value of the range input
  persistenceValue.innerText = "Persistence: " + persistenceInput.value;
  octavesValue.innerText = "Octaves: " + octavesInput.value;
  wavelengthValue.innerText = "Wavelength: " + wavelengthInput.value;
  waterValue.innerText = "Water Level: " + waterLevel.value;
  factorValue.innerText = "Max World Height: " + factorInput.value;
  exponentValue.innerText = "Exponent: " + exponentInput.value;
  peaksValue.innerText = "Peaks: " + peaksInput.value;
  scaleValue.innerText = "Canvas Scale: " + scaleInput.value;
  zoomValue.innerText = "Iso Zoom: " + zoomInput.value;
  beachValue.innerText = "Beach Size: " + beachInput.value;
  lightValue.innerText = "Light: " + lightInput.value;
  isoHeightValue.innerText = "Iso Height: " + isoHeightInput.value;

  isoHeightInput.addEventListener('input', function() {
    isoHeightValue.innerHTML = "Iso Height: " + document.getElementById('iso-height-input').value;
    generateMap();
  });

  lightInput.addEventListener('input', function() {
    lightValue.innerHTML = "Light: " + document.getElementById('light-input').value;
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

  factorInput.addEventListener('input', function() {
    factorValue.innerHTML = "Max World Height: " + document.getElementById('factor-input').value;
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

  scaleInput.addEventListener('input', function() {
    scaleValue.innerHTML = "Canvas Scale: " + document.getElementById('scale-input').value;
    document.getElementById('my-canvas').style.transformOrigin = 'top left';
    document.getElementById('my-canvas').style.transform = 'scale(' + document.getElementById('scale-input').value + ')';
  });

  zoomInput.addEventListener('input', function() {
    zoomValue.innerHTML = "Iso Zoom: " + document.getElementById('zoom-input').value;
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
    // If the mouse button is being held down, update the offset values based on the change in mouse position
    if (isMouseDown) {
      if (document.getElementById('checkbox').checked){
        // Set up the scale and rotation factors for the transformation
        const scaleX = 1;
        const scaleY = 1.5;
        const rotation = 45;

        // Calculate the sin and cos of the rotation angle
        const sinR = Math.sin(rotation * Math.PI / 180);
        const cosR = Math.cos(rotation * Math.PI / 180);

        // Calculate the transformed offset values based on the change in mouse position
        const dx = event.offsetX - currentX;
        const dy = event.offsetY - currentY;
        const transformedX = dx * sinR * scaleX + dy * cosR * scaleY;
        const transformedY = -(dx * cosR * scaleX - dy * sinR * scaleY);

        // Update the offset values and the current mouse position
        offsetX += transformedX;
        offsetY += transformedY;
        currentX = event.offsetX;
        currentY = event.offsetY;

        // Update the input elements with the new offset values
        document.getElementById('offset-x-input').value = parseInt(document.getElementById('offset-x-input').value) - parseInt(transformedX);
        document.getElementById('offset-z-input').value = parseInt(document.getElementById('offset-z-input').value) - parseInt(transformedY);

      } else {
        offsetX += event.offsetX - currentX;
        document.getElementById('offset-x-input').value = parseInt(document.getElementById('offset-x-input').value) - parseInt(event.offsetX - currentX);
        offsetY += event.offsetY - currentY;
        document.getElementById('offset-z-input').value = parseInt(document.getElementById('offset-z-input').value) - parseInt(event.offsetY - currentY);
        currentX = event.offsetX;
        currentY = event.offsetY;
      }

      document.getElementById('offset-x-input').value = Math.max(-29999984,Math.min(parseInt(document.getElementById('offset-x-input').value),29999984));
      document.getElementById('offset-z-input').value = Math.max(-29999984,Math.min(parseInt(document.getElementById('offset-z-input').value),29999984));

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

class SeedablePRNG {
  constructor(seed) {
    this.seed = seed;
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

function perlinNoise(width, height, persistence, octaves, prng) {

  const wavelengthValue = document.getElementById('wavelength-input').value;
  const myExponent = document.getElementById('exponent-input').value;
  const myFactor = document.getElementById('factor-input').value;
  const myPeaks = document.getElementById('peaks-input').value;
  const waterLevel = document.getElementById('water-level').value;

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

      let k = x+parseInt(offsetX)+29999984;
      let j = y+parseInt(offsetZ)+29999984;

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
  const myExponent = document.getElementById('exponent-input').value;
  const myFactor = document.getElementById('factor-input').value;
  const myPeaks = document.getElementById('peaks-input').value;
  const waterLevel = document.getElementById('water-level').value;
  const beachSize = 1 + parseFloat(document.getElementById('beach-input').value);
  const light = parseInt(document.getElementById('light-input').value) - 255;
  const zoom = 1 - parseFloat(document.getElementById('zoom-input').value);

  function colorLookup(elevation) {
    let color = Math.max(0, Math.min(254, Math.floor(Math.pow((elevation + 1) / 2 + parseFloat(myPeaks), myExponent) * myFactor)));

    let colors = new Array(3);

    if (color < waterLevel/1.5) {
      colors = [color, Math.min(color+44,255), Math.min(color+128,255)];
    } else if (color < waterLevel) {
      colors = [color, Math.min(color+88,255), 255];
    } else if (color <  Math.min(Math.floor(waterLevel*beachSize),myFactor/(2-beachSize)-waterLevel)) {
      colors = [Math.min(color+150,255), Math.min(color+100,255), color];
    } else if (color < 100) {
      colors = [color, color+88, color];
    } else if (color < 130) {
      colors = [color, color+58, color];
    } else if (color < 160) {
      colors = [color, Math.min(color+29), color];
    } else if (color < 190) {
      colors = [color, color, color];
    } else if (color < 220) {
      colors = [color+30, color+30, color+30];
    } else {
      colors = [Math.min(255,color+60), Math.min(255,color+60), Math.min(255,color+60)];
    }

    for(let i=0; i<3; i++){
      colors[i] = Math.max(0,Math.min(255,colors[i]+light));
    }

    return colors;
  }

  const map = perlinNoise(width, height, persistence, octaves, prng);

  // Generate a heatmap visualization of the Perlin noise values

  if (document.getElementById('checkbox').checked) {
    const isoHeight = parseInt(document.getElementById('iso-height-input').value) / zoom;  // adjust this value to control the height of the isometric view
    const isoWidth = zoom;   // adjust this value to control the width of the isometric view
    const isoLength = zoom;  // adjust this value to control the length of the isometric view

    let minIsoX = Number.MAX_VALUE;
    let minIsoY = Number.MAX_VALUE;
    let maxIsoX = Number.MIN_VALUE;
    let maxIsoY = Number.MIN_VALUE;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // Calculate the isometric coordinates of the current point
        const isoX = (x - y) * Math.cos(Math.PI / 6) / isoWidth;
        const isoY = (x + y) * Math.sin(Math.PI / 6) / isoLength - map[x][y] * isoHeight;

        // Update the minimum and maximum x- and y-coordinates
        minIsoX = Math.min(minIsoX, isoX);
        minIsoY = Math.min(minIsoY, isoY);
        maxIsoX = Math.max(maxIsoX, isoX);
        maxIsoY = Math.max(maxIsoY, isoY);
      }
    }

    // Calculate the size of the canvas based on the minimum and maximum coordinates
    const canvasWidth = Math.ceil(maxIsoX - minIsoX);
    const canvasHeight = Math.ceil(maxIsoY - minIsoY);

    // Set the size of the canvas
    canvas.width = 173;
    canvas.height = 150;

    const ang = 6;

    // Translate the context so that the terrain is centered in the canvas
    context.translate(Math.floor((canvasWidth / 4.6486 - (minIsoX + maxIsoX)) * zoom), Math.floor((canvasHeight / (4.6486/zoom) - (minIsoY + maxIsoY) / 1.75)));

    for (let x = 0; x < width - 1; x++) {
      for (let y = 0; y < height - 1; y++) {
        // Calculate the isometric coordinates of the current point and its neighbors
        const isoX1 = (x - y) * Math.cos(Math.PI / ang) / isoWidth;
        const isoY1 = (x + y) * Math.sin(Math.PI / ang) / isoLength - Math.max((waterLevel/(myFactor/2))-1,map[x][y]) * isoHeight;
        const isoX2 = (x + 1 - y) * Math.cos(Math.PI / ang) / isoWidth;
        const isoY2 = (x + 1 + y) * Math.sin(Math.PI / ang) / isoLength - Math.max((waterLevel/(myFactor/2))-1,map[x + 1][y]) * isoHeight;
        const isoX3 = (x - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
        const isoY3 = (x + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - Math.max((waterLevel/(myFactor/2))-1,map[x][y + 1]) * isoHeight;
        const isoX4 = (x + 1 - (y + 1)) * Math.cos(Math.PI / ang) / isoWidth;
        const isoY4 = (x + 1 + (y + 1)) * Math.sin(Math.PI / ang) / isoLength - Math.max((waterLevel/(myFactor/2))-1,map[x + 1][y + 1]) * isoHeight;

        // Calculate the pixel coordinates of the isometric points
        const pixelX1 = Math.floor(isoX1 + width / 2);
        const pixelY1 = Math.floor(isoY1 + height / 2);
        const pixelX2 = Math.floor(isoX2 + width / 2);
        const pixelY2 = Math.floor(isoY2 + height / 2);
        const pixelX3 = Math.floor(isoX3 + width / 2);
        const pixelY3 = Math.floor(isoY3 + height / 2);
        const pixelX4 = Math.floor(isoX4 + width / 2);
        const pixelY4 = Math.floor(isoY4 + height / 2);

        // Calculate the color of the current point
        const color = colorLookup(map[x][y]);

        // Begin a new path and draw the polygon formed by the current point and its neighbors
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]},1)`;
        context.beginPath();
        context.moveTo(pixelX1, pixelY1);
        context.lineTo(pixelX2, pixelY2);
        context.lineTo(pixelX4, pixelY4);
        context.lineTo(pixelX3, pixelY3);
        context.closePath();
        context.fill();

        // Repeat the process for the other three points
        context.beginPath();
        context.moveTo(pixelX2, pixelY2);
        context.lineTo(pixelX4, pixelY4);
        context.lineTo(pixelX3, pixelY3);
        context.lineTo(pixelX1, pixelY1);
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(pixelX3, pixelY3);
        context.lineTo(pixelX1, pixelY1);
        context.lineTo(pixelX2, pixelY2);
        context.lineTo(pixelX4, pixelY4);
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(pixelX4, pixelY4);
        context.lineTo(pixelX3, pixelY3);
        context.lineTo(pixelX1, pixelY1);
        context.lineTo(pixelX2, pixelY2);
        context.closePath();
        context.fill();
        
      }
    }
  } else {
    canvas.width = width;
    canvas.height = height;
    const imageData = context.createImageData(width, height);
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (x + y * width) * 4;
        const color = colorLookup(map[x][y]);

        imageData.data[index] = color[0];
        imageData.data[index + 1] = color[1];
        imageData.data[index + 2] = color[2];
        imageData.data[index + 3] = 255;
      }
    }
    context.putImageData(imageData, 0, 0);
  }
   
}