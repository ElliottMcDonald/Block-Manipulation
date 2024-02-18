const object = document.querySelector(".object");

const objectContainer = document.querySelector(".object-container");

const output = document.querySelector(".output");

const positionXSlider = document.querySelector("#position-x-slider");

const positionYSlider = document.querySelector("#position-y-slider");

const sizeSlider = document.querySelector("#size-slider");

const opacitySlider = document.querySelector("#opacity-slider");

output.textContent = positionXSlider.value;

positionXSlider.addEventListener("input", function () {
   output.textContent = this.value;
});

// Manipulate Object on Y-Axis

positionYSlider.addEventListener("input", function () {
   //Convert objects width to percentage of container's width
   const objectHeightPercent =
      (object.clientHeight / objectContainer.clientHeight) * 100;
   //Calculate max value of slider before object goes beyond container
   const maxYSliderValue = 100 - objectHeightPercent;
   //Take the slider's value unless it is greater than the maxSliderValue, if so
   //take that to stop object from going off screen.
   let maxObjectMovement = Math.min(this.value, maxYSliderValue);
   //Apply the chosen value as a marginTop style to the objectin percentage form.
   object.style.marginTop = maxObjectMovement + "vh";
});

// Manipulate Object on X-Axis

positionXSlider.addEventListener("input", function () {
   const objectWidthPercent =
      (object.clientWidth / objectContainer.clientWidth) * 100;
   const maxXSliderValue = 100 - objectWidthPercent;
   let maxObjectMovement = Math.min(this.value, maxXSliderValue);
   object.style.marginLeft = maxObjectMovement + "%";
});

//Manipulate Object Size

sizeSlider.addEventListener("input", function () {
   scaleFactor = parseFloat(this.value);
   //scaleFactor is * by 100 instead of object.clientHeight, as the latter
   //will increase the height exponentially. Using * 100 resets it each time
   //the slider moves.
   object.style.width = scaleFactor * 100 + "px";
   object.style.height = scaleFactor * 100 + "px";
});

//Manipulate Object Opacity

opacitySlider.addEventListener("input", function () {
   object.style.opacity = parseFloat(this.value);
});
