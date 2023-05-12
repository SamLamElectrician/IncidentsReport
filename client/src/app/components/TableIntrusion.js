import React, { useContext, useState, useEffect } from "react";
import { Context } from "../page";
import { Table, useCollator } from "@nextui-org/react";
import tableStyles from "../styles/table.module.css";
import { formatDate } from "../utils/timeConvert";

export default function TableIntrusion() {
	const data = useContext(Context);
	const collator = useCollator({ numeric: true });
	const [sortDescriptor, setSortDescriptor] = useState(null);
	const [sortedData, setSortedData] = useState(data.results || []);
	console.log(data.results);

	useEffect(() => {
		setSortedData(data.results || []);
	}, [data.results]);

	useEffect(() => {
		if (sortDescriptor !== null) {
			const sorted = [...sortedData].sort((a, b) => {
				let first = a[sortDescriptor.column];
				let second = b[sortDescriptor.column];
				let cmp = collator.compare(first, second);
				if (sortDescriptor.direction === "descending") {
					cmp *= -1;
				}
				return cmp;
			});

			setSortedData(sorted);
		}
	}, [sortDescriptor]);

	return (
		<div>
			<h3 className={tableStyles.wrapper}>DATA FOR DENIAL INCIDENTS</h3>
			<div className={tableStyles.tableContainer}>
				<Table
					aria-label='Example table with static content'
					bordered
					css={{
						margin: "0 auto",
						height: "auto",
						width: "100%",
						padding: "0",
					}}
					sortDescriptor={sortDescriptor}
					onSortChange={setSortDescriptor}
				>
					<Table.Header>
						<Table.Column allowsSorting>Priority</Table.Column>
						<Table.Column>Reported By</Table.Column>
						<Table.Column>Source IP</Table.Column>
						<Table.Column allowsSorting>Date</Table.Column>
					</Table.Header>
					<Table.Body items={sortedData}>
						{Array.isArray(sortedData) &&
							sortedData.map(
								({ priority, internal_ip, source_ip, timestamp }, index) => (
									<Table.Row key={index}>
										<Table.Cell>{priority.toUpperCase()}</Table.Cell>
										<Table.Cell>{internal_ip}</Table.Cell>
										<Table.Cell>{source_ip}</Table.Cell>
										<Table.Cell>{formatDate(timestamp)}</Table.Cell>
									</Table.Row>
								)
							)}
					</Table.Body>
					<Table.Pagination
						shadow
						noMargin
						align='center'
						rowsPerPage={15}
						onPageChange={(page) => console.log({ page })}
					/>
				</Table>
			</div>
		</div>
	);
}
