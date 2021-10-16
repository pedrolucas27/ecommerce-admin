import React, { useState } from "react";
import 'moment/locale/pt-br';
import ptBR from 'antd/lib/locale/pt_BR';
import moment from "moment";
import {
	Layout,
	Row,
	Col,
	Typography,
	Button,
	Radio,
	Space,
	DatePicker,
	ConfigProvider
} from 'antd';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Header } = Layout;
const { Title } = Typography;
function HeaderSite(props) {
	const [filterDash, setFilterDash] = useState("day");
	const [dateTeste, setDateTeste] = useState(moment(props.dateChange, 'DD-MM-YYYY'));
	function onChangeDateFilter(date, dateString) {
		setDateTeste(date);
		if (filterDash === "day") {
			props.filterDataDay(dateString);
		} else {
			props.filterDataMonth(dateString);
		}
	}

	function handleTypeFilterGraph(type) {
		if (type === "day") {
			props.filterDataDay(dateTeste._i);
		} else {
			let dateFormated = moment(dateTeste).format("MM-YYYY");
			props.filterDataMonth(dateFormated);
		}
		setFilterDash(type);
	}

	function onLoggout() {
		localStorage.removeItem('@masterpizza-admin-app/idEstablishment');
		localStorage.removeItem('@masterpizza-admin-app/token');
		localStorage.removeItem('@masterpizza-admin-app/idAdmin');

		window.location.href = "/";
	}
	return (
		<Header style={{ padding: 0, backgroundColor: '#fff' }}>
			<Row>
				<Col span={16}>
					{
						props.expandMenu ? (
							<MenuUnfoldOutlined className='trigger' onClick={props.updateExpandMenu} />
						) : (
							<MenuFoldOutlined className='trigger' onClick={props.updateExpandMenu} />
						)
					}
					<h2 style={{ display: 'inline-block' }}>{props.title}</h2>
				</Col>
				<Col span={8} style={{ float: 'right' }}>
					{
						props.isHeaderMyCompany && (
							<Button
								onClick={() => onLoggout()}
								shape="round"
								className="button-cancel ac"
								style={{ marginTop: '15px' }}
							>
								Sair da conta
							</Button>
						)
					}
					{
						props.isDashboard && (
							<Row>
								<Col span={6}>
									<Title level={4} style={{ paddingTop: "15px", margin: 0 }}>
										Filtrar por:
									</Title>
								</Col>
								<Col span={18}>
									<Row>
										<Col span={10}>
											<Radio.Group
												value={filterDash}
												onChange={(e) => handleTypeFilterGraph(e.target.value)}
											>
												<Space>
													<Radio value="day">Dia</Radio>
													<Radio value="month">Mês</Radio>
												</Space>
											</Radio.Group>
										</Col>
										<Col span={14}>
											<ConfigProvider locale={ptBR}>
												{
													filterDash === "day" ? (
														<DatePicker
															onChange={onChangeDateFilter}
															placeholder="Selecione o dia"
															defaultValue={moment(props.dateChange, 'DD-MM-YYYY')}
															format="DD-MM-YYYY"
														/>
													) : (
														<DatePicker
															onChange={onChangeDateFilter}
															placeholder="Selecione o mês"
															picker="month"
															format="MM-YYYY"
														/>
													)
												}
											</ConfigProvider>
										</Col>
									</Row>
								</Col>
							</Row>
						)
					}
				</Col>
			</Row>
		</Header>
	);
}
export default HeaderSite;

