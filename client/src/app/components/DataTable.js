import React, { useEffect } from "react";
import { Table } from "@nextui-org/react";
import tableStyles from "../styles/table.module.css";

export default function DataTable({ incidentReport, IncidentType }) {
	return (
		<div>
			<h3 className={tableStyles.wrapper}>Data for {IncidentType}</h3>
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
				>
					<Table.Header>
						<Table.Column>NAME</Table.Column>
						<Table.Column>ROLE</Table.Column>
						<Table.Column>STATUS</Table.Column>
						<Table.Column>STATUS</Table.Column>
					</Table.Header>
					<Table.Body>
						{/* {incidentReport.map((row) => {
							<Table.Row>
								<Table.Cell>{row.internal_ip}</Table.Cell>
								<Table.Cell>{row.source_ip}</Table.Cell>
								<Table.Cell>{row.priority}</Table.Cell>
								<Table.Cell>{row.timestamp}</Table.Cell>
							</Table.Row>;
						})} */}

						<Table.Row key='1'>
							<Table.Cell>Tony Reichert</Table.Cell>
							<Table.Cell>CEO</Table.Cell>
							<Table.Cell>Active</Table.Cell>
							<Table.Cell>Active</Table.Cell>
						</Table.Row>
						<Table.Row key='2'>
							<Table.Cell>Zoey Lang</Table.Cell>
							<Table.Cell>Zoey Lang</Table.Cell>
							<Table.Cell>Technical Lead</Table.Cell>
							<Table.Cell>Paused</Table.Cell>
						</Table.Row>
						<Table.Row key='3'>
							<Table.Cell>Jane Fisher</Table.Cell>
							<Table.Cell>Jane Fisher</Table.Cell>

							<Table.Cell>Senior Developer</Table.Cell>
							<Table.Cell>Active</Table.Cell>
						</Table.Row>
						<Table.Row key='4'>
							<Table.Cell>William Howard</Table.Cell>
							<Table.Cell>William Howard</Table.Cell>
							<Table.Cell>Community Manager</Table.Cell>
							<Table.Cell>Vacation</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
		</div>
	);
}
