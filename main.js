/** @type {(import('ag-grid-community').ColDef | import('ag-grid-community').ColGroupDef )[]} */
const columnDefs = [
    { field: "athlete"},
    { field: "age", pinned: "left", editable:true },
    {
      field: "country",
      cellStyle: {
        textAlign: "center",
        color: "red",
        "background-color": "green"
      },
      colSpan: (params) => {
        const country = params.data.country;
        if (country === "Russia") {
          // have all Russia age columns width 2
          return 2;
        } else if (country === "United States") {
          // have all United States column width 4
          return 3;
        } else {
          // all other rows should be just normal
          return 1;
        }
      }
    },
    { field: "year"},
    { field: "date"},
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze"},
    { field: "total", editable: true, cellEditor: "agSelectCellEditor",
    cellEditorParams: { values: [10, 20] }},
  ];
  
  let gridApi;
  
  /** @type {import('ag-grid-community').GridOptions} */
  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      width: 150,
      resizable: true,
    
    },
    autoSizeStrategy: {
      type: 'fitGridWidth',
    },
    suppressHorizontalScroll: true, //隐藏水平滚动条
    onGridSizeChanged: function(event){
      //gridApi.sizeToFit();
      gridApi.sizeColumnsToFit()
      console.log('grid resize width ' + event.clientWidth);
    }
  };
  
  // setup the grid after the page has finished loading
  document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.querySelector("#myGrid");
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
  
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => gridApi.setGridOption("rowData", data));
  });
  