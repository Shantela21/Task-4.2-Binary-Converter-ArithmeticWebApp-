let operation = '+';
let currentTab = 'calculator';

function switchTab(tabName) {
  currentTab = tabName;
  
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Remove active class from all tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab content
  document.getElementById(tabName).classList.add('active');
  
  // Add active class to clicked button
  event.target.classList.add('active');
}

function setOperation(op) {
  operation = op;
  
  // Update active operation button
  document.querySelectorAll('.operations button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
}

function calculate() {
  const bin1 = document.getElementById('value1').value;
  const bin2 = document.getElementById('value2').value;
  const resultElement = document.getElementById('result');

  if (!bin1 || !bin2) {
    resultElement.textContent = 'Error: Please enter both binary numbers';
    resultElement.style.color = 'var(--error)';
    return;
  }

  if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
    resultElement.textContent = 'Error: Please enter valid binary numbers (0s and 1s only)';
    resultElement.style.color = 'var(--error)';
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
        resultElement.textContent = 'Error: Cannot divide by zero';
        resultElement.style.color = 'var(--error)';
        return;
      }
      result = Math.floor(val1 / val2);
      break;
    default:
      result = 0;
  }

  const binaryResult = result.toString(2);
  resultElement.textContent = `Result: ${binaryResult} (Decimal: ${result})`;
  resultElement.style.color = 'var(--text-primary)';
}




function convertDecimalToBinary() {
  const decimalInput = document.getElementById('decimalInput').value;
  const resultElement = document.getElementById('decimalToBinaryResult');
  
  if (!decimalInput) {
    resultElement.textContent = 'Error: Please enter a decimal number';
    resultElement.style.color = 'var(--error)';
    return;
  }
  
  const decimal = parseInt(decimalInput, 10);
  
  if (isNaN(decimal) || decimal < 0) {
    resultElement.textContent = 'Error: Please enter a valid positive decimal number';
    resultElement.style.color = 'var(--error)';
    return;
  }
  
  const binary = decimal.toString(2);
  resultElement.textContent = `Binary: ${binary}`;
  resultElement.style.color = 'var(--success)';
}

function convertBinaryToDecimal() {
  const binaryInput = document.getElementById('binaryInput').value;
  const resultElement = document.getElementById('binaryToDecimalResult');
  
  if (!binaryInput) {
    resultElement.textContent = 'Error: Please enter a binary number';
    resultElement.style.color = 'var(--error)';
    return;
  }
  
  if (!/^[01]+$/.test(binaryInput)) {
    resultElement.textContent = 'Error: Please enter valid binary numbers (0s and 1s only)';
    resultElement.style.color = 'var(--error)';
    return;
  }
  
  const decimal = parseInt(binaryInput, 2);
  resultElement.textContent = `Decimal: ${decimal}`;
  resultElement.style.color = 'var(--success)';
}

function evaluateBinaryExpression() {
  const input = document.getElementById("expression").value;
  const resultElement = document.getElementById("bodmasResult");

  if (!input) {
    resultElement.textContent = 'Error: Please enter a binary expression';
    resultElement.style.color = 'var(--error)';
    return;
  }

  try {
    // Validate that expression contains only binary numbers and valid operators
    if (!/^[01\s\(\)\+\-\*\/]+$/.test(input)) {
      throw new Error('Invalid characters in expression');
    }
    
    // Replace binary numbers with decimal equivalents
    const replaced = input.replace(/[01]+/g, match => parseInt(match, 2));

    // Evaluate the expression using JS (with BODMAS)
    const decimalResult = eval(replaced);

    // Convert the final result back to binary
    const binaryResult = (decimalResult >>> 0).toString(2); // >>> 0 ensures non-negative

    resultElement.textContent = `Result: ${binaryResult} (Decimal: ${decimalResult})`;
    resultElement.style.color = 'var(--success)';
  } catch (err) {
    resultElement.textContent = 'Error: Invalid binary expression!';
    resultElement.style.color = 'var(--error)';
  }
}


function generateAsciiTable() {
  const asciiBody = document.getElementById("asciiBody");
  
  // Clear existing content
  asciiBody.innerHTML = '';

  // Generate ASCII table for printable characters (32-126)
  for (let i = 32; i <= 126; i++) {
    const symbol = String.fromCharCode(i);
    const binary = i.toString(2).padStart(8, '0');
    const htmlCode = `&#${i};`;
    let description = '';
    
    // Add descriptions for common characters
    if (i === 32) description = 'Space';
    else if (i >= 48 && i <= 57) description = `Digit '${symbol}'`;
    else if (i >= 65 && i <= 90) description = `Uppercase letter '${symbol}'`;
    else if (i >= 97 && i <= 122) description = `Lowercase letter '${symbol}'`;
    else if (i === 33) description = 'Exclamation mark';
    else if (i === 44) description = 'Comma';
    else if (i === 46) description = 'Period';
    else if (i === 63) description = 'Question mark';
    else description = `ASCII code for '${symbol}'`;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${symbol}</td>
      <td>${binary}</td>
      <td>${htmlCode}</td>
      <td>${description}</td>
    `;

    asciiBody.appendChild(row);
  }
}

// Initialize the app
window.onload = function() {
  generateAsciiTable();
  
  // Add input validation
  document.getElementById('value1').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value && !/^[01]*$/.test(value)) {
      e.target.value = value.replace(/[^01]/g, '');
    }
  });
  
  document.getElementById('value2').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value && !/^[01]*$/.test(value)) {
      e.target.value = value.replace(/[^01]/g, '');
    }
  });
  
  document.getElementById('binaryInput').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value && !/^[01]*$/.test(value)) {
      e.target.value = value.replace(/[^01]/g, '');
    }
  });
  
  document.getElementById('decimalInput').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value && !/^\d*$/.test(value)) {
      e.target.value = value.replace(/[^0-9]/g, '');
    }
  });
};
