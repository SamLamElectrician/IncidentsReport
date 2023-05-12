import React, { useContext } from "react";
import { Context } from "../page";
import { Table } from "@nextui-org/react";
import tableStyles from "../styles/table.module.css";
import { formatDate } from "../utils/timeConvert";

import { Input } from "@nextui-org/react";

export default function TableExecutable() {
	const data = useContext(Context);
	return (
		<div className={tableStyles.wrapper}>
			<div className={tableStyles.tableHeader}>
				<h3>DATA FOR DENIAL INCIDENTS</h3>
				<Input placeholder='Search' bordered />
			</div>
			<div className={tableStyles.tableContainer}>
				<Table
					striped
					aria-label='Example table with static content'
					bordered
					css={{
						margin: "0 auto",
						height: "auto",
						width: "100%",
						padding: "0",
					}}
				>
					<Table.Header>
						<Table.Column>Priority</Table.Column>
						<Table.Column>Reported by</Table.Column>
						<Table.Column>Date</Table.Column>
					</Table.Header>
					<Table.Body>
						{Array.isArray(data.results) &&
							data.results.map(({ priority, machine_ip, timestamp }, index) => (
								<Table.Row key={index}>
									<Table.Cell>{priority.toUpperCase()}</Table.Cell>
									<Table.Cell>{machine_ip}</Table.Cell>
									<Table.Cell>{formatDate(timestamp)}</Table.Cell>
								</Table.Row>
							))}
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
