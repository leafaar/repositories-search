var inputElement = document.querySelector('input[name=user]');
var listElement = document.querySelector('#app ul');
var nameElement = document.querySelector('#app h3');
var loadingElement = document.querySelector('.loader');

function getUserRepo(user){
    const request = axios.get('https://api.github.com/users/'+ user +'/repos')
    
    request
    .then(function(response){
    })
    .catch(function(error){
        alert(`This user doesn't not exists.`);
    });
    return request
}

axios.interceptors.request.use(function(config) {
    loadingElement.style.display = 'inline-table';
    return config;
  }, function(error) {
    // Do something with request error
    console.log('Error');
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(function(response) {
    // Do something with response data
    loadingElement.style.display = 'none';
  
    return response;
  }, function(error) {
    // Do something with response error
    console.log('Error fetching the data');
    return Promise.reject(error);
  });

function addInfos(){
    var user = inputElement.value;
    nameElement.innerHTML = '';

    if(user == ''){
        alert('You must have write some nickname from github.');
    }else{
        getUserRepo(user)
        .then(function(response){
            var lis = document.querySelectorAll('#app li');
            for(li of lis){
                listElement.removeChild(li);
            }
            var repositories = response.data;
            if(repositories[0] == null){
                alert(`This user doesn't have repositories.`)
                return;
            }
            nameElement.innerHTML = user;
            for(repo of repositories){
                var repoElement = document.createElement('li'); 
                var nameText = document.createTextNode('Name: '); 
                repoElement.style.fontSize = 20;
                repoElement.style.marginLeft = -20;

                var linkElement = document.createElement('a');
                linkElement.setAttribute('href', repo.html_url);

                var text = document.createTextNode(repo.name);
                linkElement.appendChild(text);

                repoElement.appendChild(nameText);
                repoElement.appendChild(linkElement);

                listElement.appendChild(repoElement);
            }

        })
        .catch(function(error){
            console.log(error);
        });
    }
    inputElement.value = '';
}