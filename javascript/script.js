const object = document.querySelector(".object");

const objectContainer = document.querySelector(".object-container");

const output = document.querySelector(".output");

const positionXSlider = document.getElementById("position-x-slider");

const positionYSlider = document.getElementById("position-y-slider");

const sizeSlider = document.getElementById("size-slider");

const opacitySlider = document.getElementById("opacity-slider");

const shapeTypeSelector = document.getElementById("shape-type-selector");

const hexInput = document.getElementById("hex-input");

const hexItem = document.querySelector(".hex-container");

const submitHexInput = document.getElementById("submit-hex-input");

// Manipulate Object on Y-Axis

function yAxisManipulation() {
   //The maximum value the object can be moved, taking into account its own size.
   //Note even though objectContainer height is defined in vh, using
   //clientHeight property reads its height in pixels.
   const maxYValue = objectContainer.clientHeight - object.clientHeight;
   //The slider value matches the percentage across the y-axis the shape needs
   //to move. To make this into a pixel measurement which changes based on
   //on the size of the container, we convert the slider's position to a
   //decimal. Then times it by the maximum space space available in
   //the container. This gives us the number of pixels to the object
   //should be moved to match the slider percentage.
   let sliderAsDecimal = positionYSlider.value / 100;
   let proposedYPosition = maxYValue * sliderAsDecimal;
   //Now move the object on the y-axis by either the calculated value or the
   //maximum amount of space, whichever is smaller.
   object.style.marginTop = Math.min(proposedYPosition, maxYValue) + "px";
   //Reselect the triangle.shadow as it is created in a local scope elsewhere
   //in the script.js file so the const triangleShadow is not accessible.
   const triangleShadow = document.querySelector(".triangle-shadow");
   // Correctly checks if triangleShadow exists
   if (triangleShadow) {
      //Use object's client height to manipulate the triangle shadow element to
      //ensure it moves in a synchronised manner.
      triangleShadow.style.marginTop =
         Math.min(proposedYPosition, maxYValue) + "px";
   }
}

positionYSlider.addEventListener("input", () => yAxisManipulation());

// Manipulate Object on X-Axis

function xAxisManipulation() {
   //Calculate the percentage of the container the object takes up.
   const objectWidthPercent =
      (object.clientWidth / objectContainer.clientWidth) * 100;
   //As we are using the slider value to represent the percentage
   //the object it moved, find the percentage of free space once the
   //object is accounted for and set this as the max X axis movement to
   //ensure the object does not beyond the container.
   const maxXAxisMovement = 100 - objectWidthPercent;
   //Set the maximum amount the object will move, either the slider
   //value, or if this is too great, the max amount permitted to prevent
   //it from going beyond the container. Make the a percentage and
   //move the object to the left according to it.
   let maxObjectMovement = Math.min(positionXSlider.value, maxXAxisMovement);
   object.style.marginLeft = maxObjectMovement + "%";
   const triangleShadow = document.querySelector(".triangle-shadow");
   if (triangleShadow) {
      // Correctly checks if triangleShadow exists
      triangleShadow.style.marginLeft = maxObjectMovement + "%";
   }
}

positionXSlider.addEventListener("input", () => xAxisManipulation());

//Manipulate Object Size

function scaleItems() {
   const scaleFactor = parseFloat(sizeSlider.value);
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
}

sizeSlider.addEventListener("input", () => scaleItems());

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
         object.style.clipPath = "none";
         object.style.borderRadius = "0.5em";
         function setBackgroundColor() {
            if (lastColorChange === "hex") {
               object.style.backgroundColor = "# + hexInput.value";
            } else if (lastColorChange === "rgba") {
               object.style.backgroundColor = `rgba(${rSlider.value}, ${gSlider.value}, ${bSlider.value}, ${aSlider.value})`;
            }
         }
         setBackgroundColor();
         object.style.border = "0.1em solid black";
         object.style.boxShadow =
            "0.15em 0.15em 0.15em 0.15em rgba(38, 38, 38, 1)";
         scaleItems();
         if (triangleShadow) {
            triangleShadow.style.visibility = "hidden";
         }
         break;
      case "circle":
         object.style.clipPath = "none";
         object.style.borderRadius = "50%";
         setBackgroundColor();
         object.style.border = "0.1em solid black";
         object.style.boxShadow =
            "0.15em 0.15em 0.15em 0.15em rgba(38, 38, 38, 1)";
         scaleItems();
         if (triangleShadow) {
            triangleShadow.style.visibility = "hidden";
         }
         break;
      case "triangle":
         object.style.width = "100px";
         object.style.height = "100px";
         object.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
         object.style.borderRadius = "0px";
         setBackgroundColor();
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
         yAxisManipulation();
         xAxisManipulation();
         scaleItems();
         break;
   }
});

//Colour Object According to Hex-Input

let lastColorChange;

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
incorrectHexInput.style.marginTop = "4.5em";
incorrectHexInput.style.marginLeft = "1em";
incorrectHexInput.style.visibility = "hidden";

const hideMessage = () => {
   incorrectHexInput.style.visibility = "hidden";
};

const showMessage = () => {
   incorrectHexInput.style.visibility = "visible";
};

hexInput.addEventListener("input", function () {
   if (hexInput.value.length === 0) {
      hideMessage();
      hexInput.style.border = "none";
   } else if (!/^[0-9a-fA-F]+$/.test(hexInput.value)) {
      //Content CSS property not applicable to HTML elements directly through the style property.
      incorrectHexInput.textContent =
         "Please enter a value between a-f and 0-9";
      showMessage();
      setTimeout(() => {
         hideMessage();
      }, 2500);
      hexInput.style.border = "0.25em solid red";
   } else {
      incorrectHexInput.style.visibility = "hidden";
      hexInput.style.border = "0.1em solid black";
   }
});

submitHexInput.addEventListener("click", function () {
   lastColorChange = "hex";
   if (hexInput.value.length !== 6 && hexInput.value.length !== 3) {
      incorrectHexInput.textContent =
         "Please enter a value 3 or 6 characters in length";
      showMessage();
      setTimeout(() => {
         hideMessage();
      }, 3000);
      hexInput.style.border = "0.15em solid red";
   } else {
      hideMessage();
      hexInput.style.border = "0.1em solid black";
      object.style.backgroundColor = "#" + hexInput.value;
   }
});

//Colour Object According to RGBA Sliders

const rSlider = document.getElementById("r-slider");
const gSlider = document.getElementById("g-slider");
const bSlider = document.getElementById("b-slider");
const aSlider = document.getElementById("a-slider");

let rgbaSliders = document.querySelectorAll(".rgba-slider-group input");

rgbaSliders.forEach((element) => {
   element.addEventListener("change", function () {
      object.style.backgroundColor = `rgba(${rSlider.value}, ${gSlider.value}, ${bSlider.value}, ${aSlider.value})`;
   });
});
