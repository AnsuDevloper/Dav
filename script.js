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
        const folderUrl = fileData[selectedClass].files;
        fetch(folderUrl).then(response => response.text()).then(text => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a');
            links.forEach(link => {
                const fileUrl = folderUrl + link.getAttribute('href');
                const fileName = link.getAttribute('href');
                if (fileName.endsWith('.pdf')) {
                    window.open(fileUrl, '_blank');
                } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
                    convertDocxToHtml(fileUrl);
                }
            });
        }).catch(error => {
            console.error('Error fetching folder contents:', error);
        });
    } else {
        alert('Please select a class first.');
    }
}

function convertDocxToHtml(fileUrl) {
    // Placeholder for converting DOCX to HTML
    window.open(fileUrl, '_blank'); // Currently just opens the file
}
