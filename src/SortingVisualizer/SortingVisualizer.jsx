import React, { useState, useEffect, useCallback } from "react";
// .. COMPONENTS .. //
import Header from "./Components/Header/Header.jsx";
import ButtonsBar from "./Components/ButtonsBar/ButtonsBar.jsx";
import ArrayBar from "./Components/ArrayBar/ArrayBar.jsx";
import RangeSlider from "./Components/RangeSliders/RangeSlider.jsx";
// .. HELPER FUNCTIONS .. //
import { randomIntFromInterval, playAudio } from "./HelperFunctions.js";
// .. ALGORITHMS .. //
import BubbleSort from "./SortingAlgorithms/BubbleSort/BubbleSort.js";
import SelectionSort from "./SortingAlgorithms/SelectionSort/SelectionSort.js";
import InsertionSort from "./SortingAlgorithms/InsertionSort/InsertionSort.js";
// .. STYLE .. //
import "./SortingVisualizer.css";
// .. SOUNDS .. //
import ResetEffect from "./sounds/ResetEffect.mp3";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [numberOfArrayBars, setNumberOfArrayBars] = useState(10);

  useEffect(() => {
    generateNewArray();
  }, [numberOfArrayBars]);

  // Generate a new random array
  const generateNewArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < numberOfArrayBars; i++) {
      newArray.push(randomIntFromInterval(5, 70));
    }
    playAudio(ResetEffect);
    setArray(newArray);
  }, [numberOfArrayBars]);

  // Handle changes in the "Array Size" slider
  const onChangeArrayBarRangeSlider = (event, value) => {
    setNumberOfArrayBars(value);
  };

  // Handle changes in the "Animation Speed" slider
  const onChangeAnimationSpeedRangeSlider = (event, value) => {
    setAnimationSpeed(value);
  };

  // Call BubbleSort algorithm
  const bubbleSort = () => {
    BubbleSort(array, animationSpeed);
  };

  // Call SelectionSort algorithm
  const selectionSort = () => {
    SelectionSort(array, animationSpeed);
  };

  // Call InsertionSort algorithm
  const insertionSort = () => {
    InsertionSort(array, animationSpeed);
  };

  return (
    <div className="main-container">
      {/* --------------------- HEADER --------------------- */}
      <Header />

      {/* --------------------- BUTTONS --------------------- */}
      <ButtonsBar
        generateNewArray={generateNewArray}
        bubbleSort={bubbleSort}
        selectionSort={selectionSort}
        insertionSort={insertionSort}
      />

      {/* --------------------- BARS --------------------- */}
      <ArrayBar array={array} />

      {/* --------------------- SLIDERS --------------------- */}
      <RangeSlider
        numberOfArrayBars={numberOfArrayBars}
        animationSpeed={animationSpeed}
        onChangeArrayBarRangeSlider={onChangeArrayBarRangeSlider}
        onChangeAnimationSpeedRangeSlider={onChangeAnimationSpeedRangeSlider}
      />
    </div>
  );
};

export default SortingVisualizer;
