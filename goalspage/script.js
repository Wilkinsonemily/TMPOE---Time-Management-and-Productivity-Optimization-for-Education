document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const continueButtons = document.querySelectorAll('.continue');
    const outerContainer = document.getElementById('whole');
    let currentStep = 0;

    continueButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            steps[currentStep].style.display = 'none';
            currentStep++;
            if (currentStep < steps.length) {
                steps[currentStep].style.display = 'block';
            }
        });
    });

    document.getElementById('finishButton').addEventListener('click', function() {
        outerContainer.style.flexDirection = 'column';
        document.getElementById('summary').style.display = 'block';
        
    });
    function toggleDropdown(toggle) {
        const dropdownContent = toggle.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        toggle.classList.toggle('expanded');
    }

    function showContent(contentId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.style.display = 'none');
        document.getElementById(contentId + 'Content').style.display = 'block';
    }
    // Function to store the value of the clicked button
    function storeButtonValue(key, value) {
        localStorage.setItem(key, value);
    }

    // Function to handle button click and change state
    function handleButtonClick(button, key) {
        // Remove active class from all buttons in the same group
        button.parentElement.querySelectorAll('.option, .time-option').forEach(btn => {
            btn.classList.remove('active-button');
        });

        // Add active class to the clicked button
        button.classList.add('active-button');

        // Store the button value
        storeButtonValue(key, button.value);
    }

    // Add event listeners to each button in step 1
    document.querySelectorAll('#step1 .option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'goalAchievement');
        });
    });

    // Add event listeners to each button in step 2
    document.querySelectorAll('#step2 .time-option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'dailyHours');
        });
    });
    document.querySelectorAll('#step2 .time-options .time-option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'weeklyHours');
        });
    });
    document.querySelectorAll('#step2 .options .option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'restOnWeekends');
        });
    });

    // Add event listeners to each button in step 3
    document.querySelectorAll('#step3 .time-option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'goalTimeframe');
        });
    });
    document.querySelectorAll('#step3 .options .option').forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button, 'reminderFrequency');
        });
    });

    // Function to show the next step
    function showNextStep(currentStepId, nextStepId) {
        document.getElementById(currentStepId).style.display = 'none';
        document.getElementById(nextStepId).style.display = 'block';
    }

    // Add event listeners to continue buttons
    document.getElementById('continueButton1').addEventListener('click', () => {
        // Collect input values from step 1
        storeButtonValue('goalName', document.getElementById('goalName').value);
        storeButtonValue('goalDescription', document.getElementById('goalDescription').value);
        storeButtonValue('achieveDescription', document.getElementById('achieveDescription').value);

        // Proceed to next step
        showNextStep('step1', 'step2');
    });
    document.getElementById('continueButton2').addEventListener('click', () => {
        // Proceed to next step
        showNextStep('step2', 'step3');
    });
    document.getElementById('finishButton').addEventListener('click', () => {
        // Collect input values from step 3
        storeButtonValue('goalTimeframe', document.querySelector('#step3 .active-button').value);
        storeButtonValue('reminderFrequency', document.querySelector('#step3 .options .active-button').value);

        // Proceed to summary step
        showNextStep('step3', 'summary');
    });

    
    async function generatePDF() {
        // Import jsPDF
        const { jsPDF } = window.jspdf;

        // Collect data from localStorage
        const data = {
            goalName: localStorage.getItem('goalName'),
            goalDescription: localStorage.getItem('goalDescription'),
            achieveDescription: localStorage.getItem('achieveDescription'),
            dailyHours: localStorage.getItem('dailyHours'),
            weeklyHours: localStorage.getItem('weeklyHours'),
            restOnWeekends: localStorage.getItem('restOnWeekends'),
            goalTimeframe: localStorage.getItem('goalTimeframe'),
            reminderFrequency: localStorage.getItem('reminderFrequency')
        };

        // Create a new PDF document
        const doc = new jsPDF();

        // Add content to the PDF
        doc.setFontSize(16);
        doc.text('Study Schedule', 20, 20);

        doc.setFontSize(12);
        doc.text(`Goal Name: ${data.goalName}`, 20, 40);
        doc.text(`Goal Description: ${data.goalDescription}`, 20, 50);
        doc.text(`What You Want to Achieve: ${data.achieveDescription}`, 20, 60);
        doc.text(`Hours to Spend Each Day: ${data.dailyHours}`, 20, 70);
        doc.text(`Minimum Hours Per Week: ${data.weeklyHours}`, 20, 80);
        doc.text(`Rest on Weekends: ${data.restOnWeekends}`, 20, 90);
        doc.text(`When to Achieve Goal: ${data.goalTimeframe}`, 20, 100);
        doc.text(`Reminder Frequency: ${data.reminderFrequency}`, 20, 110);

        // Save the PDF
        doc.save('study_schedule.pdf');
    }

    // Example: Call the function when a button is clicked
    document.getElementById('generatePDFButton').addEventListener('click', generatePDF);
    // Add event listener to the download button
    document.getElementById('downloadButton').addEventListener('click', downloadData);
    document.querySelectorAll('.option, .time-option').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('pressed');
        });
    });
});
