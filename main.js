
/*
<!-- create -->
<form method="post" action="/list">
    <label for="name">Create A Task: </label><br>
    <input type="text" id="c" name="name" 
        value="enter task here"><br>
    <input type="submit" value="Create Task">
</form>

<!-- read -->
<form method="get" action="/list">
    <label for="get">Read Tasks: </label><br>
    <input type="submit" value="Show Tasks">
</form>
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // Create header and append to body tag
  const title = document.createElement('h1');
  title.innerHTML = 'Task Tracker';
  document.querySelector('body').appendChild(title);

/*
<-- insert 'title' inside the <body> </body> -->
<h1>Task Tracker</h1> // --> stored as a const called 'title'
*/
    
  // create a form to add a task
  const createTask = document.createElement('h2');
  createTask.innerHTML = 'Create Task';
  document.querySelector('body').appendChild(createTask);

  const nameSpan = document.createElement('span');
  nameSpan.innerHTML = 'name: ';
  document.querySelector('body').appendChild(nameSpan);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'nameInput');
  document.querySelector('body').appendChild(nameInput);

  document.querySelector('body').appendChild(document.createElement('br'));

//   const summarySpan = document.createElement('span');
//   summarySpan.innerHTML = 'Summary: ';
//   document.querySelector('body').appendChild(summarySpan);

//   const summaryInput = document.createElement('input');
//   summaryInput.setAttribute('id', 'summaryInput');
//   document.querySelector('body').appendChild(summaryInput);

//   document.querySelector('body').appendChild(document.createElement('br'));

//   const dueDateSpan = document.createElement('span');
//   dueDateSpan.innerHTML = 'Due Date: ';
//   document.querySelector('body').appendChild(dueDateSpan);

//   const dueDateInput = document.createElement('input');
//   dueDateInput.setAttribute('id', 'dueDateInput');
//   document.querySelector('body').appendChild(dueDateInput);

  const createBtn = document.createElement('button');
  createBtn.setAttribute('id', 'createData');
  createBtn.innerHTML = 'Create Tasks';
  document.querySelector('body').appendChild(createBtn);

  document.querySelector('body').appendChild(document.createElement('br'));

  // creates get tasks button and append to body tag
  const getBtn = document.createElement('button');
  getBtn.setAttribute('id', 'getData');
  getBtn.innerHTML = 'Get Tasks';
  document.querySelector('body').appendChild(getBtn);

  // create div for data
  const dataDiv = document.createElement('div');
  dataDiv.setAttribute('id', 'dataDiv');
  document.querySelector('body').appendChild(dataDiv);

function deleteData(_id) {
    //return console.log('delete has been clicked');
    console.log('delete has been clicked');
    fetch('/list', {
        method: 'DELETE',
        body: JSON.stringify({
          _id
        }),
        headers: { 'Content-Type': 'application/json' },})
        // .then((data) => data.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
  }

    function createData() {
        console.log('create task button pressed');
        const name = document.getElementById('nameInput').value;
        document.getElementById('nameInput').value = '';
        fetch('/list', {
            method: 'POST',
            body: JSON.stringify({
                name
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            // .then((data) => data.json())
            .then((data) => {
                console.log(data);
                getData();
            })
            .catch((err) => console.error(err));
    // getData();
  }

  // function to get tasks from the database
  function getData() {
    fetch('/list')
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const clearDiv = document.getElementById('dataDiv');
        clearDiv.innerHTML = '';
        for (const el of data) {
          const task = document.createElement('p');
          task.setAttribute('id', `${el._id}`);
          const deleteBtn = document.createElement('button');
          task.innerHTML = `Name: ${el.name}`;
          document.getElementById('dataDiv').appendChild(task);
          deleteBtn.setAttribute('id', 'deleteData');
          deleteBtn.innerHTML = '❌';
          deleteBtn.onclick = () => deleteData(`${el._id}`);
          document.getElementById(`${el._id}`).appendChild(deleteBtn);
        }
      });
  }

  // get the data whent the get data button is clicked
  document.getElementById('createData').addEventListener('click', function () {
    createData();
  });

  document.getElementById('getData').addEventListener('click', function () {
    getData();
  });
});