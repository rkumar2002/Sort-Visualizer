const getBubbleSortAnimations = (array) => {
  const animations = []; // { comparingElement1, comparingElement2, doSwap, isFinalElement, finalElement }

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Animation for comparing two elements
      animations.push(j, j + 1, false, false, -1);
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Animation for swapping two elements
        animations.push(j, j + 1, true, false, -1);
      }
    }
    // Mark the (array.length - 1 - i)th element as sorted
    animations.push(
      array.length - 1 - i,
      array.length - 1 - i,
      false,
      true,
      array.length - 1 - i
    );
  }
  // Final animation to signal completion
  animations.push(0, 0, false, true, 0);

  return animations;
};

export default getBubbleSortAnimations;