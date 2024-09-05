document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('classSelect');
    const folderSection = document.getElementById('folderSection');
    const wordBtn = document.getElementById('wordBtn');
    const pdfBtn = document.getElementById('pdfBtn');

    // Classes 1 to 9 in the format "Class-1", "Class-2", etc.
    const classes = ['Class-1', 'Class-2', 'Class-3', 'Class-4', 'Class-5', 'Class-6', 'Class-7', 'Class-8', 'Class-9'];

    // Dynamically populate the dropdown
    classes.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls;
        option.textContent = cls;
        classSelect.appendChild(option);
    });

    classSelect.addEventListener('change', () => {
        folderSection.style.display = 'block';
    });

    wordBtn.addEventListener('click', () => {
        const selectedClass = classSelect.value;
        window.open(`files/${selectedClass}/Word/`, '_blank');
    });

    pdfBtn.addEventListener('click', () => {
        const selectedClass = classSelect.value;
        window.open(`files/${selectedClass}/PDF/`, '_blank');
    });
});
