import React, { Component } from "react";
import "../App.css";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "./mergeSort.js";
import { getBubbleSortAnimations } from "./bubbleSort.js";
import { getQuickSortAnimations } from "./quickSort.js";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const max_height_bar = 600;

const primary_color = "turquoise";
const secondary_color = "red";
const finish_color = "lawngreen";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      timeouts: [],
      array_size: 200,
      speed: 3,
      isRunning: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  cancelSort() {
    //sliders
    const sliders = document.getElementsByClassName("slider");
    console.log(sliders);
    sliders[0].disabled = false;
    sliders[1].disabled = false;

    //buttons
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = false; //generate array button
    buttons[1].disabled = false; //merge sort button
    buttons[2].disabled = false; //bubble sort button
    buttons[3].disabled = false; //quick sort button
    buttons[4].disabled = true; //cancel sort button
    for (let i = 0; i < this.state.timeouts.length; i++) {
      clearTimeout(this.state.timeouts[i]);
    }
    this.resetArray();
  }

  resetArray() {
    //sliders
    const sliders = document.getElementsByClassName("slider");
    sliders[0].disabled = false;
    sliders[1].disabled = false;

    //buttons
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = false; //generate array button
    buttons[1].disabled = false; //merge sort button
    buttons[2].disabled = false; //bubble sort button
    buttons[3].disabled = false; //quick sort button
    buttons[4].disabled = true; //cancel sort button
    const arrayBars = document.getElementsByClassName("array-bar");
    const array = [];
    for (let i = 0; i < this.state.array_size; i++) {
      array.push(randomIntFromInterval(10, max_height_bar));
    }
    this.setState({ array });
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = primary_color;
    }
  }

  bubbleSort() {
    //sliders
    const sliders = document.getElementsByClassName("slider");
    sliders[0].disabled = true;
    sliders[1].disabled = true;

    //buttons
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = true; //generate array button
    buttons[1].disabled = true; //merge sort button
    buttons[2].disabled = true; //bubble sort button
    buttons[3].disabled = true; //quick sort button
    buttons[4].disabled = false; //canel sort button

    //array of all the timeouts for canceling
    const timeouts = [];

    //list of all of the animations that need to be exectuted
    const animations = getBubbleSortAnimations(this.state.array);

    //list of all the bars of the array to be sorted
    const arrayBars = document.getElementsByClassName("array-bar");

    //main animation loop
    for (let i = 0; i < animations.length; i++) {
      //all animations come in set of 3
      //1: change color of the compared bars back to secondary color
      //2: change color of the compared bars back to primary color
      //3: change the height of one of the bars
      const isColorChange = i % 3 !== 2;

      //Color changing loop
      if (isColorChange) {
        //getting the index and then style of which bars to change
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //the first time is for changing to secondary color, second time is for changing back to primary
        const color = i % 3 === 0 ? secondary_color : primary_color;

        //adding the timeout to the list so the cancel feature works
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.state.speed)
        );
      } else {
        //pushing a timeout to change the height of the bar
        timeouts.push(
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const height = newHeight + "px";
            barOneStyle.height = height;
          }, i * this.state.speed)
        );
      }
    }

    //aux loop for changing the color to the finish color after completion
    for (let i = 0; i < arrayBars.length; i++) {
      //push the change to the timeout array
      timeouts.push(
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = finish_color;
        }, animations.length * this.state.speed + i * 2)
      );
    }

    //changing the buttons back to enabled
    timeouts.push(
      setTimeout(() => {
        //sliders
        sliders[0].disabled = false;
        sliders[1].disabled = false;
        //buttons
        buttons[0].disabled = false;
        buttons[1].disabled = true;
        buttons[2].disabled = true;
        buttons[3].disabled = true;
        buttons[4].disabled = true;
      }, animations.length * this.state.speed + arrayBars.length * 2)
    );
    //setting the state of the timeouts
    // eslint-disable-next-line
    this.state.timeouts = timeouts;
  }

  mergeSort() {
    //sliders
    const sliders = document.getElementsByClassName("slider");
    sliders[0].disabled = true;
    sliders[1].disabled = true;

    //buttons
    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = true; //generate array button
    buttons[1].disabled = true; //merge sort button
    buttons[2].disabled = true; //bubble sort button
    buttons[3].disabled = true; //quick sort button
    buttons[4].disabled = false; //canel sort button

    //array of all the timeouts for canceling
    const timeouts = [];

    //list of all of the animations that need to be exectuted
    const animations = getMergeSortAnimations(this.state.array);

    //list of all the bars of the array to be sorted
    const arrayBars = document.getElementsByClassName("array-bar");

    //main animation loop
    for (let i = 0; i < animations.length; i++) {
      //all animations come in set of 3
      //1: change color of the compared bars back to secondary color
      //2: change color of the compared bars back to primary color
      //3: change the height of one of the bars
      const isColorChange = i % 3 !== 2;

      //Color changing loop
      if (isColorChange) {
        //getting the index of and then style  which bars to change
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //the first time is for changing to secondary color, second time is for changing back to primary
        const color = i % 3 === 0 ? secondary_color : primary_color;

        //adding the timeout to the list so the cancel feature works
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.state.speed)
        );
      } else {
        //pushing a timeout to change the height of the bar
        timeouts.push(
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const height = newHeight + "px";
            barOneStyle.height = height;
          }, i * this.state.speed)
        );
      }
    }

    //aux loop for changing the color to the finish color after completion
    for (let i = 0; i < arrayBars.length; i++) {
      //push the change to the timeout array
      timeouts.push(
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = finish_color;
        }, animations.length * this.state.speed + i * 2)
      );
    }

    //changing the buttons back to enabled
    timeouts.push(
      setTimeout(() => {
        //sliders
        sliders[0].disabled = false;
        sliders[1].disabled = false;

        //buttons
        buttons[0].disabled = false;
        buttons[1].disabled = true;
        buttons[2].disabled = true;
        buttons[3].disabled = true;
        buttons[4].disabled = true;
      }, animations.length * this.state.speed + arrayBars.length * 2)
    );
    //setting the state of the timeouts
    // eslint-disable-next-line
    this.state.timeouts = timeouts;
  }

  quickSort() {
    //sliders
    const sliders = document.getElementsByClassName("slider");
    sliders[0].disabled = true;
    sliders[1].disabled = true;

    const buttons = document.getElementsByClassName("button");
    buttons[0].disabled = true; //generate array button
    buttons[1].disabled = true; //merge sort button
    buttons[2].disabled = true; //bubble sort button
    buttons[3].disabled = true; //quick sort button
    buttons[4].disabled = false; //canel sort button

    //array of all the timeouts for canceling
    const timeouts = [];

    //list of all of the animations that need to be exectuted
    const animations = getQuickSortAnimations(this.state.array);

    //list of all the bars of the array to be sorted
    const arrayBars = document.getElementsByClassName("array-bar");

    //main animation loop
    for (let i = 0; i < animations.length; i++) {
      //all animations come in set of 3
      //1: change color of the compared bars back to secondary color
      //2: change color of the compared bars back to primary color
      //3: change the height of one of the bars
      const isColorChange = i % 4 !== 2 && i % 4 !== 3;
      //Color changing loop
      if (isColorChange) {
        //getting the index of and then style  which bars to change
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        //the first time is for changing to secondary color, second time is for changing back to primary
        const color = i % 4 === 0 ? secondary_color : primary_color;

        //adding the timeout to the list so the cancel feature works
        timeouts.push(
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.state.speed)
        );
      } else {
        //pushing a timeout to change the height of the bar
        timeouts.push(
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const height = newHeight + "px";
            barOneStyle.height = height;
          }, i * this.state.speed)
        );
      }
    }

    //aux loop for changing the color to the finish color after completion
    for (let i = 0; i < arrayBars.length; i++) {
      //push the change to the timeout array
      timeouts.push(
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = finish_color;
        }, animations.length * this.state.speed + i * 2)
      );
    }

    //changing the buttons back to enabled
    timeouts.push(
      setTimeout(() => {
        //sliders
        sliders[0].disabled = false;
        sliders[1].disabled = false;

        //buttons
        buttons[0].disabled = false;
        buttons[1].disabled = true;
        buttons[2].disabled = true;
        buttons[3].disabled = true;
        buttons[4].disabled = true;
      }, animations.length * this.state.speed + arrayBars.length * 2)
    );
    //setting the state of the timeouts
    // eslint-disable-next-line
    this.state.timeouts = timeouts;
  }

  handleChangeSize = (event, newValue) => {
    this.setState({ array_size: newValue });
  };

  handleChangeSpeed = (event, newValue) => {
    this.setState({ speed: newValue });
  };

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
          <div className="slider-div">
            <Typography>Size of Array</Typography>
            <Slider
              className="slider"
              onChange={this.handleChangeSize}
              aria-labelledby="continuous-slider"
              min={10}
              max={400}
              defaultValue={250}
            />
          </div>
          <button className="button" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button className="button" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>
          <button className="button" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
          <button className="button" onClick={() => this.quickSort()}>
            Quick Sort
          </button>
          <button className="button" onClick={() => this.cancelSort()}>
            Cancel
          </button>
          <div className="slider-div">
            <Typography>Speed</Typography>
            <Slider
              className="slider"
              onChange={this.handleChangeSpeed}
              aria-labelledby="continuous-slider"
              min={0.1}
              max={10}
              defaultValue={3}
            ></Slider>
          </div>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
