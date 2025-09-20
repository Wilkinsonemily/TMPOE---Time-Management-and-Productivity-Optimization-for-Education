document.addEventListener('DOMContentLoaded', function () {

    function saveValues() {
        const duration = document.getElementById('study-duration').value;
        const interval = document.getElementById('study-interval').value;
        const breaks = document.getElementById('study-breaks').value;
        
        console.log('Duration:', duration);
        console.log('Interval:', interval);
        console.log('Breaks:', breaks);
        // Add your save logic here
    }

    // Default tab
    showTab(durationTab, durationContent);
});
