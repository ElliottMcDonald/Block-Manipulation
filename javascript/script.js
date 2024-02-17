let object = document.querySelector(".object");

let objectContainer = document.querySelector(".object-container")

let output = document.querySelector(".output");

let positionXSlider = document.querySelector("#position-x-slider");

let positionYSlider = document.querySelector("#position-y-slider");

output.textContent = positionXSlider.value;

positionXSlider.addEventListener("input", function () {
   output.textContent = this.value;
});

// Manipulate Object on Y-Axis

positionYSlider.addEventListener("input", function () {
   //Convert objects width to percentage of container's width
   const objectHeightPercent = (object.clientHeight / objectContainer.clientHeight) * 100;
   //Calculate max value of slider before object goes beyond container
   const maxYSliderValue = 100 - objectHeightPercent;
   //Take the slider's value unless it is greater than the maxSliderValue, if so 
   //take that to stop object from going off screen.
   let maxObjectMovement = Math.min(this.value, maxYSliderValue)
   //Apply the chosen value as a marginTop style to the objectin percentage form.
   object.style.marginTop = maxObjectMovement + "vh";
});

// Manipulate Object on X-Axis

positionXSlider.addEventListener("input", function () {
   const objectWidthPercent = (object.clientWidth / objectContainer.clientWidth) * 100;
   const maxXSliderValue = 100 - objectWidthPercent;
   let maxObjectMovement = Math.min(this.value, maxXSliderValue)
   object.style.marginLeft = maxObjectMovement + "%";
});