const object = document.querySelector(".object");

const objectContainer = document.querySelector(".object-container");

const output = document.querySelector(".output");

const positionXSlider = document.querySelector("#position-x-slider");

const positionYSlider = document.querySelector("#position-y-slider");

const sizeSlider = document.querySelector("#size-slider");

const opacitySlider = document.querySelector("#opacity-slider");

const shapeTypeSelector = document.querySelector("#shape-type-selector");

const hexInput = document.querySelector("#hex-input");

const hexItem = document.querySelector(".hex-container");

const submitHexInput = document.querySelector("#submit-hex-input");

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
   const triangleShadow = document.querySelector(".triangle-shadow");
   if (triangleShadow) {
      // Correctly checks if triangleShadow exists
      triangleShadow.style.marginTop = maxObjectMovement + "vh";
   }
});

// Manipulate Object on X-Axis

positionXSlider.addEventListener("input", function () {
   const objectWidthPercent =
      (object.clientWidth / objectContainer.clientWidth) * 100;
   const maxXSliderValue = 100 - objectWidthPercent;
   let maxObjectMovement = Math.min(this.value, maxXSliderValue);
   object.style.marginLeft = maxObjectMovement + "%";
   const triangleShadow = document.querySelector(".triangle-shadow");
   if (triangleShadow) {
      // Correctly checks if triangleShadow exists
      triangleShadow.style.marginLeft = maxObjectMovement + "%";
   }
});

//Manipulate Object Size

sizeSlider.addEventListener("input", function () {
   const scaleFactor = parseFloat(this.value);
   //scaleFactor is * by 100 instead of object.clientHeight, as the latter
   //will increase the height exponentially. Using * 100 resets it each time
   //the slider moves.
   const baseSize = 100;
   const newSize = baseSize * scaleFactor;
   function scale(item) {
      item.style.width = newSize + "px";
      item.style.height = newSize + "px";
   }
   scale(object);
   const triangleShadow = document.querySelector(".triangle-shadow");
   if (triangleShadow) {
      triangleShadow.style.borderBottom =
         105 * scaleFactor + "px solid rgba(38, 38, 38, 1)";
      triangleShadow.style.borderLeft =
         55 * scaleFactor + "px solid transparent";
      triangleShadow.style.borderRight =
         52.5 * scaleFactor + "px solid transparent";

      triangleShadow.style.top = 0.06 * scaleFactor + "em";
      triangleShadow.style.left = 0.1 * scaleFactor + "em";
   }
});

//Manipulate Object Opacity

opacitySlider.addEventListener("input", function () {
   object.style.opacity = parseFloat(this.value);
});

//Manipulate Object Shape

shapeTypeSelector.addEventListener("change", function () {
   let triangleShadow = document.querySelector(".triangle-shadow");
   switch (this.value) {
      case "square":
         //Need to specify styles for square so they reload if it is switched to from another option.
         object.style.width = "100px";
         object.style.height = "100px";
         object.style.clipPath = "none";
         object.style.borderRadius = "0.5em";
         object.style.backgroundColor = "red";
         object.style.border = "0.1em solid black";
         object.style.boxShadow =
            "0.15em 0.15em 0.15em 0.15em rgba(38, 38, 38, 1)";
         if (triangleShadow) {
            triangleShadow.style.visibility = "hidden";
         }
         break;
      case "circle":
         object.style.width = "100px";
         object.style.height = "100px";
         object.style.clipPath = "none";
         object.style.borderRadius = "50%";
         object.style.backgroundColor = "red";
         object.style.border = "0.1em solid black";
         object.style.boxShadow =
            "0.15em 0.15em 0.15em 0.15em rgba(38, 38, 38, 1)";
         triangleShadow.style.visibility = "hidden";
         break;
      case "triangle":
         object.style.width = "100px";
         object.style.height = "100px";
         object.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
         object.style.borderRadius = "0px";
         object.style.backgroundColor = "red";
         object.style.zIndex = "11";
         //Method which creates a shadow element and places it
         //behind the object div.
         if (!triangleShadow) {
            triangleShadow = document.createElement("div");
            triangleShadow.classList.add("triangle-shadow");
            objectContainer.appendChild(triangleShadow);
         }
         triangleShadow.style.visibility = "visible";
         triangleShadow.style.width = "100px";
         triangleShadow.style.height = "100px";
         triangleShadow.style.position = "absolute";
         triangleShadow.style.top = "0.06em";
         triangleShadow.style.left = "0.10em";
         triangleShadow.style.backgroundColor = "transparent";
         triangleShadow.style.borderRadius = "0px";
         triangleShadow.style.filter = "blur(0.1em)";
         triangleShadow.style.borderBottom = "105px solid rgba(38, 38, 38, 1)";
         triangleShadow.style.borderLeft = "55px solid transparent";
         triangleShadow.style.borderRight = "52.5px solid transparent";
         triangleShadow.style.zIndex = "10";
         break;
   }
});

//Colour Object According to Hex-Input

const incorrectHexInput = document.createElement("div");
incorrectHexInput.classList.add("incorrect-hex-input");
hexItem.appendChild(incorrectHexInput);
incorrectHexInput.style.position = "absolute";
incorrectHexInput.style.width = "10em";
incorrectHexInput.style.padding = "0.1em";
incorrectHexInput.style.textAlign = "center";
incorrectHexInput.style.backgroundColor = "rgb(248, 244, 182)";
incorrectHexInput.style.borderRadius = "0.5em";
incorrectHexInput.style.border = "0.1em solid black";
incorrectHexInput.style.visibility = "hidden";

hexInput.addEventListener("input", function () {
   if (hexInput.value.length === 0) {
      incorrectHexInput.style.visibility = "hidden";
      hexInput.style.border = "none";
   } else if (!/^[0-9a-fA-F]+$/.test(hexInput.value)) {
      //Content CSS property not applicable to HTML elements directly through the style property.
      incorrectHexInput.textContent =
         "Please enter a value between a-f and 0-9";
      incorrectHexInput.style.visibility = "visible";
      hexInput.style.border = "0.25em solid red";
   } else {
      incorrectHexInput.style.visibility = "hidden";
      hexInput.style.border = "0.1em solid black";
   }
});

submitHexInput.addEventListener("click", function () {
   if (hexInput.value.length !== 6 && hexInput.value.length !== 3) {
      incorrectHexInput.style.visibility = "visible";
      incorrectHexInput.textContent =
         "Please enter a value 3 or 6 characters in length";
      hexInput.style.border = "0.15em solid red";
   } else {
      incorrectHexInput.style.visibility = "hidden";
      hexInput.style.border = "0.1em solid black";
      object.style.backgroundColor = "#" + hexInput.value;
   }
});
