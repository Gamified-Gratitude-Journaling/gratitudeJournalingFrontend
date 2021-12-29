import React from 'react'
import { useTable, useSortBy } from 'react-table'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

export default function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
		},
		useSortBy
	)

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}
							className='border-2 h-10'
						>
							{headerGroup.headers.map(column => (
								// Add the sorting props to control sorting. For this example
								// we can add them into the header props
								<th className='border-l-2 pl-1 sm:pl-4' {...column.getHeaderProps(column.getSortByToggleProps())}>
									<div className='flex content-center'>
										{column.render('Header')}
										{/* Add a sort direction indicator */}
										<div className='place-content-center pl-1'>

										{column.isSorted
											? column.isSortedDesc
											? <AiOutlineArrowDown className='h-full'/>
											: <AiOutlineArrowUp className='h-full'/>
											: ''}
											</div>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className='border-2'{...getTableBodyProps()}>
					{rows.map(
						(row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell, i) => {
										return (
											<td className='border-2 py-1 pl-1 sm:pl-2' {...cell.getCellProps()}>
												<div className='overflow-auto max-h-36'>
													{cell.render('Cell')}
												</div>
											</td>
										)
									})}
								</tr>
							)
						}
					)}
				</tbody>
			</table>
			<br />
		</>
	)
}

