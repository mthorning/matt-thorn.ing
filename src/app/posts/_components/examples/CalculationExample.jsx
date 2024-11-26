import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'

const percentCalc = (input, operand) => (input * operand) / 100
const radiusCalc = input => Math.PI * input * input

function useCalculation(operand, calc) {
  const [inputNumber, setInputNumber] = useState(null)

  const [result, setResult] = useState(null)
  useEffect(() => {
    setResult(calc(inputNumber, operand))
  }, [inputNumber, calc, operand])

  return [result, inputNumber, setInputNumber]
}

function GetCalculation(props) {
  const { operand, calc, resultMessage } = props
  const [result, inputNumber, setInputNumber] = useCalculation(operand, calc)

  function handleInputChange(event) {
    setInputNumber(event.target.value)
  }

  return (
    <>
      <input type="number" onChange={handleInputChange} />
      {inputNumber && (
        <span style={{ marginLeft: '10px' }}>
          {resultMessage(inputNumber, result, operand)}
        </span>
      )}
    </>
  )
}
GetCalculation.defaultProps = {
  operand: 20,
  calc: percentCalc,
  resultMessage(inputNumber, result, operand) {
    return `${operand}% of ${inputNumber} is ${result}`
  },
}

const examples = {
  one: () => (
    <>
      <p>Add a number to get 20%:</p>
      <GetCalculation />
    </>
  ),
  two: () => (
    <>
      <p>Add a number to get 20%:</p>
      <GetCalculation />
      <p>Add a number to get 30%:</p>
      <GetCalculation operand={30} />
    </>
  ),
  three: () => (
    <>
      <p>Add a number to get 20%:</p>
      <GetCalculation />
      <p>Add the circle's radius to get the area:</p>
      <GetCalculation
        calc={radiusCalc}
        resultMessage={(input, result, operand) =>
          `The circle's area is ${result.toFixed(2)}`
        }
      />
    </>
  ),
}

export default function ExampleComponent({ example }) {
  const Component = examples[example]
  return (
    <div
      css={theme => css`
        width: 100%;
        height: 300px;
        padding: 20px;
        border: 1px solid ${theme.textColor};
        margin: 20px 0 20px 0;
        border-radius: 5px;
      `}
    >
      <div
        css={css`
          padding: 10px;
          p {
            margin: 20px 0 10px 0;
          }
          span {
            white-space: nowrap;
          }
        `}
      >
        <Component />
      </div>
    </div>
  )
}
