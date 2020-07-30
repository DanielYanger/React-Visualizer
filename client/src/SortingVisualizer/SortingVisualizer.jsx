import React, { Component } from "react";
import "../App.css";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "./mergeSort.js";
import { getBubbleSortAnimations } from "./bubbleSort.js";

const num_array_bars = 300;
const max_height_bar = 600;

const primary_color = "turquoise";
const secondary_color = "red";
const finish_color = "lawngreen";

const merge_sort_speed = 10;
const bubble_sort_speed = 3;

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < num_array_bars; i++) {
      array.push(randomIntFromInterval(10, max_height_bar));
    }
    this.setState({ array });
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondary_color : primary_color;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * bubble_sort_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const height = newHeight + "px";
          barOneStyle.height = height;
        }, i * bubble_sort_speed);
      }
    }
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        arrayBars[i].style.backgroundColor = finish_color;
      }, (animations.length + i) * bubble_sort_speed);
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondary_color : primary_color;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * merge_sort_speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const height = newHeight + "px";
          barOneStyle.height = height;
        }, i * merge_sort_speed);
      }
    }
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        arrayBars[i].style.backgroundColor = finish_color;
      }, (animations.length + i) * merge_sort_speed);
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: primary_color,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <div
          className="array-bar"
          key="max-height-controller"
          style={{
            backgroundColor: "transparent",
            height: `${max_height_bar}px`,
          }}
        ></div>
        <br></br>
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
