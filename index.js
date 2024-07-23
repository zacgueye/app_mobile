function ajouterTache() {
    const task = document.getElementById('task');
    if (task.value) {
        const tasklist = document.getElementById('tasklist');
        // Ajout d'un élément <li> avec la valeur de la tâche
        tasklist.innerHTML += `<li>${task.value}</li>`;
        // Rafraîchissement de la liste si tu utilises jQuery Mobile
        $(tasklist).listview('refresh');
        // Réinitialisation du champ de saisie
        task.value = '';
        task.focus();
    }
}

function reinistialiserTache() {
    const tasklist = document.getElementById('tasklist');
    const task = document.getElementById('task');
    // Réinitialisation de la liste et du champ de saisie
    tasklist.innerHTML = '';
    task.value = '';
    task.focus();
}
