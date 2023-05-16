import React from "react";

import AllTable from "./AllTable";
import tableStyle from "../styles/table.module.css";
import { Loading } from "@nextui-org/react";
import HomePage from "./HomePage";

export default function DataTable({ IncidentType, loading }) {
	const type = [...IncidentType];

	if (loading) {
		return (
			<Loading size='xl' text='Primary' className={tableStyle.loadStyle}>
				Loading{" "}
			</Loading>
		);
	} else if (type[0] === "all") {
		return <AllTable></AllTable>;
	} else {
		return <HomePage />; // Rendering the Homepage component
	}
}
