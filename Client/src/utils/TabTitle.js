
export const TabTitle = (newTitle) => {

    return (document.title= newTitle.replace(/^./, newTitle[0].toUpperCase()))
}