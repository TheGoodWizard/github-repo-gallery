 // *****=====----- SkillCrush Bootcamp; Introduction to JavaScript; Class Project #2): Creating A GitHub Repo Gallery -----=====***** //
 
// Global Variables //

const jumbotron = document.querySelector(".overview");

const username = "TheGoodWizard";

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
 };