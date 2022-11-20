import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const CommonTableComponent = ({ data, columns, pagination }) => {
  const emptyDataMessage = () =>{
    return(
      <>
        <h1>There is no data available</h1>
      </>
    )
  }
  return (
    <>
      <div style={{ position: 'relative' }} className="CommonTable">
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          pagination={data.length > 0 ? paginationFactory({ sizePerPage: pagination }) : null }
          striped
          hover
          condensed
          classes="CustomTable"
          noDataIndication={emptyDataMessage}
          hidePageListOnlyOnePage={false}
          hideSizePerPage={false}
        />
      </div>
    </>
  );
};
export default CommonTableComponent;
