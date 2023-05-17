import React from "react";
import AllTable from "./AllTable";
import tableStyle from "../styles/table.module.css";
import { Loading } from "@nextui-org/react";
import HomePage from "./HomePage";

export default function DataTable({ IncidentType, loading }) {
	const type = [...IncidentType];

	// returning either homepage or data or loading depending on the state of loading

	if ((!loading && type[0] == undefined) || type[0] == "none") {
		return <HomePage />;
	} else if (loading) {
		return (
			<Loading size='xl' text='Primary' className={tableStyle.loadStyle}>
				Loading
			</Loading>
		);
	} else if (!loading && type[0] === "all") {
		return <AllTable></AllTable>;
	}
}
