// Voice Assistant: Ask for last period dates for 3-4 months and symptoms
function startVoiceAssistant() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
  
    const datesNeeded = 4;
    let currentStep = 1;
  
    // Instructions for each step
    const instructions = [
      "Please say the date of your last period, for example, 15th September 2024.",
      "Please provide the date of your period from the month before.",
      "Please provide the date of your period from the second month before.",
      "Please provide the date of your period from three months ago.",
      "Thank you. Now, please list your symptoms for the last month."
    ];
  
    // Start the voice recognition
    recognition.onstart = () => {
      // Speak the current instruction
      speak(instructions[currentStep - 1]);
    };
  
    // Capture the result
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", speechResult);  // For debugging
  
      if (currentStep <= datesNeeded) {
        // Check if the spoken input is a valid date
        const date = parseDate(speechResult);
        if (date) {
          lastPeriodDates.push(date); // Store the date
          currentStep++;
  
          // Move to the next step
          if (currentStep <= datesNeeded) {
            setTimeout(() => {
              recognition.start(); // Restart the recognition for the next date
            }, 2000); // 2-second delay to give the user time
          } else {
            speak(instructions[currentStep - 1]);
            setTimeout(() => {
              recognition.start(); // Start for symptoms
            }, 3000); // 3-second delay before asking for symptoms
          }
        } else {
          // If invalid input, ask for the date again
          speak("I couldn't understand the date. Please try again.");
          setTimeout(() => {
            recognition.start();
          }, 2000); // 2-second delay before restarting
        }
      } else if (currentStep === datesNeeded + 1) {
        // Capture symptoms for the last period
        symptomsData = speechResult.split(" ");
        addCycleData(lastPeriodDates.pop(), symptomsData); // Add the data
        speak("Thank you. The data has been added.");
  
        // Calculate the next cycle and speak the result
        const nextCycle = calculateNextCycle();
        speak(`Your next cycle is expected on ${nextCycle}`);
      }
    };
  
    // Handle recognition error
    recognition.onerror = (event) => {
      speak("Sorry, I couldn't understand. Please try again.");
      setTimeout(() => {
        recognition.start(); // Restart after error
      }, 2000); // 2-second delay
    };
  
    recognition.start(); // Start the voice assistant
  }
  
  // Function to speak the text
  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }
  
  // Function to parse natural language date into a JavaScript Date object
  function parseDate(speechResult) {
    const datePattern = /\d{1,2}(st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}/i;
    const match = speechResult.match(datePattern);
    if (match) {
      const parsedDate = new Date(match[0]);
      return parsedDate;
    }
    return null;
  }
  