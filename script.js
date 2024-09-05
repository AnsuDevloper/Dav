window.onload = function() {
    var classSelect = document.getElementById('classSelect');
    var folders = document.getElementById('folders');
    var fileList = document.getElementById('fileList');

    classSelect.addEventListener('change', function() {
        if (classSelect.value) {
            folders.style.display = 'block';
        } else {
            folders.style.display = 'none';
            fileList.style.display = 'none';
            fileList.innerHTML = '';
        }
    });
};

function showFiles(type) {
    var classSelect = document.getElementById('classSelect');
    var fileList = document.getElementById('fileList');
    var className = classSelect.value;
    var folderPath = `files/${className}/${type}/`;

    // Simulate fetching files from the folder
    fetchFileList(folderPath, type).then(files => {
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

function fetchFileList(folderPath, type) {
    // Fetch the static JSON file that lists the files
    return fetch('files/fileList.json')
        .then(response => response.json())
        .then(data => {
            // Filter files based on the folder path and type
            return data.files.filter(file => file.path.startsWith(folderPath) && file.type === type);
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
