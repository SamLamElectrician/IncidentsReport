import React from "react";
import TableDenial from "./TableDenial";
import TableExecutable from "./TableExecutable";
import TableIntrusion from "./TableIntrusion";

export default function DataTable({ IncidentType }) {
	// kind of screwed up here imo with using set
	// returns data based on whats selected
	const type = [...IncidentType];
	console.log(type);
	if (type[0] == "denial") {
		return <TableDenial />;
	} else if (type[0] == "intrusion") {
		return <TableIntrusion />;
	} else if (type[0] == "executable") {
		return <TableExecutable />;
	} else {
		// this isn't working for some reason
		<h2>Please Select A Source</h2>;
	}
}
