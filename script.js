document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen and show main content
    document.getElementById('loadingScreen').classList.add('hidden');
    document.querySelector('.container').style.display = 'block';
});

let fileData = {};

async function loadFiles() {
    const selectedClass = document.getElementById('classSelect').value;
    if (!selectedClass) {
        alert('Please select a class first.');
        return;
    }

    try {
        // Ensure correct path to fileList.json
        const response = await fetch('fileList.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fileData = await response.json();
        if (fileData[selectedClass]) {
            document.getElementById('folderSection').style.display = 'block';
        } else {
            alert('No data available for the selected class.');
        }
    } catch (error) {
        console.error('Error loading fileList.json:', error);
    }
}

function openFiles(type) {
    const selectedClass = document.getElementById('classSelect').value;
    if (selectedClass && fileData[selectedClass]) {
        const files = fileData[selectedClass][type];
        files.forEach(file => {
            const fileUrl = `files/${selectedClass}/${file}`;
            if (file.endsWith('.pdf')) {
                window.open(fileUrl, '_blank');
            } else if (file.endsWith('.docx') || file.endsWith('.doc')) {
                convertDocxToHtml(fileUrl);
            }
        });
    } else {
        alert('Please select a class first.');
    }
}

function convertDocxToHtml(fileUrl) {
    // Placeholder for converting DOCX to HTML
    window.open(fileUrl, '_blank'); // Currently just opens the file
}
