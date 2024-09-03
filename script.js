window.onload = function() {
    // Prompt for username and password
    var username = prompt("Enter username:");
    var password = prompt("Enter password:");

    if (username !== "admin" || password !== "Dav") {
        alert("Access Denied");
        document.body.innerHTML = ""; // Clear the page content
        return;
    }

    // List of files (replace with actual files in your GitHub repo)
    var files = [
        { name: "Example.pdf", type: "pdf" },
        { name: "Sample.docx", type: "word" }
    ];

    var fileList = document.getElementById('fileList');

    files.forEach(function(file) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        
        link.textContent = file.name;

        if (file.type === "pdf") {
            link.href = "Files/" + file.name;
            link.target = "_blank"; // Open PDF in a new tab
        } else if (file.type === "word") {
            link.href = "Files/" + file.name;
            link.addEventListener('click', function(event) {
                event.preventDefault();
                var filePath = link.href;
                window.location.href = "ms-word:ofe|u|" + filePath; // Trigger Word program
            });
        }

        listItem.appendChild(link);
        fileList.appendChild(listItem);
    });
};
