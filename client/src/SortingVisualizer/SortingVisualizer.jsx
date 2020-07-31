import React, { Component } from "react";
import "../App.css";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "./mergeSort.js";
import { getBubbleSortAnimations } from "./bubbleSort.js";

const num_array_bars = 150;
const max_height_bar = 600;

const primary_color = "turquoise";
const secondary_color = "red";
const finish_color = "lawngreen";

const merge_sort_speed = 5;
const bubble_sort_speed = 3;

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      timeouts: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  cancelSort() {
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = false;
    buttons[1].disabled = false;
    buttons[2].disabled = false;
    buttons[3].disabled = true;
    for (let i = 0; i < this.state.timeouts.length; i++) {
      clearTimeout(this.state.timeouts[i]);
    }
    this.resetArray();
  }

  resetArray() {
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = false;
    buttons[1].disabled = false;
    buttons[2].disabled = false;
    buttons[3].disabled = true;
    const arrayBars = document.getElementsByClassName("array-bar");
    const array = [];
    for (let i = 0; i < num_array_bars; i++) {
      array.push(randomIntFromInterval(10, max_height_bar));
    }
    this.setState({ array });
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = primary_color;
    }
  }

  bubbleSort() {
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = true;
    buttons[1].disabled = true;
    buttons[2].disabled = true;
    buttons[3].disabled = false;
    const timeouts = [];
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondary_color : primary_color;
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * bubble_sort_speed)
        );
      } else {
        timeouts.push(
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const height = newHeight + "px";
            barOneStyle.height = height;
          }, i * bubble_sort_speed)
        );
      }
    }
    for (let i = 0; i < arrayBars.length; i++) {
      timeouts.push(
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = finish_color;
        }, animations.length * bubble_sort_speed + i * 2)
      );
    }
    timeouts.push(
      setTimeout(() => {
        buttons[0].disabled = false;
        buttons[1].disabled = false;
        buttons[2].disabled = false;
        buttons[3].disabled = true;
      }, animations.length * bubble_sort_speed + arrayBars.length * 2)
    );

    this.setState({ timeouts: timeouts });
  }

  mergeSort() {
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = true;
    buttons[1].disabled = true;
    buttons[2].disabled = true;
    buttons[3].disabled = false;
    const timeouts = [];
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? secondary_color : primary_color;
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * merge_sort_speed)
        );
      } else {
        timeouts.push(
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const height = newHeight + "px";
            barOneStyle.height = height;
          }, i * merge_sort_speed)
        );
      }
    }
    for (let i = 0; i < arrayBars.length; i++) {
      timeouts.push(
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = finish_color;
        }, animations.length * merge_sort_speed + i * 2)
      );
    }
    timeouts.push(
      setTimeout(() => {
        buttons[0].disabled = false;
        buttons[1].disabled = false;
        buttons[2].disabled = false;
        buttons[3].disabled = true;
      }, animations.length * merge_sort_speed + arrayBars.length * 2)
    );

    // eslint-disable-next-line
    this.state.timeouts = timeouts;
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
        <div className="footer">
          <button className="button" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button className="button" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button className="button" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
          <button className="button" onClick={() => this.cancelSort()}>
            Cancel Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}