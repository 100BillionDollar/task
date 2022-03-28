import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import SearchBar from './Searchbar';
import SearchIcon from './search-interface-symbol.png';


export default class GifsComponent extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentPage:1,
            items: [],
            itemsLength:[],
            GifperPage:10,
            SlicedData:[]
          };
          this.componentDidMount = this.componentDidMount.bind(this);
          this.handeClick=this.handeClick.bind(this);
 
    }

    componentDidMount(){
        fetch('https://api.giphy.com/v1/gifs/trending?api_key=Dst7UyI10lCaZeA9seXlAWA2qaXf0uGY', {
  method: 'GET', // or 'PUT'
  headers: {
   
  },
  
})
.then(response => response.json())
.then(data => {
    this.setState({
                isLoaded: true,
                 items: data,
                 itemsLength:data.data.length,
                 SlicedData:data.data
              });
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
    }

    handeClick(event){



      this.setState({
        currentPage:parseFloat(event.target.id)
      });
   for(let i=0;i<document.getElementsByTagName('li').length;i++) {
  document.getElementsByTagName('li')[i].classList.remove("active")
   }

   event.target.classList.add("active");
    //  document.getElementsByTagName('li').classList.removeClass("active")
  
    }

 render(){
    const { isLoaded, items,GifperPage,itemsLength,currentPage,SlicedData } = this.state;
 
    const indexoflastgif=currentPage * GifperPage;
    const indexoffirstgif=indexoflastgif - GifperPage;
   const currPage=SlicedData.slice(indexoffirstgif,indexoflastgif);
    const  pageItem=[];

// console.log()
    for(let i=1;i<=Math.ceil(itemsLength/GifperPage);i++){
     pageItem.push(i);
    }
      const pageNumber=pageItem.map(number=>{
      return (<li key={number} id={number} className="list" onClick={this.handeClick} >{number}</li>
      )

    });
          
    
      if(!isLoaded )return<div>
     <h1> Pleses wait some time.... </h1> </div>
     return (<>
       <SearchBar data={items}/>
     <div className="gif-container">
         
             {
            
            currPage.map((obj,index)=>{
                   
                return <div className='gifs-item'><img src={obj.images.downsized_medium.url} key={index} eventKey={index} /> </div>
                 
                     
                     //console.log(obj.user.avatar_url);
                   
                 })
             } 
            
        
     </div>
     <ul className='listContainer' id="list">
             {pageNumber}
             </ul>
     </>

     );
 }
}

