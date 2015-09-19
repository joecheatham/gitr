// Saves options to chrome.storage


function loopLangs(){

    for( i=0; i<= 25; i++){

    var cbFill = '<input type="checkbox" id="c++">';

    }


}




function save_options() {
    var color = document.getElementById('user').value;
    var likesColor = document.getElementById('like').checked;

    var account = document.getElementById('acc').textContent;

    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor,
        accountInfo: account
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true,


    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
        document.getElementById('acc').textContent = items.accountInfo;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
