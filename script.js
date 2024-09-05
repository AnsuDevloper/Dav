window.onload = function() {
    var classSelect = document.getElementById('classSelect');
    var folders = document.getElementById('folders');
    var fileList = document.getElementById('fileList');

    classSelect.addEventListener('change', function() {
        if (classSelect.value) {
            showFiles(classSelect.value);
        } else {
            fileList.style.display = 'none';
            fileList.innerHTML = '';
        }
    });
};

function showFiles(className) {
    var fileList = document.getElementById('fileList');
    var folderPath = `files/${className}/`; // Adjusted for all files in the same folder

    // Simulate fetching files from the folder
    fetchFileList(folderPath).then(files => {
        fileList.innerHTML = '';
        files.forEach(file => {
            var listItem = document.createElement('li');
            var link = document.createElement('a');
            link.textContent = file.name;

            if (file.type === "PDF") {
                link.href = folderPath + file.name;
                link.target = "_blank"; // Open PDF in a new tab
            } else if (file.type === "Word") {
                link.href = folderPath + file.name;
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    convertWordToHtml(link.href);
                });
            }

            listItem.appendChild(link);
            fileList.appendChild(listItem);
        });
        fileList.style.display = 'block';
    });
}

function fetchFileList(folderPath) {
    // Fetch the static JSON file that lists the files
    return fetch('files/fileList.json')
        .then(response => response.json())
        .then(data => {
            // Return files for the selected class folder
            return data.files.filter(file => file.path.startsWith(folderPath));
        });
}

function convertWordToHtml(url) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = function() {
        var content = iframe.contentDocument.body.innerHTML;
        var newWindow = window.open();
        newWindow.document.write(content);
        newWindow.document.close();
        document.body.removeChild(iframe);
    };
}
