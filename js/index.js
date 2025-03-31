document.addEventListener("DOMContentLoaded", () =>{
    document.getElementById("github-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const query = document.getElementById("search").value;
        searchUsers(query);
    });

    function searchUsers(query){
        const url = `https://api.github.com/search/users?q=${query}`;

        fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayUsers(data.items))
        .catch(error => console.error("Error fetching users:", error));
    }

    function displayUsers(users){
        const userList = document.getElementById("user-list")
        userList.innerHTML = ""; //clears previous results

        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");
            userCard.innerHTML = `<img src = "${user.avatar_url}" alt= "${user.login}">
            <p>${user.login}</p>
            `;
            userCard.addEventListener("click", () => fetchRepos(user.login));
            userList.appendChild(userCard);
        });
    }

    function fetchRepos(username){
        const url = `https://api.github.com/users/${username}/repos`;

        fetch(url)
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error("Error fetching repos:", error));
    }

    function displayRepos(repos){
        const reposList = document.getElementById("repos-list");
        reposList.innerHTML = `<h2>Repositories</h2>`;

        if (repos.length === 0){
            reposList.innerHTML += `<p>No repositories found.</p>`;
            return;
        }

        const repoList = document.createElement("ul");
        repos.forEach(repo => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${repo.html_url}" target= "_blank">${repo.name}</a>`;
            repoList.appendChild(listItem);
        });

        reposList.appendChild(repoList);
    }
})