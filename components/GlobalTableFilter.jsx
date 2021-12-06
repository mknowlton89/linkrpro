import React from 'react'

export const GlobalTableFilter = ({ filter, setFilter }) => {
    return (
        <>
            <div className='search-wrapper'>
                Search:{' '}
                <input
                    className="input"
                    value={filter || ''}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <style jsx>{`
                .search-wrapper {
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    justify-content: flex-end;
                    height: fit-content;
                    align-items: center;
                    padding-bottom: 20px;
                    font-size: 16px;
                }

                input {
                    width: 250px;
                    max-width: 250px;
                    height: 35px;
                    margin-left: 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #d1d1d1;
                    padding: 0px 10px 0px 10px;
                    font-size: 16px;
                }

                input:focus {
                    outline: none;
                }
            `}</style>
        </>
    )
}
