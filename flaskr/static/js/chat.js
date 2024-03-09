//////////////////////////////////////
// Maintain height of main container
//////////////////////////////////////
function adjustMainHeight() {
    var navHeight = document.querySelector('nav').offsetHeight;
    var footerHeight = document.querySelector('footer').offsetHeight;
    var mainElement = document.querySelector('main');

    var viewportHeight = window.innerHeight;
    var mainHeight = viewportHeight - navHeight - footerHeight;

    mainElement.style.height = mainHeight + 'px';
}

// Run the function again whenever the window is resized
window.addEventListener('resize', adjustMainHeight);


//////////////////////////////////////
// NAVBAR NEW CONVERSATION BTN HOVER 
//////////////////////////////////////
// Change the btn to fill when hovered
$('#newConversationBtn').hover(
    function() {
        const newSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3A.5.5 0 0 0 8 4"/>
            </svg>
        `;
        $(this).html(newSVG);
    },
    function() {
        const originalSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
        </svg>
        `;
        $(this).html(originalSVG);
    }
);


//////////////////////////////////////
// TEXTAREA JS
//////////////////////////////////////
// Function to adjust SVG size
function adjustSvgSize() {
    var svg = document.querySelector('.bi-paperclip');
    var width = window.innerWidth;

    // Bootstrap md breakpoint is 768px
    if (width < 768) {
        svg.setAttribute('width', '32');
        svg.setAttribute('height', '32');
    } else {
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
    }
}

window.addEventListener('resize', adjustSvgSize);

// Change the send btn on hover
$('#formButton').hover(
    function() {
        const newSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#212529" class="bi bi-arrow-right-circle-fill send-btn" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
        `;
        $(this).html(newSVG);
    },
    function() {
        const originalSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#212529" class="bi bi-arrow-right-circle send-btn" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg>
        `;
        $(this).html(originalSVG);
    }
);

// Document uploader
document.querySelector('.bi-paperclip').addEventListener('click', function() {
    document.getElementById('fileUploader').click();
});

// Adjust textarea height function
function adjustTextareaHeight() {
    var textarea = document.getElementById('messageTextArea');
    textarea.style.height = ""; // Reset the height
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"; // Set new height
}

document.getElementById('messageTextArea').addEventListener('input', adjustTextareaHeight);
document.getElementById('messageTextArea').addEventListener('input', adjustMainHeight);

var imageUrl = "";

// Show list of uploaded files
document.getElementById('fileUploader').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        var file = event.target.files[0];
        var fileName = file.name;
        var fileDisplayArea = document.getElementById('fileDisplayArea');

        var fileIconHtml;

        if (file.type.startsWith('image/')) {
            // Create a URL for the image
            imageUrl = URL.createObjectURL(file);
            fileIconHtml = `<img src="${imageUrl}" alt="Uploaded Image" width="24" height="24" class="rounded-3">`;
        } else {
            // Use the default SVG icon
            fileIconHtml = `
                <div class="bg-dark p-2 rounded-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-file-earmark" viewBox="0 0 16 16">
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                    </svg>
                </div>`;
        }

        var fileHtml = `
            <div class="file-container bg-light border rounded-4 p-2 d-flex align-items-center me-3">
                ${fileIconHtml}
                <div class="ms-2 p-1 d-flex flex-column justify-content-center">
                    <span class="fw-bold">${fileName}</span>
                    <span class="fw-lighter">File</span>
                </div>
                <div class="close-symbol position-relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
                </div>
            </div>`;

        fileDisplayArea.innerHTML += fileHtml;

        adjustMainHeight();
        adjustTextareaHeight();
    }
});


document.getElementById('fileDisplayArea').addEventListener('click', function(event) {
    if (event.target.closest('.bi-x-circle-fill')) {
        var fileContainer = event.target.closest('.file-container');
        if (fileContainer) {
            fileContainer.remove();
        }
    }

    adjustMainHeight();
    adjustTextareaHeight();
});




