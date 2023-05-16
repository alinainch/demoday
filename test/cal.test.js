test('Test onclick button  - console log my name', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  const button = document.createElement('button');
  button.setAttribute('id', 'addEventBtn');
  button.onclick = () => {
    console.log('alina');
  };

  // Append the button to the document
  document.body.appendChild(button);

  // Trigger the onclick method
  button.click();

  // Assert that console.log was called with the expected message
  expect(consoleSpy).toHaveBeenCalledWith('alina')

  //require the path to my client-side js
  require('../public/cal.js')
})

test('Test if addEventBtn correctly extracts eventName', () => {
  const button = document.createElement('button');
  button.setAttribute('id', 'addEventBtn');
  button.onclick = () => {
    console.log('alina');
  };

  const input = document.createElement('input');
  input.setAttribute('id', 'addEventID');
  input.value = 'Run errands'

  // Append the input to the document
  document.body.appendChild(input);

  //assign the value of the input to eventName
  const eventName = document.getElementById('addEventID').value

   // Trigger the onclick method
   button.click();
   
  //This is the assertion - the actual test 
  expect(eventName).toEqual('Run errands')

  //require the path to my client-side js
  require('../public/cal.js')
})
