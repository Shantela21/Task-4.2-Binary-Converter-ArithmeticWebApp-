let operation = '+';

function setOperation(op) {
  operation = op;
}

function calculate() {
  const bin1 = document.getElementById('value1').value;
  const bin2 = document.getElementById('value2').value;

  if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
    alert("Please enter valid binary numbers!");
    return;
  }

  const val1 = parseInt(bin1, 2);
  const val2 = parseInt(bin2, 2);
  let result;

  switch (operation) {
    case '+':
      result = val1 + val2;
      break;
    case '-':
      result = val1 - val2;
      break;
    case '*':
      result = val1 * val2;
      break;
    case '/':
      if (val2 === 0) {
        alert("Cannot divide by zero!");
        return;
      }
      result = Math.floor(val1 / val2);
      break;
    default:
      result = 0;
  }

  const binaryResult = result.toString(2);
  document.getElementById('result').textContent = "Result: " + binaryResult;
}




function evaluateBinaryExpression() {
  const input = document.getElementById("expression").value;

  try {
    // Replace binary numbers with decimal equivalents
    const replaced = input.replace(/[01]+/g, match => parseInt(match, 2));

    // Evaluate the expression using JS (with BODMAS)
    const decimalResult = eval(replaced);

    // Convert the final result back to binary
    const binaryResult = (decimalResult >>> 0).toString(2); // >>> 0 ensures non-negative

    document.getElementById("bodmasResult").textContent = `Result: ${binaryResult}`;
  } catch (err) {
    document.getElementById("bodmasResult").textContent = "Invalid expression!";
  }
}


function generateAsciiTable() {
  const asciiBody = document.getElementById("asciiBody");

  for (let i = 32; i <= 126; i++) {
    const symbol = String.fromCharCode(i);
    const binary = i.toString(2).padStart(8, '0');
    const htmlCode = `&#${i};`;
    const description = `ASCII code for '${symbol}'`;

    const row = `
      <tr>
        <td>${symbol}</td>
        <td>${binary}</td>
        <td>${htmlCode}</td>
        <td>${description}</td>
      </tr>
    `;

    asciiBody.innerHTML += row;
  }
}

// Call it once on page load
window.onload = generateAsciiTable;
