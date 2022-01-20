import React, { useMemo } from 'react'
import { PageContentWrapper } from '../styles/StyledComponents';
import { useTable, useGlobalFilter, usePagination, useSortBy } from 'react-table'
import { GlobalTableFilter } from './GlobalTableFilter';
import Button from './Button';

const LinkHistory = (props) => {

    const data = useMemo(()=> props.data.map(link => {
        // console.log(link.createdOn.toLocaleDateString())
        return (
            {
                createdOn: new Date(link.createdOn).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}), //NEED TO FORMAT THIS BETTER
                link: link.link,
                // user: link.user, //TAKING THIS OUT FOR NOW UNTIL WE GET BETTER ABOUT GETTING FNAME AND LNAME
            }
        )
    }),[props.data])

    const columns = useMemo(
        () => [
          {
            Header: 'Date',
            accessor: 'createdOn', // accessor is the "key" in the data
          },
          {
            Header: 'URL',
            accessor: 'link',
          }
        //   {
        //     Header: 'User',
        //     accessor: 'user'
        //   }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        state,
        setGlobalFilter,
    } = useTable({
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const { globalFilter, pageIndex } = state;

    console.log(props.data);

    return (
        <>
            <PageContentWrapper>
                <h1>Your Link History</h1>
                {
                    (!props.data || props.data.length === 0) ?
                    <div className='empty-state'>
                        <h2>You haven't created any links yet</h2>
                        <a href='/create'>
                            <Button primary>
                                Create a Link
                            </Button>
                        </a>
                    </div>
                    :
                    <>
                        <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
                        <div className="table-wrapper">
                            <table {...getTableProps()}
                                >
                            <thead>
                                {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                    >
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? '\u25B2' : '\u25BC') : ''}
                                        </span>
                                    </th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                        <td
                                            {...cell.getCellProps()}
                                            // style={{
                                            // padding: '10px',
                                            // border: 'solid 1px gray',
                                            // }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                        )
                                    })}
                                    </tr>
                                )
                                })}
                            </tbody>
                            </table>
                        </div>
                        <div className="table-nav-wrapper">
                            <div className="table-nav-header-wrapper">
                            <div className="table-nav-button-header">
                                <p>Page{' '}{pageIndex + 1} of {pageOptions.length}</p>
                            </div>
                            <span>
                                Go to Page: {' '}
                                <input
                                    type="text"
                                    onChange={e => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(pageNumber)
                                }} />
                                </span>
                            </div>
                            <div className="table-nav-button-wrapper">
                                <div className="table-nav-buttons">
                                    <div className="first-button">
                                        <Button primary disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</Button>
                                    </div>
                                    <div>
                                        <Button primary disabled={!canNextPage} onClick={() => nextPage()}>Next</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </PageContentWrapper>

            <style jsx>{`
                {/* .history-table {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                } */}

                table {
                    width: 100%;
                    background-color: #fff;
                    border-radius: 5px;
                    padding: 20px;
                    font-size: 15px;
                }

                .table-wrapper {
                    width: 100%;
                    display: flex;
                    align-self: center;
                }

                th {
                    background-color: #be995575;
                    height: 35px;
                    font-size: 16px;
                }

                tr {
                    height: 45px;
                }

                td {
                    padding: 10px;
                    box-sizing: border-box;
                }

                tr:nth-child(even) {background: #f3f3f3}

                {/* tr:hover {
                    cursor: pointer;
                    background-color: #f3f3f3;
                } */}

                {/* .table-title {
                    background-color: #efefef;
                    margin-bottom: 30px;
                } */}

                {/* .table-title h1 {
                    padding-left: 20px;
                } */}

                {/* .table-row p {
                    padding: 12px;
                    font-size: 18px;
                    margin: 0;
                } */}

                {/* .table-row p:hover {
                    background-color: #fdfdfd
                } */}

                .table-nav-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                }

                {/* .table-nav-button-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                } */}

                .table-nav-wrapper input {
                    width: 35px;
                    max-width: 35px;
                    text-align: center;
                    height: 35px;
                    /* margin-left: 10px; */
                    border: none;
                    border-radius: 5px;
                    background-color: #e7e7e7;
                    /* padding: 0px 10px 0px 10px; */
                    font-size: 16px;
                }

                .table-nav-header-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .table-nav-wrapper input:focus {
                    outline: none;
                }

                .table-nav-button-header {
                    padding-right: 20px;
                }

                .table-nav-buttons {
                    display: flex;
                    flex-direction: row;
                }

                .first-button {
                    margin-right: 10px;
                }

                .empty-state {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 50vh;
                }

            `}</style>
        </>
    )
}

// }

export default LinkHistory
