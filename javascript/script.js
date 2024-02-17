let output = document.querySelector(".output");

let positionXSlider = document.querySelector("#position-x-slider");

output.textContent = positionXSlider.value;

positionXSlider.addEventListener("input", function () {
   output.textContent = this.value;
});

// Manipulate Object on Y-Axis

let positionYSlider = document.querySelector("#position-y-slider");

let object = document.querySelector(".object");

positionYSlider.addEventListener("input", function () {
   object.style.marginTop = this.value + "px";
});

// Manipulate Object on X-Axis
positionXSlider.addEventListener("input", function () {
   object.style.marginLeft = this.value + "px";
});
