const workList = document.querySelector('#work');
const sportsList = document.querySelector('#sports');
const householdList = document.querySelector('#household');


const view = {
    appendItem(div, data) {
        if(data.category === "work") {
            workList.append(div);
        }
        else if(data.category === "sports") {
            sportsList.append(div);
        }
        else {
            householdList.append(div);
        }
    },
    
    prependItem(div, data) {
        if(data.category === "work") {
            workList.prepend(div);
        }
        else if(data.category === "sports") {
            sportsList.prepend(div);
        }
        else {
            householdList.prepend(div);
        }
    }
}


export default view;