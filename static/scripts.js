fillSelect();
console.log("What the heck");
function fillSelect() {
    var select = document.getElementById("user");
    for(u in users){
        console.log(u);
        select.options[select.options.length] = new Option(users[u], u);
    }
};