
# Basic Display Components: _components

Basic Display Components are stateless.
They are reusable standalone display components
Purpose is to receive data of what is to be displayed

Props taken:
displaydatasetup = An object containing setup details for display
displaydataobj = A universal object containing the data that is going into a display component.
handleClick(e) = function for handling clicks on item
updateValue(e) = function for controlling value in item

# App Specific Components: Components

Standalone Components for display and interaction specific to the app. 

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