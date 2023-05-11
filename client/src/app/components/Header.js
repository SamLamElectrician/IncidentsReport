import Image from "next/image";
import React from "react";
import headerStyle from "../styles/header.module.css";
import { Dropdown } from "@nextui-org/react";

export default function Header({ IncidentType, setIncidentType }) {
	const selectedValue = React.useMemo(
		() => Array.from(IncidentType).join(", ").replaceAll("_", " "),
		[IncidentType]
	);
	return (
		<div className={headerStyle.center}>
			<Image
				src='/Elevate-Security-Logo.png'
				alt='Elevate Security Png'
				width={300}
				height={60}
			/>

			<Dropdown>
				<Dropdown.Button flat>{selectedValue}</Dropdown.Button>
				<Dropdown.Menu
					aria-label='Single selection actions'
					color='secondary'
					disallowEmptySelection
					selectionMode='single'
					selectedKeys={IncidentType}
					onSelectionChange={setIncidentType}
				>
					<Dropdown.Item key='all factors'>All</Dropdown.Item>
					<Dropdown.Item key='denial'>Denial</Dropdown.Item>
					<Dropdown.Item key='intrusion'>Intrusions</Dropdown.Item>
					<Dropdown.Item key='executable'>Executable</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}
