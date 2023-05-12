import React from "react";
import TableDenial from "./TableDenial";
import TableExecutable from "./TableExecutable";
import TableIntrusion from "./TableIntrusion";
import tableStyle from "../styles/table.module.css";

export default function DataTable({ IncidentType }) {
	// returns data based on whats selected based on the docs
	const type = [...IncidentType];

	//returns table based on what incident type it is
	if (type[0] == "denial") {
		return <TableDenial />;
	} else if (type[0] == "intrusion") {
		return <TableIntrusion />;
	} else if (type[0] == "executable") {
		return <TableExecutable />;
	} else {
		return (
			<>
				<div className={tableStyle.wrapperNoTable}>
					<h3 className={tableStyle.noTable}>Please Select A Source</h3>
					<p className={tableStyle.intro}>
						Welcome to internal tools by Sammy Lam. This tool sorts the data by
						returning IP address which is translated inside the backend to
						always return employee ID as well as date and status of the results.
						Please select a source on the top right
					</p>
					<div className={tableStyle.linkTree}>
						<a
							href='https://github.com/SamLamElectrician/IncidentsReport'
							className={tableStyle.link}
						>
							REPO
						</a>
						<a
							href='https://www.linkedin.com/in/sammy-lam-front-end-dev-electrician/'
							className={tableStyle.link}
						>
							LINKEDIN
						</a>
						<a
							href='https://github.com/SamLamElectrician'
							className={tableStyle.link}
						>
							GITHUB
						</a>
					</div>
				</div>
			</>
		);
	}
}
