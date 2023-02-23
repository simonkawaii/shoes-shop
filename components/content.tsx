import Card from "./card"


const dummyList = [
    {
        title: 'a'
    },
    {
        title: 'b'
    },
    {
        title: 'c'
    },
    {
        title: 'd'
    },
    {
        title: 'uwu'
    },
]

function Content() {

const renderList = dummyList.map(({title},index) =>{
return <Card title={title} id={index} key={index}/>
})


console.log([...dummyList,{lol:'uwu'}]);
    
    return ( 
    <section className="grid w-full h-full grid-cols-3 gap-5 m-5">
        {renderList}

    </section> );
}

export default Content;