//////////////////////////////////////
// FORMAT OUTPUT AND INPUT
//////////////////////////////////////
// Function to scroll the main content to the bottom
function scrollToBottom() {
    var messagesContainer = document.getElementById("messagesContainer");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to adjust **example** to <strong>example</strong>
function convertToStrong() {
    const textElements = document.querySelectorAll("[id^='responseStream']");

    textElements.forEach(element => {
        let text = element.innerHTML;

        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        element.innerHTML = text;
    });
}

// Converst list into ol and li
function formatContent() {
    const responses = document.querySelectorAll("[id^='responseStream']");
    responses.forEach(response => {
        const content = response.textContent;
        const parts = content.split('\n').filter(part => part.trim() !== '');
        const newContainer = document.createElement('div');

        let currentList = null;
        parts.forEach(part => {
            part = part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

            if (/^\d+\./.test(part)) {
                part = part.replace(/^\d+\.\s*/, '');
                if (!currentList) {
                    currentList = document.createElement('ol');
                    newContainer.appendChild(currentList);
                }

                const listItem = document.createElement('li');
                listItem.innerHTML = part;
                currentList.appendChild(listItem);
            } else {
                currentList = null;
                const paragraph = document.createElement('p');
                paragraph.innerHTML = part;
                newContainer.appendChild(paragraph);
            }
        });

        response.innerHTML = '';
        response.appendChild(newContainer);
    });
}



// Format code blocks
function wrapCodeBlocksInElements() {
    const textElements = document.querySelectorAll("[id^='responseStream']");

    function wrapCodeBlocks(text) {
        const codeBlockPattern = /```([a-z]*)\n([\s\S]*?)\n```/g;

        return text.replace(codeBlockPattern, (match, language, code) => {
            const cleanedCode = code.trim();
            const languageClass = language ? `language-${language}` : 'language-plaintext';
            return `<div style="width: max-content;">
            <div class="code-header d-flex align-items-center justify-content-between bg-secondary rounded-top px-2 text-light">
                <span class="code-language tiny-text">${language}</span>
                <button class="copy-code-btn btn btn-sm tiny-text text-light pe-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                    </svg>
                    Copy Code
                </button>
            </div>
            <pre class="mb-1 rounded-top-0 rounded-3 overflow-x-auto"><code class="${languageClass}">${cleanedCode}</code></pre>
        </div>
        `;
        });
    }

    textElements.forEach(element => {
        const originalHTML = element.innerHTML;
        const modifiedHTML = wrapCodeBlocks(originalHTML);
        element.innerHTML = modifiedHTML;
    });

    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}

// Make sure code input is not rendered
function escapeHTML(text) {
    var textNode = document.createTextNode(text);
    var p = document.createElement('p');
    p.appendChild(textNode);
    return p.innerHTML;
}

//////////////////////////////////////
// SEND FUNCTIONALITY
//////////////////////////////////////
function updateOrderedList() {
    const latexParagraph = document.querySelector('.latex');
    if (!latexParagraph) return;

    // Use innerHTML instead of textContent to preserve formatting
    const items = latexParagraph.innerHTML.split(/\d+\.\s/).slice(1);

    let ol = latexParagraph.nextElementSibling;
    if (!ol || ol.tagName !== 'OL') {
        ol = document.createElement('ol');
        latexParagraph.parentNode.insertBefore(ol, latexParagraph.nextSibling);
    }

    ol.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        // Set innerHTML to preserve any formatting in the item
        li.innerHTML = item;
        ol.appendChild(li);
    });
}

function importantFunctions() {
    updateOrderedList();
    scrollToBottom();
    MathJax.typeset();
    convertToStrong();
    wrapCodeBlocksInElements();
    hljs.highlightAll();
}

