 // *****=====----- SkillCrush Bootcamp; Introduction to JavaScript; Class Project #2): Creating A GitHub Repo Gallery -----=====***** //
 
// Global Variables //

const jumbotron = document.querySelector(".overview");

const username = "TheGoodWizard";

const repoList = document.querySelector(".repo-list");

const sectionRepoInfo = document.querySelector(".repos");

const sectionRepoData = document.querySelector(".repo-data");

const repoGalleryBackButton = document.querySelector(".view-repos"); // Selects the 'back to repo page' button.

const filterInput = document.querySelector(".filter-repos"); // Selects repo search input bar.  


// *****=====----- ASYNC FUNCTION TO FETCH GITHUB USER DATA -----=====***** //

 const getUsernameData = async function () {
     const showUsernameRequest = await fetch(`https://api.github.com/users/${username}`);
     const data = await showUsernameRequest.json();
     console.log(data);
     displayUsernameInfo(data);
 };

 getUsernameData();

 // *****=====----- FUNCTION THAT DISPLAYS FETCHED USER INFORMATION ON PAGE -----=====***** //

 const displayUsernameInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
    jumbotron.append(div);
    getRepoList();
 };

 
 // *****=====----- ASYNC FUNCTION RESPONSIBLE FOR FETCHING MY REPOS -----=====***** //

 const getRepoList = async function () {
     const showRepoList = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
     const sectionRepoData = await showRepoList.json();
     displayRepoData(sectionRepoData);
 };

 // *****=====----- FUNCTION RESPONSIBLE FOR DISPLAYING REPO INFORMAtION -----=====***** //

 const displayRepoData = function (repos) {
     filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
 };

 // *****=====----- UNORDERED LIST, CLICK EVENT LISTENER -----=====***** //

 repoList.addEventListener("click", function (e) {
     if (e.target.matches("h3")) {
         const repoName = e.target.innerText;
         getSpecificRepoInfo(repoName);
     }
 });

 
 // *****=====----- ASYNC FUNCTION RESPONSBILE FOR FETCHING REPO INFO ON INDIVIDUAL REPOS -----=====***** //

 const getSpecificRepoInfo = async function (repoName) {
    const specificRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoInfo.json();
    // *****=====----- FETCH LANGUAGE DATA -----=====***** //
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(repoInfo);

    // *****=====----- LIST OF LANGUAGES -----=====***** //

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);

    };
    
    displayRepoInfo = function (repoInfo, languages) {
        repoGalleryBackButton.classList.remove("hide");
        sectionRepoData.innerHTML = "";
        sectionRepoData.classList.remove("hide");
        sectionRepoInfo.classList.add("hide");
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>Name: ${repoInfo.name}</h3>
          <p>Description: ${repoInfo.description}</p>
          <p>Default Branch: ${repoInfo.default_branch}</p>
          <p>Languages: ${languages.join(", ")}</p>
          <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        sectionRepoData.append(div);
    };

    // *****=====----- REPO GALLERY BACK BUTTON EVENT LISTENER CODE -----=====***** //

    repoGalleryBackButton.addEventListener("click", function () {
        sectionRepoInfo.classList.remove("hide");
        sectionRepoData.classList.add("hide");
        repoGalleryBackButton.classList.add("hide");
    });

    // *****=====----- CODE TO MAKE SEARCH FUNCTIONALITY POSSIBLE -----=====*****//

    filterInput.addEventListener("input", function (e){
        const textSearch = e.target.value;
        const repos = document.querySelectorAll(".repo");
        const lowerCaseSearch = textSearch.toLowerCase();

        for (const repo of repos) {
            const repoTextLowerCase = repo.innerText.toLowerCase();
            if (repoTextLowerCase.includes(lowerCaseSearch)) {
                repo.classList.remove("hide");
            } else {
                repo.classList.add("hide");
            }
        }
    });
 

 

 