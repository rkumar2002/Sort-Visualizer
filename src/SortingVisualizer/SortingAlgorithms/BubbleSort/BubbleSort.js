import getBubbleSortAnimations from "./getBubbleSortAnimations";
import {
  changeBackgroundColor,
  changeBoxShadow,
  swapBars,
  resetBarStyleDefault,
  disableButtons,
  enableButtons,
  playCompletedSoundEffect,
} from "../../HelperFunctions.js";

const BubbleSort = async (array, animationSpeed) => {
  // Disabling the buttons so that the animation cannot be interrupted.
  disableButtons();

  // Getting the animations which have been generated in the "getBubbleSortAnimations" function.
  const animations = getBubbleSortAnimations(array);

  for (let i = 0; i < animations.length; i += 5) {
    const comparingElement1 = animations[i];
    const comparingElement2 = animations[i + 1];
    const doSwap = animations[i + 2];
    const isFinalElement = animations[i + 3];
    const finalElement = animations[i + 4];

    // Wait for the animation to complete
    await new Promise((resolve) => setTimeout(resolve, i * animationSpeed));

    // Changing the color-bar of comparing elements.
    changeBackgroundColor(comparingElement1, "rgba(255,165,0, 0.9)");
    changeBackgroundColor(comparingElement2, "rgba(255,165,0, 0.9)");

    if (doSwap) {
      // Changing the color-bar of elements which have to be swapped.
      changeBackgroundColor(comparingElement1, "rgba(144,238,144, 0.9)");
      changeBackgroundColor(comparingElement2, "rgba(144,238,144, 0.9)");
      // Actually swapping the elements (heights).
      swapBars(comparingElement1, comparingElement2);
    }

    // Wait for the second part of the animation
    await new Promise((resolve) => setTimeout(resolve, (i + 5) * animationSpeed));

    if (isFinalElement) {
      // Changing the color-bar of finalElement index which has taken its final sorted position.
      changeBackgroundColor(finalElement, "rgba(0, 164, 86, 0.6)");
      changeBoxShadow(finalElement, "5px 5px 50px 5px rgba(0, 164, 86, 0.2)");
    } else {
      // Changing the color-bar of element which has not taken its final sorted position yet.
      changeBackgroundColor(comparingElement1, "rgba(225, 0, 120, 0.6)");
      changeBoxShadow(comparingElement1, "rgba(225, 0, 120, 0.2)");
    }

    // Resolve when the finalElement index is 0
    if (finalElement === 0) {
      await new Promise((resolve) => setTimeout(resolve, (i + 5) * animationSpeed));
    }
  }

  // Resetting the color-bar style to default after the animations end.
  resetBarStyleDefault(array, (animations.length + 5) * animationSpeed);

  // Play completed sound effect and enable buttons
  playCompletedSoundEffect();
  enableButtons();
};

export default BubbleSort;