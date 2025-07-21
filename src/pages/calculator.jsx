import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const Button = ({ onClick, className, children, ...props }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-2xl font-medium transition-all duration-150 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="w-80 mx-auto mt-8 bg-black rounded-3xl p-4 shadow-2xl">
      {/* Display */}
      <div className="mb-6 p-6 text-right min-h-24 flex items-end justify-end">
        <div className="text-white text-6xl font-light">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          onClick={clear}
          className="bg-gray-400 text-black hover:bg-gray-300 h-16 rounded-full"
        >
          AC
        </Button>
        <Button
          onClick={handlePlusMinus}
          className="bg-gray-400 text-black hover:bg-gray-300 h-16 rounded-full"
        >
          +/-
        </Button>
        <Button
          onClick={handlePercentage}
          className="bg-gray-400 text-black hover:bg-gray-300 h-16 rounded-full"
        >
          %
        </Button>
        <Button
          onClick={() => performOperation('÷')}
          className="bg-orange-500 text-white hover:bg-orange-400 h-16 rounded-full"
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          onClick={() => inputNumber(7)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          7
        </Button>
        <Button
          onClick={() => inputNumber(8)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          8
        </Button>
        <Button
          onClick={() => inputNumber(9)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          9
        </Button>
        <Button
          onClick={() => performOperation('×')}
          className="bg-orange-500 text-white hover:bg-orange-400 h-16 rounded-full"
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          onClick={() => inputNumber(4)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          4
        </Button>
        <Button
          onClick={() => inputNumber(5)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          5
        </Button>
        <Button
          onClick={() => inputNumber(6)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          6
        </Button>
        <Button
          onClick={() => performOperation('-')}
          className="bg-orange-500 text-white hover:bg-orange-400 h-16 rounded-full"
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          onClick={() => inputNumber(1)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          1
        </Button>
        <Button
          onClick={() => inputNumber(2)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          2
        </Button>
        <Button
          onClick={() => inputNumber(3)}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          3
        </Button>
        <Button
          onClick={() => performOperation('+')}
          className="bg-orange-500 text-white hover:bg-orange-400 h-16 rounded-full"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          onClick={() => inputNumber(0)}
          className="bg-gray-700 text-white hover:bg-gray-600 col-span-2 h-16 rounded-full"
        >
          0
        </Button>
        <Button
          onClick={inputDecimal}
          className="bg-gray-700 text-white hover:bg-gray-600 h-16 rounded-full"
        >
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="bg-orange-500 text-white hover:bg-orange-400 h-16 rounded-full"
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;