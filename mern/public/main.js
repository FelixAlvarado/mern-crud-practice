


    let list = document.getElementById('list');

    axios.get('http://localhost:4000/people').then(payload =>{
        payload.data.forEach((person) => {
            let item = document.createElement('li');
            item.innerHTML = `Name: ${person.name} City: ${person.city}`;
            list.appendChild(item);
        });
    });
