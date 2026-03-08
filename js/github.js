// Logic for GitHub API integration

document.addEventListener('DOMContentLoaded', () => {
    const username = 'mukktinaadh';

    // Fetch user basic data
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.public_repos) {
                const reposEl = document.getElementById('gh-repos');
                if (reposEl) {
                    reposEl.textContent = `${data.public_repos}+`;
                }
            }
        })
        .catch(err => console.error('Error fetching GitHub user data:', err));
});
