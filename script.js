document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen and show main content
    document.getElementById('loadingScreen').classList.add('hidden');
    document.querySelector('.container').style.display = 'block';
    populateClassDropdown();
});

let fileData = {};

async function populateClassDropdown() {
    // Populate class dropdown
    try {
        const response = await fetch('fileList.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const classSelect = document.getElementById('classSelect');

        // Populate dropdown with available classes
        const classes = new Set(data.files.map(file => file.path.split('/')[1]));
        classes.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls;
            option.textContent = cls;
            classSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading fileList.json:', error);
    }
}

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
        fileData = data.files;

        const files = fileData.filter(file => file.path.includes(selectedClass));
        if (files.length > 0) {
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
        const files = fileData.filter(file => file.path.includes(selectedClass) && file.type === type);
        if (files.length > 0) {
            // Clear previous file list
            const fileListDiv = document.getElementById('fileList');
            fileListDiv.innerHTML = '';

            files.forEach(file => {
                const link = document.createElement('a');
                link.href = file.path;
                link.textContent = file.name;
                link.target = '_blank'; // Open in a new tab
                fileListDiv.appendChild(link);
                fileListDiv.appendChild(document.createElement('br'));
            });
        } else {
            alert('No files available for this type.');
        }
    } else {
        alert('Please select a class first.');
    }
}
