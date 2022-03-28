import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import SearchIcon from './search-interface-symbol.png';
import logimg from './logowhite.svg'

export default class SearchBar extends  React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items:this.props.data,
            setSearchData:[] 
          };
          this.SearchFilter=this.SearchFilter.bind(this); 
          this.closeSearch=this.closeSearch.bind(this); 
       
    }

    

    closeSearch(){
        document.getElementById("search").style="display:none"
        
    }

    SearchFilter(e){
    const keyword=e.target.value;
   
    if(keyword!=""){
e.target.parentElement.nextElementSibling.style="display:block";
        const results = this.state.items.data.filter((user) => {
        
            return user.title.toLowerCase().startsWith(keyword.toLowerCase())
         
            // Use the toLowerCase() method to make it case-insensitive
          });
       
          this.setState({
            setSearchData:results
        })
    }else{
        this.setState({
            setSearchData:this.state.items.data
        });
        e.target.parentElement.nextElementSibling.style="display:none";
    }
  

}

 render(){
    document.body.addEventListener('click',this.closeSearch );
    
     return (<>
     <div className="search-container">
        
         <figure className="logo-container"><img src={logimg} alt="logo-img-container"/></figure>
         <div className="search-bar-container">
             <input type="search"  onKeyDown={this.SearchFilter} placeholder='@username + tag to  search within a verified channel'/>
            <button> <img src={SearchIcon} alt="logo-img-container"/></button>
       </div>
       <div className='searchAbsolutContainer' id="search">
           {this.state.setSearchData.map((obj,index)=>{
      return <li>{obj.title}</li>
           })}
       </div>
       
     </div>
     </>

     );
 }
}

