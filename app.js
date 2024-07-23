$(document).ready(function() {
    // Exemple de données de contacts (à remplacer par vos données réelles)
    var contacts = [
        { id: 1, name: "Zac gueye", phone: "123-456-7890", email: "zac@example.com", icon: "img/icon1.png" },
        { id: 2, name: "Youssoupha Gueye", phone: "234-567-8901", email: "youssou@example.com", icon: "img/icon2.png" }
        // Ajoutez d'autres contacts au besoin
    ];

    // Afficher la liste des contacts
    function displayContacts() {
        var contactList = $('#contacts');
        contactList.empty();
        contacts.forEach(function(contact) {
            var li = $('<li>').html('<img src="' + contact.icon + '" alt="Icon"> ' + contact.name);
            li.on('click', function() {
                showContactDetails(contact);
            });
            li.on('swiperight', function() {
                editContact(contact.id);
            });
            contactList.append(li);
        });
    }

    // Afficher les détails d'un contact sélectionné
    function showContactDetails(contact) {
        // Redirige vers la page des détails du contact
        window.location.href = "contact-details.html?id=" + contact.id;
    }

    // Ouvrir la page d'édition d'un contact
    function editContact(contactId) {
        // Redirige vers la page d'édition du contact
        window.location.href = "edit-contact.html?id=" + contactId;
    }

    // Ajouter un nouveau contact
    $('#addContactBtn').on('click', function() {
        window.location.href = "add-contact.html";
    });

    // Sauvegarder un nouveau contact
    function createContact() {
        var newContact = {
            id: contacts.length + 1,
            name: $('#addName').val(),
            phone: $('#addPhone').val(),
            email: $('#addEmail').val(),
            icon: "img/default-icon.png" // Utilisez une icône par défaut ou permettez à l'utilisateur de choisir
        };
        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        window.location.href = "index.html";
    }

    // Sauvegarder les modifications apportées à un contact
    function saveContactChanges(contactId) {
        var contact = contacts.find(c => c.id == contactId);
        if (contact) {
            contact.name = $('#editName').val();
            contact.phone = $('#editPhone').val();
            contact.email = $('#editEmail').val();
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
        window.location.href = "index.html";
    }

    // Fonction pour obtenir les paramètres de l'URL
    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // Charger les contacts depuis le stockage local
    function loadContacts() {
        var storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            contacts = JSON.parse(storedContacts);
        }
    }

    // Initialisation de l'application
    function init() {
        loadContacts();

        if (window.location.pathname.endsWith('index.html')) {
            displayContacts();
        } else if (window.location.pathname.endsWith('edit-contact.html')) {
            var contactId = getParameterByName('id');
            var contact = contacts.find(c => c.id == contactId);
            if (contact) {
                $('#editName').val(contact.name);
                $('#editPhone').val(contact.phone);
                $('#editEmail').val(contact.email);
                $('#saveBtn').on('click', function() {
                    saveContactChanges(contactId);
                });
            }
        } else if (window.location.pathname.endsWith('add-contact.html')) {
            $('#createBtn').on('click', createContact);
        } else if (window.location.pathname.endsWith('contact-details.html')) {
            var contactId = getParameterByName('id');
            var contact = contacts.find(c => c.id == contactId);
            if (contact) {
                $('#contactIcon').attr('src', contact.icon);
                $('#contactName').text(contact.name);
                $('#contactPhone').text(contact.phone);
                $('#contactEmail').text(contact.email);
                $('#editBtn').on('click', function() {
                    editContact(contact.id);
                });
                $('#backBtn').on('click', function() {
                    window.location.href = "index.html";
                });
            }
        }
    }

    init();
});
