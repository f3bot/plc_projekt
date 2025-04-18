
let globalUserCount = 1;

console.log(globalUserCount)

const renderYesterday = () =>{
    console.log('here')
    fetch('db.csv')
    .then(response => response.text())
    .then(data =>{
        const rows = data.split('\n').map(row => row.split(';'))
        console.log(rows)
    })
}

const addForm = () =>{
    const container = document.createElement('div');
    container.classList.add('overlay')
    container.classList.add('invisible')

    container.innerHTML = `
        <form id = "user-form" method="post">
            <label for =  '"HMI".User_Struct_${globalUserCount}.login'>Login</label>
            <input type = "number" name = '"HMI".User_Struct_${globalUserCount}.login'>
            <label for =  '"HMI".User_Struct_${globalUserCount}.password'>Password</label>
            <input type = "number" name = '"HMI".User_Struct_${globalUserCount}.password'>
            <label for =  '"HMI".User_Struct_${globalUserCount}.fuel_amount'>Fuel Amount</label>
            <input type = "number" name = '"HMI".User_Struct_${globalUserCount}.fuel_amount'>
            <button id="generate-btn">Auto Generate</button>
            <input type = "submit">
        </form>
    `

    document.body.appendChild(container);
}

document.getElementById('btn').addEventListener('click', (e) =>{
    document.querySelector('.overlay').classList.toggle('visible');
})


renderYesterday()
addForm()

document.getElementById('generate-btn').addEventListener('click', (e) => {
    //Musi być int16, INT w Tiaportal ma tylko 16bitów (-32,768 to 32,767)
    e.preventDefault();
    const form = document.getElementById("user-form");
    const getPositiveInt16 = () => Math.floor(Math.random() * 32768); // 0 to 32767
    form.querySelector(`[name='"HMI".User_Struct_${globalUserCount}.login']`).value = getPositiveInt16();
    form.querySelector(`[name='"HMI".User_Struct_${globalUserCount}.password']`).value = getPositiveInt16();
});