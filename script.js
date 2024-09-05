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
        const response = await fetch('fileList.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        fileData = data.files; // Use the correct JSON path
        
        if (fileData.length > 0) {
            document.getElementById('folderSection').style.display = 'block';
        } else {
            alert('No data available for the selected class.');
            document.getElementById('folderSection').style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading fileList.json:', error);
    }
}

function openFiles(type) {
    const selectedClass = document.getElementById('classSelect').value;
    if (selectedClass) {
        const files = fileData.filter(file => file.path.includes(`Class-${selectedClass.split('-')[1]}`) && file.type === type);
        if (files.length > 0) {
            files.forEach(file => {
                const fileUrl = file.path;
                if (file.type === 'PDF') {
                    window.open(fileUrl, '_blank');
                }
            });
        } else {
            alert('No files available for this type.');
        }
    } else {
        alert('Please select a class first.');
    }
}
