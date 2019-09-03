Basic Display Components

Display components are stateless.
They are standard issue display units
Purpose is to receive data of what is to be displayed

Props taken:
displaydataobj = A universal object containing the data that is going into a display component.
handleClick(e) = function for handling clicks on item
updateValue(e) = function for controlling value in item


Object = {
    text: "",
    value:
    id:
}

Objectlist = [Object,...]

Listobj = {
    Object.uuid: {Object},
    Object.uuid: {Object},
    ...
}

dataobj = {
    datatype: Object/Objlist/Listobj
}

displaydataobj = {
    type: List/Table/Form
    dataobj: {
        datatype: datatype
        data: []/{}
    }
}