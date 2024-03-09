// Collapsibility for sidebar
$(".collapseBtn").on('click', function() {
    $('#sidebar').toggleClass('active');
});

// Change the direction of the sidebar collapse btn direction
$('#sidebarCollapseBtn').hover(
    function() {
        // On hover in
        if ($('#sidebar').hasClass('active')) {
            $(this).addClass('hover-active');
        } else {
            $(this).addClass('hover-inactive');
        }
    },
    function() {
        // On hover out
        $(this).removeClass('hover-active hover-inactive');
    }
);

// Load up a previous conversation
function loadMessages(c_id) {
    const humanMessageTemplate = `
                <div class="d-flex justify-content-end mb-2">
                    <div class="rounded-5 bg-dark text-light p-3" style="max-width: 75%">
                        <span>Human message content here</span>
                    </div>
                </div>
            `;

            // TODO: MAKE THE SUBJECT NAME WORK
    const aiMessageTemplate = `
                <div class="d-flex justify-content-start mb-2">
                    <div class="border p-3 rounded-5 shadow-sm bg-white d-flex flex-column" style="max-width: 90%;">
                        <div class="mb-auto">
                            <div class="mb-1">
                                <span class="fw-bold">Class 10</span>
                                <div class="vr align-text-bottom"></div>
                                <span>Mathematics</span>
                            </div>
                            <p id="responseStream" class="latex">
                                AI message content here
                            </p>
                        </div>
                    </div>
                </div>
            `;

    $.ajax({
        url: '/chat/' + c_id,
        type: 'GET',
        success: function(messages) {
            $('#messages').empty();

            messages.forEach(function(message, index) {
                if (message.is_ai) {
                    var aiMessage = aiMessageTemplate.replace("AI message content here", message.content);

                    $('#messages').append(aiMessage);
                } else {
                    var humanMessage = humanMessageTemplate.replace("Human message content here", message.content);

                    $('#messages').append(humanMessage);
                }
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

// Event listener for adding the approprite .active class to the links
document.addEventListener('DOMContentLoaded', function() {
    let isInitialLoad = true; // Flag to track the initial load

    // Mutation observer to watch for changes in the DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                if (!isInitialLoad) {
                    // Find the first .nav-link.text-light element
                    const firstNavLink = document.querySelector('.nav.flex-column .nav-link.text-light');
                    if (firstNavLink) {
                        // Remove 'active' class from all conversations
                        document.querySelectorAll('.nav.flex-column .nav-link.text-light').forEach(function(link) {
                            link.classList.remove('active');
                        });

                        // Add 'active' class to the first .nav-link.text-light
                        firstNavLink.classList.add('active');
                    }
                }
                isInitialLoad = false; // Update the flag after the first mutation
            }
        });
    });

    // Start observing
    const navFlexColumn = document.querySelector('.nav.flex-column');
    if (navFlexColumn) {
        observer.observe(navFlexColumn, { childList: true });
    }

    // Event delegation for click events on dynamically loaded links
    navFlexColumn.addEventListener('click', function(e) {
        let target = e.target;
        while (target != null && !target.matches('.nav-link.text-light')) {
            target = target.parentElement;
        }

        if (target && target.matches('.nav-link.text-light')) {
            e.preventDefault();

            // Remove 'active' class from all conversations
            document.querySelectorAll('.nav-link.text-light').forEach(function(link) {
                link.classList.remove('active');
            });

            // Add 'active' class to the clicked conversation
            target.classList.add('active');

            var c_id = target.getAttribute('data-cid');
            if (c_id) {
                loadMessages(c_id);
            }
        }
    });
});




// Function to handle sidebar conversation titles
function fetchAndUpdateConversations() {
    $.ajax({
        url: '/chat/get-conversations',
        method: 'GET',
        success: function(conversations) {
            updateConversationsList(conversations);
        },
        error: function(error) {
            console.error('Error fetching conversations:', error);
        }
    });
}

function updateConversationsList(conversations) {
    var html = '';
    conversations.forEach(function(conv) {
        if (conv.title == 'New chat') {
            return;
        }
        html += `<li class="nav-item">
                    <a class="nav-link text-light px-0 py-2 nav-link-hover rounded" href="#" data-cid="${conv.c_id}">
                        <div class="px-1 text-truncate">${conv.title}</div>
                    </a>
                </li>`;
    });
    $('.nav.flex-column').html(html);
}

$(document).ready(function() {
    $(document).on('click', '.nav-link.text-light', function(e) {
        e.preventDefault();

        var c_id = $(this).data('cid');
        if (c_id) {
            loadMessages(c_id);
        }
    });
    
    fetchAndUpdateConversations();


});