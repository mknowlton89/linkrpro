import React, { useMemo } from 'react'
import { PageContentWrapper } from '../styles/StyledComponents';
import { useTable, useGlobalFilter, usePagination, useSortBy } from 'react-table'
import { GlobalTableFilter } from './GlobalTableFilter';
import Button from './Button';

const LinkHistory = (props) => {

    const data = useMemo(()=> props.data.map(link => {
        return (
            {
                createdOn: link.createdOn,
                link: link.link,
                user: link.user,
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
          },
          {
            Header: 'User',
            accessor: 'user'
          }
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

    return (
        <>
            <PageContentWrapper>
                <h1>Your Link History</h1>
                <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <div className="table-wrapper">
                    {/* <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
                    <table {...getTableProps()}
                        style={{
                            border: 'solid 1px black',
                            fontSize: '15px'
                        }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                borderBottom: 'solid 1px black',
                                color: 'black',
                                fontWeight: 'bold',
                                height: '25px',
                                fontSize: '17px'
                                }}
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
                                    style={{
                                    padding: '10px',
                                    border: 'solid 1px gray',
                                    }}
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
                            // defaultValue={pageIndex + 1}
                            onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} />
                        </span>
                    </div>
                    <div className="table-nav-button-wrapper">
                        {/* <div className="table-nav-button-header">
                            <p>Page{' '}{pageIndex + 1} of {pageOptions.length}</p>
                        </div> */}
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
            </PageContentWrapper>

            <style jsx>{`
                .history-table {
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                }

                .table-wrapper {
                    width: 100%;
                    display: flex;
                    align-self: center;
                }

                table {
                    width: 100%;
                }

                .table-title {
                    background-color: #efefef;
                    margin-bottom: 30px;
                }

                .table-title h1 {
                    padding-left: 20px;
                }

                .table-row p {
                    padding: 12px;
                    font-size: 18px;
                    margin: 0;
                }

                .table-row p:hover {
                    background-color: #fdfdfd
                }

                .table-nav-wrapper {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                }

                .table-nav-button-wrapper {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }

                .table-nav-wrapper input {
                    width: 35px;
                    max-width: 35px;
                    text-align: center;
                    height: 35px;
                    /* margin-left: 10px; */
                    border: none;
                    border-radius: 5px;
                    background-color: #d1d1d1;
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

            `}</style>
        </>
    )
}

// }

export default LinkHistory
