const configurationObject ={
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/vnd.github.v3+json"
  },
  body: JSON.stringify({

  })
}

let isHidden = true;


// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{

// submit form
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    let query = document.getElementById('search').value;

    if (document.getElementById('username').checked === true){
      document.getElementById('user-list').innerHTML = '';
      document.getElementById('hidden').style.display = 'none'
      fetch(`https://api.github.com/search/users?q=${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      })
      .then(res => res.json())
      .then(data => {
        for (result of data.items){
          const li = document.createElement('li');
          li.className = 'usernames'

          const div1 = document.createElement('div');
          const img = document.createElement('img');
          img.src = result['avatar_url'];
          img.alt = 'avatar'
          img.style.height = '200px'
          img.style.width = '200px'
          div1.appendChild(img);

          const div2 = document.createElement('div');
          const user = document.createElement('a');
          user.textContent = `${result.login}`;
          user.href = result['html_url'];
          const repos = document.createElement('p');
          repos.className = 'repoLink'
          repos.id = result.login
          repos.textContent = `${result.login}'s repos`;

          // display repos in hidden container at bottom

          repos.addEventListener('click', (e) => {
            const user = e.target.id
            const hidden = document.getElementById('hidden');
            const hiddenUl = document.getElementById('hiddenUl');
            hiddenUl.innerHTML = ''
            hidden.style.display = 'flex';
            console.log(e.id)
            fetch(`https://api.github.com/users/${user}/repos`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            })
            .then(res => res.json())
            .then(data =>{
              for (repo of data){
                const reposURL = repo['html_url'];
                const li = document.createElement('li');
                li.className = 'repos';
                const a = document.createElement('a');
                a.textContent = `${repo.name}:`
                a.href = reposURL;
                const p = document.createElement('p');
                if (repo.description === null){
                  p.textContent = `no description available`
                  p.style.fontStyle = 'italic'
                } else{
                  p.textContent = `   ${repo.description}`
                }
                
                
                li.appendChild(a);
                li.appendChild(p)

                document.getElementById('hiddenUl').appendChild(li)
              }
            })
          })

          div2.appendChild(user);
          div2.appendChild(repos)

          li.appendChild(div1);
          li.appendChild(div2);


          document.getElementById('user-list').appendChild(li);
        }

      })
    }else{
      document.getElementById('user-list').innerHTML = '';
      document.getElementById('hidden').style.display = 'none'
      fetch(`https://api.github.com/search/repositories?q=${query}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            })
            .then(res => res.json())
            .then(data =>{
              for (repo of data.items){
                const reposURL = repo['html_url'];
                const li = document.createElement('li');
                li.className = 'repos';
                const a = document.createElement('a');
                a.textContent = `${repo.name}:`
                a.href = reposURL;
                const p = document.createElement('p');
                if (repo.description === null){
                  p.textContent = `no description available`
                  p.style.fontStyle = 'italic'
                } else{
                  p.textContent = `  ${repo.description}`
                }
                
                
                li.appendChild(a);
                li.appendChild(p)

                document.getElementById('user-list').appendChild(li)
              }
            })
    }
  })

// end of DOMContentLoaded
})

