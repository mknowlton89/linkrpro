import React, { useMemo } from 'react'
import { PageContentWrapper, StyledSecondaryLink } from '../styles/StyledComponents';
import { useTable, useGlobalFilter, usePagination } from 'react-table'
import { GlobalTableFilter } from './GlobalTableFilter';

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
        usePagination
    )

    const { globalFilter, pageIndex } = state;

    return (
        <>
            <PageContentWrapper>
                <h1>Your Link History</h1>
                <div className="table-wrapper">
                    <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
                                {...column.getHeaderProps()}
                                style={{
                                borderBottom: 'solid 1px black',
                                color: 'black',
                                fontWeight: 'bold',
                                height: '25px',
                                fontSize: '17px'
                                }}
                            >
                                {column.render('Header')}
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
                    <div>
                        <p>Page{' '}{pageIndex + 1} of {pageOptions.length}</p>
                        <button disabled={!canPreviousPage} onClick={() => previousPage()}>Previous</button>
                        <button disabled={!canNextPage} onClick={() => nextPage()}>Next</button>
                        <span>
                            Go to Page: {' '}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(pageNumber)
                            }} />
                        </span>
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

            `}</style>
        </>
    )
}

// }

export default LinkHistory
