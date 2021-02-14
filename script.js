document.addEventListener("DOMContentLoaded", () => {
    // localStorage.clear()
    let state = [];

    // console.log(localStorage.getItem('state'));
    if (localStorage.getItem('state')) {
        state = JSON.parse(localStorage.getItem('state'));
    }

    function render(state) {

        clearTable();

        state.forEach(element => {

            let searchElement = document.querySelector(`#${element.eventTime}>.${element.eventDay}`);
            searchElement.style.backgroundColor = "green";
            let btnRemove = document.createElement('button');
            btnRemove.classList = "removeEvent";
            btnRemove.innerHTML = "X";
            searchElement.append(element.eventName, btnRemove);

        });
    }

    render(state);

    function clearTable() {
        let all = document.querySelectorAll("td>button");

        for (let i = 0; i <= all.length; i++) {

            if (all[i] !== undefined) {
                all[i].closest("td").style = "";
                all[i].closest("td").innerHTML = "";
            }

        }

    }

    function participiants() {
        let catchName = document.getElementById("participiants");
        catchName.onchange = (event) => {
            switch (event.target.value) {
                case 'state':
                    render(state)
                    break;
                case 'Dima':
                    let shadowState1 = state.filter(item => item.participiants.includes('Dima'));
                    render(shadowState1)
                    break;
                case 'Ira':
                    let shadowState2 = state.filter(item => item.participiants.includes('Ira'));
                    render(shadowState2)
                    break;
                case 'Cat':
                    let shadowState3 = state.filter(item => item.participiants.includes('Cat'));
                    render(shadowState3)
                    break
            }

        }
    }
    participiants()



    document.body.addEventListener("click", function (event) {
        if (event.target.className == "removeEvent") {
            let modalYorN = document.getElementById('wrapper_modalYorN');
            modalYorN.style.display = 'block';
            let modalYes = document.getElementById('modalYes');
            let modalNo = document.getElementById('modalNo');
            function closeYoN() {
                modalYorN.style.display = 'none';
            }
            modalYes.onclick = () => {
                let classData = event.target.closest("td").className;
                let idData = event.target.closest("tr").id;

                for (let key in state) {

                    if ((state[key].eventDay == classData) && (state[key].eventTime == idData)) {
                        state.splice(key, 1);
                        localStorage.setItem(`state`, JSON.stringify(state));

                        render(state);

                        closeYoN();
                    }
                }
            }
            modalNo.onclick = () => {
                closeYoN()
            }

            // state = state.filter(({ eventDay, eventTime }) => eventTime !== idData && eventDay == classData); ------ its dont work


        }
    });

    // console.log('STATE AFTER: ', state);


    let btnNewEvent = document.getElementById("btn_new_event");
    let modalWindow = document.getElementById("modal_wrapper");
    let closeModal = document.getElementById("close_modal");
    let btnCreateEvent = document.getElementById("btn_create_event");

    btnNewEvent.onclick = () => modalWindow.style.display = "block";

    let closeWindow = closeModal.onclick = () => modalWindow.style.display = "none";

    btnCreateEvent.onclick = () => {

        let { event_name, select_day, select_time, select_participiants } = document.getElementById("modal_window").children;

        let newEvent = {
            eventName: event_name.value,
            eventDay: select_day.value,
            eventTime: select_time.value,
            participiants: select_participiants.value
        };

        if (state.find(item => item.eventDay == newEvent.eventDay && item.eventTime == newEvent.eventTime)) {
            select_day.style.borderColor = 'red'
            select_time.style.borderColor = 'red'
        }
        else {
            state.push(newEvent);
            localStorage.setItem(`state`, JSON.stringify(state));

            render(state);
            closeWindow();
            // console.log(localStorage)
        }
    }

})  