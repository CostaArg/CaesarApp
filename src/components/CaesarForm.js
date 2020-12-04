import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function CaesarForm() {
  const [input, setInput] = useState({
    "raw-text": "",
    "shift-number": "",
  });

  const handleChange = (e) => {
    if (e.target.name == "raw-text") {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
    if (
      (e.target.name == "shift-number" && e.target.value >= 1 && e.target.value <= 26) || e.target.value == "" ) {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    setInput({
      "raw-text": "",
      "shift-number": "",
    });
  };

  const output = cipher(input["raw-text"], Number(input["shift-number"]));

  function cipher(rawText, shiftNum) {
    let letterList = rawText.split("");

    for (let index = 0; index < letterList.length; index++) {
      let letter = letterList[index];
      let letterNum = letter.charCodeAt(0);

      if (letterNum >= 65 && letterNum <= 90) {
        letterNum += shiftNum;

        if (letterNum > 90) {
          letterNum -= 26;
        }
      }

      if (letterNum >= 97 && letterNum <= 122) {
        letterNum += shiftNum;

        if (letterNum > 122) {
          letterNum -= 26;
        }
      }

      letter = String.fromCharCode(letterNum);
      letterList[index] = letter;
    }

    let sentence = "";
    letterList.forEach((letter) => {
      sentence += letter;
    });

    return sentence;
  }

  return (
    <div className="container-fluid box">
      <Card className="w-100">
        <Card.Header as="h5" className="title">
          EMPEROR CAESAR'S CIPHER
        </Card.Header>
        <Card.Body>
          <div className="card-header-container">
            <Card.Title>
              To encrypt your message, enter some text and a number from 1 to 26
            </Card.Title>
            <Card.Text className="card-content">
              Emperor Caesar used to use this method to pass messages safely
            </Card.Text>
          </div>
          <div className="form-container">
            <div className="column">
              <div className="badge label">Text to cipher</div>
              <input
                type="text"
                value={input["raw-text"]}
                name="raw-text"
                onChange={handleChange}
                className="mr-4"
              ></input>
            </div>
            <div className="column">
              <div className="badge label">
                Enter number to shift letters by
              </div>
              <input
                type="text"
                value={input["shift-number"]}
                name="shift-number"
                onChange={handleChange}
                className="mr-4"
              ></input>
            </div>
            <Button
              variant="dark"
              onClick={handleReset}
              className="reset-button"
            >
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Jumbotron className="caesar-quote column">
        <h1 className="mr-2">{output}</h1>
        <div>Ave Caesar! Morituri te salutant!</div>
      </Jumbotron>
    </div>
  );
}

export default CaesarForm;
