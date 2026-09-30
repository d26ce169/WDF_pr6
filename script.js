let data = [], page = 0;
let size = 5;

fetch("events.json")
.then(r => {
    if (!r.ok) throw Error();
    return r.json();
})
.then(d => {
    data = d;
    show();
})
.catch(() => {
    document.getElementById("status").innerHTML =
        "Error loading data";
});


function show() {

    let text = document.getElementById("search").value.toLowerCase();
    let cat = document.getElementById("filter").value;
    let sort = document.getElementById("sort").value;

    let result = data
        .filter(x =>
            x.name.toLowerCase().includes(text) &&
            (cat == "All" || x.category == cat)
        )
        .sort((a,b) =>
            a[sort == "Name" ? "name" : "date"]
            .localeCompare(b[sort == "Name" ? "name" : "date"])
        );

    let start = page * size;

    document.getElementById("list").innerHTML =
        result.slice(start, start + size)
        .map(x => `
            <div class="card">
                <b>${x.name}</b>
                <p>${x.category} - ${x.date}</p>
                <button onclick="location.href='index.html'">
                    Register
                </button>
            </div>
        `).join("");
}


function next() {
    page++;
    show();
}

function prev() {
    if (page > 0) page--;
    show();
}


document.getElementById("search")
    .addEventListener("input", show);

document.getElementById("filter")
    .addEventListener("change", show);

document.getElementById("sort")
    .addEventListener("change", show);