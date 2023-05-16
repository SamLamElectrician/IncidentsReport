import React, { useContext } from "react";
import { Context } from "../page";
import { Table } from "@nextui-org/react";
import tableStyles from "../styles/table.module.css";
import { formatDate } from "../utils/formateDate";
import { StyledBadge } from "./StyledBadge";

import { Input } from "@nextui-org/react";

export default function All() {
	// using data through use context to avoid propdrilling and return the map data
	const data = useContext(Context);

	return (
		<div className={tableStyles.wrapper}>
			<div className={tableStyles.tableHeader}>
				<h3>DATA FOR EXECUTABLE INCIDENTS</h3>
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
						<Table.Column>Incident Type</Table.Column>
						<Table.Column>Reported by Employee ID</Table.Column>
						<Table.Column>Reported by Employee IP</Table.Column>
						<Table.Column>Source IP</Table.Column>
						<Table.Column>Date</Table.Column>
					</Table.Header>
					<Table.Body>
						{/* sort the data by time stamp and map it out */}
						{Array.isArray(data) &&
							data
								.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
								.map(
									(
										{
											employee_id,
											incident_report,
											priority,
											internal_ip,
											source_ip,
											timestamp,
										},
										index
									) => (
										<Table.Row key={index}>
											<Table.Cell>
												<StyledBadge type={priority}>
													{priority.toUpperCase()}
												</StyledBadge>
											</Table.Cell>
											<Table.Cell>{incident_report.toUpperCase()}</Table.Cell>
											<Table.Cell>{employee_id}</Table.Cell>
											<Table.Cell>{internal_ip}</Table.Cell>
											<Table.Cell>
												{source_ip ? source_ip : "Not Available"}
											</Table.Cell>
											<Table.Cell>{formatDate(timestamp)}</Table.Cell>
										</Table.Row>
									)
								)}
					</Table.Body>
					<Table.Pagination
						shadow
						noMargin
						align='center'
						rowsPerPage={25}
						onPageChange={(page) => ({})}
					/>
				</Table>
			</div>
		</div>
	);
}
