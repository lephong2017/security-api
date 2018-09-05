import React,{ Component } from 'react';

import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
export default class extends Component{
    render(){
        return (<div style={{width:'100%',marginTop:'30px',}}>
        <ReactTable data={categorys}
                     loading={isFetchingCategory}
                     defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                     columns={[
                     {
                         Header: "ID",
                         id: "productCategoryCode",
                         accessor: d => d.productCategoryCode,
                         filterMethod: (filter, rows) =>
                         matchSorter(rows, filter.value, { keys: ["productCategoryCode"] }),
                         filterAll: true
                     },
                     {
                         Header: "Description",
                         id: "productCategoryDescription",
                         accessor: d => d.productCategoryDescription,
                         filterMethod: (filter, rows) =>
                         matchSorter(rows, filter.value, { keys: ["productCategoryDescription"] }),
                         filterAll: true
                     },
                     
                     {
                         Header: "Edit",
                         accessor:"productCategoryCode",
                         filterable:false,
                         Cell: row => (
                         <div className="button-table"> 
                             <MyButton small aria_label='EDIT' 
                                 ID={row.value}
                                 obj="cate"
                                 pagination={[
                                     this.state.pageIndex,
                                     this.state.pageSize,
                                     this.state.iSearch
                             ]}/>
                         </div>
                         )
                     },
                     {   
                         Header: "Delete",
                         accessor:"productCategoryCode",
                         filterable:false,
                         Cell: row => (
                         <div className="button-table"> 
                             <MyButton  size="small"  aria_label='DELETE' 
                                 onClickComponent={()=>this.onDelete(row.value)}/> 
                         </div>
                         )
                     }]}
                     defaultPageSize={5}
                     onPageChange={(pageInd) => {
                         var stringFilter = this.state.iSearch;
                             if(stringFilter===''||stringFilter==="ALL"){
                                 var pageVisit = this.state.listPageVisit;
                                 this.setState({
                                 pageIndex:pageInd+1,
                                 listPageVisitFilter:[],
                             },
                                 function(){
                                     // console.log(this.state.listPageVisit);
                                     var isPageVisit= this.state.listPageVisit.includes(pageInd+1);
                                     if(isPageVisit===false){
                                         pageVisit.push(pageInd+1);
                                         this.setState({listPageVisit:pageVisit, });
                                         fetchAllCategory(
                                             this.state.pageSize,
                                             this.state.pageIndex,
                                             "ALL"
                                         );
                                        
                                     }
                                 });
                             }else{
                                 this.setState({pageIndex:pageInd+1,listPageVisit:[]},
                                     function(){
                                         var pageVisit = this.state.listPageVisitFilter;
                                         var isPageVisit= this.state.listPageVisitFilter.includes(pageInd+1);
                                         if(isPageVisit===false){
                                             pageVisit.push(pageInd+1);
                                             this.setState({listPageVisitFilter:pageVisit, });
                                             searchCategory(
                                                 this.state.pageSize,
                                                 this.state.pageIndex,
                                                 stringFilter
                                             );
                                         }

                                     });
                                 }

                         }
                     } // Called when the page index is changed by the user
                     onPageSizeChange={(pSize, pIndex) => {
                         this.setState({
                             pageIndex:pIndex+1,
                             pageSize:pSize,
                             listPageVisit:[],
                             listPageVisitFilter:[],
                         },
                             function(){
                                 if(this.state.iSearch===0||
                                     this.state.iSearch===''||
                                     this.state.iSearch==="ALL"){
                                         fetchAllCategory(
                                             this.state.pageSize,
                                             this.state.pageIndex,
                                             "ALL"
                                         );
                                     }else{
                                         searchCategory(
                                             this.state.pageSize,
                                             this.state.pageIndex,
                                             this.state.iSearch
                                         );
                                     }
                             });                                            
                         }
                     } 
                     className="-striped -highlight"
                 />
        </div>);
    }
}