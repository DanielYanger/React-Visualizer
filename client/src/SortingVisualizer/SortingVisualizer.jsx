import React, { Component } from "react";
import "../App.css";
import "./SortingVisualizer.css";
import { mergeSort, getMergeSortAnimations } from "./mergeSort.js";

const num_array_bars = 100;

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
      array.push(randomIntFromInterval(10, 500));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-contianer">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: "red",
              height: `${value}px`,
            }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