function submitChatForm() {
    const prompt = escapeHTML($('textarea[name="message"]').val());
    const number = $('select[name="marks"]').val();

    console.log(number)

    // Clear the text area
    $('textarea[name="message"]').val('');

    const humanMessageTemplate = `
        <div class="d-flex justify-content-end mb-2">
            <div class="rounded-5 bg-dark text-light p-3" style="max-width: 75%">
                <span>${prompt}</span>
            </div>
        </div>
    `;

    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const aiMessageTemplate = `
                <div class="d-flex justify-content-start mb-2">
                    <div class="border p-3 rounded-5 shadow-sm bg-white d-flex flex-column" style="max-width: 90%;">
                        <div class="mb-auto">
                            <div class="mb-1">
                                <span class="fw-bold">BlockChain AI</span>
                                <div class="vr align-text-bottom"></div>
                                <span>Loan Manager</span>
                            </div>
                            <p id="responseStream${id}" class="latex">
                                <!-- Stream content -->
                                <svg id=svgCursor${id} class="bi bi-circle-fill ms-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg>
                            </p>
                        </div>
                    </div>
                </div>
            `;

    $('#messages').append(humanMessageTemplate);
    $('#messages').append(aiMessageTemplate);

    const paragraph = document.getElementById("responseStream" + id);
    const svgCursor = document.getElementById("svgCursor" + id);

    scrollToBottom();

    // Clear the files container html
    document.getElementById("fileDisplayArea").innerHTML = "";

    let formData = new FormData();
    let file = document.getElementById('fileUploader').files[0];  // Get the first file
    
    // Add only the single selected file
    if (file) {  // Ensure there is a file selected
        formData.append('file', file);
    }
    
    // Add other form data
    formData.append('json_data', JSON.stringify({
        prompt: prompt,
        subject: subject,
        grade: grade,
        number: number,
    }));

    console.log(formData);

    // Do batch updates to latex etc.
    let chunkCount = 0;

    fetch('/chat', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response);
        console.log(response.response);
    
        const reader = response.body.getReader();
    
        return new ReadableStream({
            start(controller) {
                function push() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            // remove svg cursor after finish
                            const svgCursor = document.getElementById("svgCursor" + id);
                            if (svgCursor) {
                                svgCursor.remove();
                            }
                            
                            const svgElement = document.querySelector('ol li svg');
                            if (svgElement) {
                                svgElement.remove();
                            }
                            
                            controller.close();
                            importantFunctions();
                            return;
                        }
                        
                        const chunk = new TextDecoder("utf-8").decode(value);

                        chunkCount += 1;
                        if (chunkCount >= 10) {
                            importantFunctions();
                            chunkCount = 0;
                        }

                        if (chunk == '97908324857') {
                            fetchAndUpdateConversations();
                            push();
                            return;
                        }

                        paragraph.innerHTML = paragraph.innerHTML.replace(svgCursor.outerHTML, '') + chunk + svgCursor.outerHTML;
                        controller.enqueue(value);
                        push();
    
                        
                    });
                }
                push();
            }
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        isSubmitting = false;
    });    
}

$(document).ready(function() {
    // Capture form button submission
    $('#chatForm').submit(function(event) {
        event.preventDefault();
        submitChatForm();
    });

    // Pressing enter activates the button
    document.getElementById('messageTextArea').addEventListener('keydown', function(event) {
        if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
            event.preventDefault();
            submitChatForm();
        }
        adjustTextareaHeight();
        adjustMainHeight();
    });
});


// Copy clipboard of code block
document.addEventListener('click', function(event) {
    // Check if the clicked element is a copy-code-btn
    if (event.target.classList.contains('copy-code-btn')) {
        const button = event.target;
        const code = button.parentElement.nextElementSibling.innerText;
        navigator.clipboard.writeText(code).then(() => {
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/></svg>Code copied!';

            setTimeout(() => {
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"> <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/> </svg> Copy Code';
            }, 2000);
        });
    }
});


// Class selector
let grade = 10
function updateClass(classNumber) {
    document.getElementById('classNumber').textContent = classNumber;
    grade = classNumber;
    startNewConversation();
}

// Subject selector
let subject = 'Mathematics'
function updateSubject(subjectName) {
    document.getElementById('subjectName').textContent = subjectName;
    subject = subjectName;
    startNewConversation();
}


//////////////////////////////////////
// RUN EVERYTHING AT LOAD
//////////////////////////////////////
adjustMainHeight();
adjustSvgSize();
wrapCodeBlocksInElements();
hljs.highlightAll();
updateOrderedList();



$(document).ready(function() {
    // Capture form button submission
    $('#newConversationForm').submit(function(event) {
        event.preventDefault();
        console.log("btn clicked new conversation")
        startNewConversation();
    });
});

function startNewConversation() {
    console.log("start new conversation");
    
    // Remove 'active' class from all conversations
    document.querySelectorAll('.nav-link.text-light').forEach(function(link) {
        link.classList.remove('active');
    });

    fetch('/chat/new-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // You can send additional data if needed
        body: JSON.stringify({ message: 'Start new conversation', 
                            grade: grade,
                            subject: subject}) 
    })
    .then(data => {
        // do functionality here
        $('#messages').empty();
        console.log('New conversation started:', data);
        fetchAndUpdateConversations();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}