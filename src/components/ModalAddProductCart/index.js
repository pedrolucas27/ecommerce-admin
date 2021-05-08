import React, { useState } from "react";
import { 
	Button, 
	Row, 
	Col,
	message,
	Input,
	Divider,
	Typography,
	Modal
} from 'antd';
import {
  	PlusOutlined,
  	MinusOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../global.css';

const { TextArea } = Input;
const { Title } = Typography;

function ModalAddProductCart(props){
	const [quantity, setQuantity] = useState(1);

	return(
		<div>
			<Modal 
				title="Adicionar no carrinho" 
				visible={props.isVisibleAddCart}
				footer={[
					<Button 
						shape="round" 
						className="button-cancel" 
						onClick={() => props.onCancelProductChange()}
					>
						Cancelar
					</Button>,
            		<Button 
            			shape="round" 
            			className="button"
            			onClick={() => props.onAddOrder(quantity)}
            		>
						Adicionar e seguir
					</Button>
					
          		]} 
			>
				<Row>
					<Col span={24}>
						<Title level={3} style={{ margin: 2 }}>
							{props?.product?.name}
						</Title>
						<p style={{ margin: 2 }}>
			   				<span>Tamanho/Volume:</span> {props?.product?.size}
			   			</p>
			   			<Divider className="line-divider"/> 
					</Col>
					<Col span={24}>
						<Row>
							<Col span={12}>
								<div className="container-icon-card">
									<Title level={3} style={{ color: '#00a000' }}>
										R$ {quantity * props?.product?.price}
									</Title>
								</div>
							</Col>
							<Col span={12}>
								<Row justify="center">
									<Col span={4}>
										<Button 
											shape="circle" 
											className="button-cancel" 
											icon={<MinusOutlined />}
											onClick={() => setQuantity(quantity - 1)}
											disabled={quantity === 1 ? true:false} 
										/>
									</Col>
									<Col span={4}>
										<div className="container-icon-card">
											<Title level={5} style={{ marginTop: 5 }}>
												{quantity}
											</Title>
										</div>
									</Col>
									<Col span={4}>
										<Button 
											shape="circle" 
											className="button" 
											style={{ float: "right" }} 
											icon={<PlusOutlined />}
											onClick={() => setQuantity(quantity + 1)} 
										/>
									</Col>
								</Row>
								
							</Col>
						</Row>
						<Divider className="line-divider"/>
					</Col>
					<Col span={24}>
						<TextArea rows={3} className="input-radius" />
					</Col>
				</Row>
        
      		</Modal>
		</div>
	);
}

export default ModalAddProductCart;